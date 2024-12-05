"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoPencil } from "react-icons/io5";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FiPlus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import createS3photo from "../actions/createS3photo";
import { courseData, Lessons, User } from "@prisma/client"; 
import { currentUser } from "@/lib/auth";
import createLessons from "../actions/createLessons";
import fetchlessons from "../actions/fetchlessons";
import { FaEllipsisH } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import deleteLessons from "../actions/deleteLessons";
import Link from "next/link";
import { useParams } from "next/navigation";
import UpdateLessonModal from "./updateLessonModal";
import { PuffLoader } from "react-spinners";
import fetchCourseById from "../actions/fetchCourseById";
import { useCallback } from "react"; // Импортируйте useCallback
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import RaspolozhitLessonBox from "../../materials/[courseId]/components/raspolozhitLessonBox";

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
	rasdelId: string,
  user: User,
  course: courseData,
  rasdelName: string,
}

type ActiveWindow = "Redact" | "Raspolozhit" | "Opisanie"

const CreateNewLesson = ({updateData, rasdelId, user, course, rasdelName}: Props) => {
  const {courseId} = useParams()
  const [open, setOpen] = useState(false);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [lessons, setLessons] = useState<Lessons[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState<ActiveWindow>("Redact")

const fetcher = useCallback(async () => {
	const Fetchlessons = await fetchlessons({ rasdId: rasdelId });
	if (Fetchlessons) {
		setLessons(Fetchlessons);
	}
}, [rasdelId]); // Добавляем зависимость rasdelId

  useEffect(() => {
    fetcher();
  }, [courseId, fetcher]);  // Добавляем courseId и fetcher

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      photoImage: undefined,
      name: "",
    },
  });

  if(!lessons){
    return(
      <div className="flex flex-col gap-2 py-3">
        <Skeleton className="h-10 w-full"/>
        <Skeleton className="h-10 w-full"/>
        <Skeleton className="h-10 w-full"/>
      </div>
    )
  }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const file = data.photoImage;
    const name = data.name;
    const aboutCourse = data.aboutCourse;
    const courseId = rasdelId
  
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("aboutCourse", aboutCourse);
      formData.append("courseId", courseId);
  
      try {
        const response = await fetch('/api/user/createLesson', {
          method: 'POST',
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          fetcher()
          updateData()
          setOpen(false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        updateData()
        fetcher()
      }
    }
    setLoading(false)
    updateData()
    fetcher()  // Вызовите обновление данных
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
    <div>
      <ul className="gap-2">
        <div className="w-full flex gap-2 items-start border-b mb-2">
          <div 
            className={`py-[0.125rem] px-2 transition-all rounded-t cursor-pointer ${active === "Redact" ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-400"}`}
            onClick={() => {setActive("Redact")}}
          >
            Редактирование
          </div>
          <div 
            className={`py-[0.125rem] px-2 transition-all rounded-t cursor-pointer ${active === "Raspolozhit" ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-400"}`}
            onClick={() => {setActive("Raspolozhit")}}
          >
            Расположение
          </div>
          <div 
            className={`py-[0.125rem] px-2 transition-all rounded-t cursor-pointer ${active === "Opisanie" ? "bg-blue-400 text-white" : "bg-gray-100 text-gray-400 hover:bg-blue-100 hover:text-blue-400"}`}
            onClick={() => {setActive("Opisanie")}}
          >
            Описание
          </div>
        </div>
        {active === "Redact" &&
        lessons?.map((data, index) => (
          <li key={index} className="h-10 w-full flex items-center relative border-b shadow-sm border-gray-100 justify-between">
             <div className="flex items-center gap-3">
               <div className="text-gray-400 font-light text-xs bg-white flex items-center justify-center">
                 <div className="w-4 h-4 bg-blue-400 text-white flex items-center justify-center font-semibold rounded-sm">
                   {index + 1}
                 </div>
               </div>
               <Image width={1000} height={1000} src={data.photoUrl} alt="" className="w-8 h-8 rounded-lg object-cover"/>
               <h1 className="font-medium">
                 {data.name}
               </h1>
             </div>
             <div className="flex gap-1 items-center">
             {user.id === course?.userId &&
             <>
               <UpdateLessonModal lessonId={data.id} updateData={fetcher} />
               <DropdownMenu>
                   <DropdownMenuTrigger asChild>
                     <div className='h-7 w-7 rounded-lg flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 transition-all cursor-pointer'>
                       <FaEllipsisH />
                     </div>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className='text-gray-500 font-medium'>
                     <DropdownMenuItem className='hover:bg-gray-100 flex justify-between'
                       onClick={async () => {
                         try {
                           setLoading(true);
                           await deleteLessons(data.id);
                           await fetcher(); // Wait for the data to be refreshed
                         } catch (e) {
                           console.log(e);
                         } finally {
                           setLoading(false); // Make sure to set loading to false here after the process
                         }
                       }}
                     >
                       <FaRegTrashCan/>
                       Удалить
                     </DropdownMenuItem>
                   </DropdownMenuContent>
                 </DropdownMenu>
             </>
             }
               <Link href={`/createCourses/materials/${courseId}/${data.id}`}>
                 <Button className="p-0 h-7 px-2 rounded-xl bg-transparent hover:bg-blue-400 text-blue-400 hover:text-white border border-blue-400">
                   Открыть
                 </Button>
               </Link>
             </div>
           </li>
         ))
         }
      </ul>
      {course?.userId === user.id && active === "Redact" &&
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="flex w-full py-2">
          <div 
              className="flex items-center gap-3 border-b w-full border-gray-50 py-2 text-gray-400 hover:text-blue-400 transition-all"
              onClick={() => {setOpen(true)}}
            >
              <div className="transition-all h-8 w-8 bg-gray-400 hover:bg-blue-400 rounded-full flex items-center justify-center text-white transiti">
                <FiPlus className="text-2xl"/>
              </div>
              <span className="font-bold">
                Новый урок
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
              <DialogTitle className="text-gray-600 text-3xl font-bold">Новый урок</DialogTitle>
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
                        <Label htmlFor="aboutCourse" className="text-base text-gray-600 font-semibold w-2/5 text-nowrap">О уроке</Label>
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
      }
      {active === "Raspolozhit" && 
      <div>
        <RaspolozhitLessonBox lessons={lessons} fetchLesson={fetcher} />
      </div>
      }
      {
        active === "Opisanie" &&
        <div className="pb-5 pt-2">
          {rasdelName}
        </div>
      }
    </div>
  );
};

export default CreateNewLesson;
