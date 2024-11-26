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
import Link from "next/link"
import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  teacher: Teacher;
};

const AboutTeacherModal = ({teacher, openModal, setOpenModal}: AboutTeacherModalProps) => {

	const prise = teacher.teacherInfo.lessonPrise
	const secondPrise = Math.round(teacher.teacherInfo.lessonPrise * 0.95) //скида 10%
	const thirdPrise = Math.round(teacher.teacherInfo.lessonPrise * 0.85) //скида 10%

	//ПОЗЖЕ ПОМЕНЯТЬ НА УНИКАЛЬНОЕ, КАК ТОЛЬКО НАУЧИШЬ ЗАГРУЖАТЬ ЕГО!
	const videoUrl = "https://storage.yandexcloud.net/langschoolacynberg/teachersVideo/English%20Teacher%20Introduction%20Video%20-%20Luna%20Kelly.mp4"

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<ToastContainer
        position="bottom-left"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
			<DialogTrigger>
				<Button 
				className='w-[120px] border-2 border-gray-300 text-gray-400 font-semibold' variant='shadow2'
				onClick={() => setOpenModal(true)}
				>Подробнее!</Button>
			</DialogTrigger>
				<DialogContent className="text-gray-600">
					<div 
							className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
							onClick={() => {setOpenModal(false)}}
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
						<div className="text-sm text-center pt-3 text-gray-400 font-medium italic">
							{`<< ${teacher.teacherInfo.aboutMe} >>`}
						</div>
					</div>
					</DialogHeader>
					<div className="flex items-center justify-start gap-3 relative">
						<h1 className="text-base font-semibold text-[#835BD2]">Цена за урок:</h1>
						<div className="text-base font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md cursor-pointer opacity-80 hover:opacity-100 transition-all">{prise}</div>
					</div>
					<div className="text-sm text-center flex justify-between items-center">
						<h1 className="text-base font-semibold text-[#835BD2]">При покупке пакета уроков:</h1>
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
						<Link href={`/teacher/${teacher.id}`} className="z-50 w-1/2">
						<Button 
							className="text-sm w-full font-semibold opacity-80 hover:opacity-100 bg-gradient-to-tr transition-all from-violet-600 to-indigo-600" variant='violetSelect'
							onClick={() => {
								const notify = () => toast(
									<p className='text-base flex flex-col'>
										{`Вы записались к учителю`}
										<span className='flex gap-1'>
											<span className='font-bold'>{teacher.userInfo.name}</span>
											{` `}
											<span className='font-bold'>{teacher.userInfo.surname}</span>
										</span>
										{`Переходите в профиль!`}
										<Link href={"/profile/user"} className='mt-2'><span className=' transition-all text-base rounded-md font-medium p-2 px-4 bg-[#835BD2] text-white hover:bg-[#6a49ab]'>Профиль</span></Link>
									</p>,
								);
								notify()
							}}
						>
							Записаться на урок
						</Button>
						</Link>
						<Button className="w-1/2 font-semibold text-sm" variant='shadow2' onClick={() => {setOpenModal(false)}}>Отменить</Button>
					</div>
			</DialogContent>
		</Dialog>
	)
}

export default AboutTeacherModal