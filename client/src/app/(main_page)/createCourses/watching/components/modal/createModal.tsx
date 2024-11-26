"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { IoCloseOutline } from "react-icons/io5";
import { useState } from "react";
import { User } from "@prisma/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import createLesson from "../../actions/createLesson";

type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  visov: () => void;
}

const FormSchema = z.object({
  	photoImage: z.instanceof(File).optional(),
		name: z.string().max(40, {
			message: "Максимум 40 символов"
		}),
		aboutCourse: z.string().max(300, {
			message: "Максимум 300 символов"
		}).optional(),
	});

const CreateCustomCourseModal = ({openModal, setOpenModal, visov}: Props) => {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      photoImage: undefined,
      name: "",
      aboutCourse: "",
    },
  });

	async function onSubmit(data: z.infer<typeof FormSchema>) {
    const file = data.photoImage
		const name = data.name
    const aboutCourse = data.aboutCourse

    if(file){
    setLoading(true)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("name", name)
      formData.append("aboutCourse", aboutCourse ? aboutCourse : "")
      try{
        const response = await fetch('/api/lesson/addPhoto', { // Путь к вашему API
          method: 'POST',
          body: formData,
       });
       const result = await response.json();
				if(result.success){
          visov()
          setLoading(false)
				  setOpenModal(false)
				}
      } catch(e){
        console.log(e)
      }
    }else{
      setLoading(true)
      await createLesson({name: data.name, aboutCourse:data.aboutCourse})
      visov()
      setLoading(false)
      setOpenModal(false)
    }
  };   

	return(
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent>
			<div
          className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-6"
          onClick={() => setOpenModal(false)}
        >
          <IoCloseOutline className="text-2xl text-white" />
        </div>
        <DialogHeader>
          <DialogTitle className="text-gray-600 text-3xl font-bold">Создание уникального урока</DialogTitle>
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
                      accept="image/jpeg, image/png"
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
                  <Label htmlFor="aboutCourse" className="text-base text-gray-600 font-semibold w-2/5">Описание урока</Label>
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
                onClick={() => setOpenModal(false)}
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
	)
}

export default CreateCustomCourseModal