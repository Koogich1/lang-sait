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


import { FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import createS3photo from "../actions/createS3photo";
import { courseData, User } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import sendCourseData from "../actions/sendCourseData";
import createRasdel from "../actions/createRasdel";
import { ClipLoader, PuffLoader } from "react-spinners";
import updateCourse from "../actions/updateCourse";

const FormSchema = z.object({
  photoImage: z.instanceof(File).refine(
    (value) => !!value,
    {
      message: "Пожалуйста, выберите изображение",
    }
  ),
  name: z.string().max(40, {
    message: "Максимум 40 сиволов"
  }),
  aboutCourse: z.string().max(300,{
    message: "Максимум 300 символов"
  }),
});

type Props = {
	updateData: () => void,
	course: courseData,
}

const CreateNewRasp = ({updateData, course}: Props) => {
  const [open, setOpen] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleUser = async() => {
      const userinf = await currentUser()
      if(userinf){
        setUser(userinf)
      }
    }
    handleUser()
  }, [])

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      photoImage: undefined,
      name: "",
    },
  });

  if(!user){
    return
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const file = data.photoImage;
    const name = data.name;
    const aboutCourse = data.aboutCourse;
    const courseId = course.id;
  
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("aboutCourse", aboutCourse);
      formData.append("courseId", courseId);
  
      try {
        const response = await fetch('/api/user/createNewRasdel', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          updateData()
          setOpen(false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        updateData()  
      }
    }
    setLoading(false)
    updateData();  // Вызовите обновление данных
  };

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full my-3">
				<div className="flex gap-3 w-full h-[10vh] border items-center justify-center rounded-lg hover:border-2 hover:border-blue-200 text-gray-400 hover:text-blue-400 hover:bg-blue-50 transition-all"
					onClick={() => {setOpen(true)}}
				>
					<div className="h-8 w-8 bg-gray-400 hover:bg-blue-400 rounded-full flex items-center justify-center text-white transiti">
						<FiPlus className="text-2xl"/>
					</div>
					<span className="font-bold ">
						Создать новый раздел
					</span>
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
          <DialogTitle className="text-gray-600 text-3xl font-bold">Новый раздел</DialogTitle>
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
										className="hidden" // Скрываем стандартный input
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
													input.click(); // Имитируем клик только если элемент найден
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
                Создать
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewRasp;
