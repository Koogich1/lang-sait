"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import createS3photo from "../actions/createS3photo";
import { User } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import sendCourseData from "../actions/sendCourseData";

const FormSchema = z.object({
  photoImage: z.instanceof(File).refine(
    (value) => !!value,
    {
      message: "Пожалуйста, выберите изображение",
    }
  ),
  name: z.string().max(40, {
    message: "Максимум 40 символов"
  }),
  aboutCourse: z.string().max(300, {
    message: "Максимум 300 символов"
  }),
  language: z.string({
    message: "Выберите язык"
  })
});

const CreateNewCourse = ({ updateData }: { updateData: () => void }) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleUser = async () => {
      const userinf = await currentUser();
      if (userinf) {
        setUser(userinf);
      }
    };
    handleUser();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      photoImage: undefined,
      name: "",
      aboutCourse: "",
      language: ""
    },
  });

  if (!user) {
    return null; // Или возвращайте что-то другое
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const file = data.photoImage;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = reader.result as string;
      const folderName = `course_${user.name}_${data.name}_${Math.random().toString(36).substr(2, 9)}`; // Используем случайную строку
      const fileName = `oblozhka.jpg`;
      const fileURL = `https://storage.yandexcloud.net/langschoolacynberg/courses/${user.id}/${folderName}/${fileName}`;
      
      try {
        await createS3photo(base64Data, folderName, fileName);
        await sendCourseData({ name: data.name, aboutCourse: data.aboutCourse, language: data.language, photoUrl: fileURL });
        updateData();
      } catch (error) {
        console.error('Ошибка при загрузке фото:', error);
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger
        className="w-[175px] h-[270px] flex flex-col items-center justify-center gap-3 border-2 border-dashed hover:border-solid hover:border-purple-600 transition-all rounded-lg"
        onClick={() => setOpen(true)}
      >
        <h1 className="text-xl font-bold text-[#835BD2]">Создать курс</h1>
        <div className="h-6 w-6 bg-[#835BD2] rounded-lg">
          <FaPlus className="w-full h-full p-1 text-white" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[420px]">
        <div
          className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-6"
          onClick={() => setOpen(false)}
        >
          <IoCloseOutline className="text-2xl text-white" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-gray-600 text-3xl font-bold">Новый материал</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="photoImage"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 justify-center items-center space-y-0 gap-3 ml-0">
                  <div className="w-[125px] h-[190px] rounded-xl bg-blue-200">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture" className="text-lg text-gray-600 font-bold">Обложка</Label>
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const selectedFile = e.target.files[0];
                          field.onChange(selectedFile);
                          const fileURL = URL.createObjectURL(selectedFile);
                          setImagePreview(fileURL);
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        const input = document.getElementById('picture');
                        if (input) {
                          input.click();
                        } else {
                          console.warn('Input not found');
                        }
                      }}
                      className="font-semibold text-lg w-full"
                      variant='shadow2'
                    >
                      Загрузить
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-[1px] bg-gray-200 mt-5"></div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex justify-center items-center space-y-0 gap-5 ml-0 mt-5">
                  <Label htmlFor="name" className="text-base text-gray-600 font-semibold w-2/5">Название</Label>
                  <Input
                    {...field}
                    placeholder="Введите название"
                    className="w-3/5 h-[40px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutCourse"
              render={({ field }) => (
                <FormItem className="flex justify-center items-center space-y-0 gap-5 ml-0 mt-5">
                  <Label htmlFor="aboutCourse" className="text-base text-gray-600 font-semibold w-2/5">Описание курса</Label>
                  <Textarea
                    {...field}
                    placeholder="Описание"
                    className="w-3/5 h-[40px]"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-[1px] bg-gray-200 mt-5"></div>
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex items-center gap-5 mt-5">
                  <FormLabel className="w-3/5 text-base font-semibold text-gray-600 pr-[43px]">Язык</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберете язык" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Korean">
                        <div className="flex gap-3 items-center">
                          <Image alt='icon' width={50} height={50} className="w-10 h-7 rounded-lg shadow-lg border border-gray-300" src="/Korean.png" />
                          <span>Корейский</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="China">
                        <div className="flex gap-3 items-center">
                          <Image alt='icon' width={50} height={50} src="/China.png" className="w-10 h-7 rounded-lg shadow-lg border border-gray-300" />
                          <span>Китайский</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="English">
                        <div className="flex gap-3 items-center">
                          <Image alt='icon' width={50} height={50} src="/English.png" className="w-10 h-7 rounded-lg shadow-lg border border-gray-300" />
                          <span>Английский</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-[1px] bg-gray-200 mt-5"></div>
            <div className="flex gap-3 mt-6">
              <Button
                className="w-1/2 border-2 text-gray-300 border-gray-300 font-bold"
                type="button"
                onClick={() => setOpen(false)}
                variant="shadow2"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="w-1/2 text-base font-medium"
                variant="violetSelect"
              >
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewCourse;