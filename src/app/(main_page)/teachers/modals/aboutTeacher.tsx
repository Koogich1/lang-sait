"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"

type Teacher = {
  id: string;
  teacherId: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
    language: string[];
    levelLanguage: string;
		lessonPrise: number;
  };
};

type AboutTeacherModalProps = {
  teacher: Teacher;
};

const AboutTeacherModal = ({teacher}: AboutTeacherModalProps) => {
	const [open, setOpen] = useState(false)

	const prise = teacher.teacherInfo.lessonPrise
	const secondPrise = Math.round(teacher.teacherInfo.lessonPrise * 0.95) //скида 10%
	const thirdPrise = Math.round(teacher.teacherInfo.lessonPrise * 0.85) //скида 10%

	//ПОЗЖЕ ПОМЕНЯТЬ НА УНИКАЛЬНОЕ, КАК ТОЛЬКО НАУЧИШЬ ЗАГРУЖАТЬ ЕГО!
	const videoUrl = "https://storage.yandexcloud.net/langschoolacynberg/teachersVideo/English%20Teacher%20Introduction%20Video%20-%20Luna%20Kelly.mp4"

	return (
		<Dialog open={open}>
			<DialogTrigger>
				<Button 
				className='w-[120px] border-2 border-gray-300 text-gray-400 font-semibold' variant='shadow2'
				onClick={() => setOpen(true)}
				>Подробнее!</Button>
			</DialogTrigger>
				<DialogContent className="text-gray-600">
					<div 
							className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
							onClick={() => {setOpen(false)}}
							>
							<IoCloseOutline  className="text-2xl text-white"/>
					</div>
					<DialogHeader>
					<DialogTitle><span className="pr-1">{teacher.userInfo.name}</span><span>{teacher.userInfo.surname}</span></DialogTitle>
					<DialogDescription className="">
					</DialogDescription>
					<div className="pt-0 flex flex-col items-center">
					<video controls width="800" height="600" className="rounded-lg">
						<source src={videoUrl} type="video/mp4" />
						Ваш браузер не поддерживает видео тег.
					</video>
						<div className="text-sm text-center pt-3">
							{teacher.teacherInfo.aboutMe}
						</div>
					</div>
					</DialogHeader>
					<div className="flex items-center justify-start gap-3 relative">
						<h1 className="font-semibold text-gray-400">Цена за урок:</h1>
						<div className="text-base font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md cursor-pointer opacity-80 hover:opacity-100 transition-all">{prise}</div>
					</div>
					<div className="text-sm text-center flex justify-between items-center">
						<h1 className="text-base font-semibold text-gray-400">При покупке пакета уроков:</h1>
						<div className="text-base  relative font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md cursor-pointer opacity-80 hover:opacity-100 transition-all">
							<p className="absolute text-sm top-0 right-0 w-full mt-[-20px] text-[#835BD2] font-semibold">от 5 шт</p>
							{secondPrise}
						</div>
						<div className="text-base relative font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md cursor-pointer opacity-85 hover:opacity-100 transition-all">
							<p className="absolute top-0 right-0 mt-[-20px] mr-[-10px] text-3xl">🔥</p> 
							<p className="absolute text-sm top-0 right-0 w-full mt-[-20px] text-[#835BD2] font-semibold">от 15 шт</p>
							{thirdPrise}
						</div>
					</div>
					<div className="flex gap-3">
						<Button className="w-1/2 text-sm font-semibold" variant='violetSelect'>Записаться на урок</Button>
						<Button className="w-1/2 font-semibold text-sm" variant='shadow2'>Отменить</Button>
					</div>
			</DialogContent>
		</Dialog>
	)
}

export default AboutTeacherModal