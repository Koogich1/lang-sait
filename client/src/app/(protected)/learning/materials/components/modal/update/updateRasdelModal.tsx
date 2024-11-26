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

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import { customCourse } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTrash } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { z } from "zod";

import { FaRegTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import updateCustomLesson from "@/app/(main_page)/createCourses/watching/actions/updateCustomLesson";

type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  visov: () => void;
	lesson: customCourse;
}

const FormSchema = z.object({
  photoImage: z.instanceof(File).optional(),
  name: z.string().max(40, {
    message: "Максимум 40 символов"
  }),
});

const UpdateLessonModal = ({openModal, setOpenModal, visov, lesson}: Props) => {
	const [loading, setLoading] = useState(false)
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
		defaultValues: {
      name: lesson.name
    },
  });

	useEffect(() => {
		lesson.imageSrc ? 
		setImagePreview(lesson.imageSrc) : ''
	}, [])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const file = data.photoImage
		const name = data.name
    if(file){
      setLoading(true)
      const formData = new FormData()
			formData.append("id", lesson.id)
      formData.append("file", file)
      formData.append("name", name)
      try{
        const response = await fetch('/api/teacherInfo/updateLesson', { // Путь к вашему API
          method: 'POST',
          body: formData,
       });
       const result = await response.json();
				if(result.success){
          console.log('успешно')
          setLoading(false)
          setOpenModal(false)
				}
      } catch(e){
        console.log(e)
      }
    }else {
      setLoading(true);
      try {
        updateCustomLesson({name: data.name, id: lesson.id})
        setOpenModal(false)
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    visov()  
    
  };

	if(loading){
    return(
      <Dialog>
        <DialogContent className="flex justify-center items-center min-h-[50vh] max-w-[430px] flex-col">
          <h1 className="text-2xl font-bold text-gray-400">Загрузка данных...</h1>
          <PuffLoader className="" size={100} color="#835BD2"/>
        </DialogContent>
      </Dialog>
    )
  }

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="text-gray-500 max-w-[380px]">
				<DialogHeader>
					<DialogTitle className="text-xl font-semibold w-full text-[#9d72f3]">
						Изменить урок
					</DialogTitle>
					<div 
						className="w-6 h-6 bg-red-400 absolute top-[1.25rem] rounded-md right-6 flex justify-center items-center text-xl text-white hover:bg-red-500 cursor-pointer"
						onClick={() => {setOpenModal(false)}}
					>
						<IoClose />
					</div>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="">
						<FormField
              control={form.control}
              name="photoImage"
              render={({ field }) => (
                <FormItem className="grid grid-cols-2 justify-center items-center space-y-0 gap-3 ml-0 mt-3">
                  <div className="w-[125px] h-[190px] rounded-xl bg-blue-200">
                    {imagePreview && (
                      <Image
												width={125}
												height={190}
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-xl shadow-md border border-gray-50"
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture" className="text-base text-gray-400 ">Изменить обложку</Label>
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
                      className="text-base bg-[#835BD2] hover:bg-[#9368e8]"
                    >
                      Загрузить
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
						<FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex justify-center items-center space-y-0 gap-5 ml-0 mt-6 pb-4">
                  <Label htmlFor="name" className="text-base text-[#835BD2] font-medium w-1/5">Название:</Label>
                  <Input
										{...field}
										placeholder="Введите название"
										className="w-4/5 ml-3 h-[40px] placeholder:text-gray-300 text-gray-600 rounded-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-200 transition-all"
									/>
                  <FormMessage />
                </FormItem>
              )}
            />
              <div className="flex justify-between gap-3">
                <Button 
                  className="w-1/2" 
                  variant={"shadow2"}
                  onClick={() => {setOpenModal(false)}}
                >Отменить</Button>
                <Button className="w-1/2 font-medium" variant={"violetSelect"} type="submit">Подтвердить</Button>
              </div>
						</form>
					</Form>
				</DialogHeader>
			</DialogContent>
		</Dialog>

	)
}

export default UpdateLessonModal