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
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createS3photo from "../actions/createS3photo";
import { courseData, rasdelId, User } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { IoPencil } from "react-icons/io5";
import updateRasdel from "../actions/updateRasdel";
import fetchCourseById from "../actions/fetchCourseById";
import updateCourse from "../actions/updateCourse";
import { PuffLoader } from "react-spinners";
import { cornersOfRectangle } from "@dnd-kit/core/dist/utilities/algorithms/helpers";
import Image from "next/image";

const FormSchema = z.object({
  photoImage: z.instanceof(File).optional(),
  name: z.string().max(40, {
    message: "Максимум 40 символов"
  }),
  aboutCourse: z.string().max(300, {
    message: "Максимум 300 символов"
  }),
});

type Props = {
  updateData: () => void,
  courseId: string,
}

const UpdateCourseModal = ({ updateData, courseId }: Props) => {
  const [open, setOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [rasdel, setRasdel] = useState<courseData | null>(null);
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    const fetchRasdel = async () => {
      const data = await fetchCourseById(courseId);
      if (data) {
        setRasdel(data);
        form.reset({
          name: data.name,
          aboutCourse: data.aboutCourse,
          photoImage: undefined,
        });
        setImagePreview(data.photoUrl);
      }
    };

    const handleUser = async () => {
      const userinf = await currentUser();
      if (userinf) {
        setUser(userinf);
      }
    };

    fetchRasdel();
    handleUser();
  }, [courseId, form]); // Добавлено 'form' в зависимости

  if(loading){
    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex justify-center items-center min-h-[50vh] max-w-[430px] flex-col">
          <h1 className="text-2xl font-bold text-gray-400">Загрузка данных...</h1>
          <PuffLoader className="" size={100} color="#835BD2"/>
        </DialogContent>
      </Dialog>
    )
  }

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data)
  };

  if (!user || !rasdel) {
    return null; // Дожидаемся загрузки пользователя и раздела
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-9 h-9 bg-gray-200 text-xl rounded-lg mr-1 flex items-center justify-center hover:bg-gray-300 transition-all cursor-pointer">
          <IoPencil />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[420px]">
        <div
          className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-6"
          onClick={() => {
            setOpen(false);
          }}
        >
          <IoCloseOutline className="text-2xl text-white" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-gray-600 text-3xl font-bold">Править курс</DialogTitle>
        </DialogHeader>
        <div className="w-full h-[1px] bg-gray-200"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="photoImage"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 justify-center items-center space-y-0 gap-3 ml-0">
                  <div className="w-[125px] h-[190px] rounded-xl bg-blue-200">
                    {imagePreview && (
                      <Image
                        width={1000}
                        height={1000}
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
                  <Label htmlFor="aboutCourse" className="text-base text-gray-600 font-semibold w-2/5 text-nowrap">О разделе</Label>
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
            <div className="flex gap-3 mt-6">
              <Button
                className="w-1/2 border-2 text-gray-300 border-gray-300 font-bold"
                type="button"
                onClick={() => {
                  setOpen(false);
                }}
                variant="shadow2"
              >
                Отмена
              </Button>
              <Button
                type="submit"
                className="w-1/2 text-base font-medium"
                variant="violetSelect"
              >
                Подтвердить
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCourseModal;
