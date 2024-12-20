"use client"

import { Button } from "@/components/ui/button";
import { BookedLesson } from "@prisma/client";
import { FaCalendar, FaClock, FaLanguage } from "react-icons/fa6";
import NearLessonTeacher from "./nearLessonTeacher";
import { HiAcademicCap } from "react-icons/hi";
import { IoEnter } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";

type Props ={
	lesson: BookedLesson
}

const NearLessonBlock = ({lesson}: Props) => {

	const startTime = new Date(lesson.startAt); // Убедитесь, что это объект Date
	const day = String(startTime.getUTCDate()).padStart(2, '0'); // Получаем день и добавляем Leading Zero (если нужно)
	const month = String(startTime.getUTCMonth() + 1).padStart(2, '0'); // Получаем месяц и добавляем Leading Zero (если нужно)
	const formattedTime = `${day}.${month}`; // Форматируем строку
	return (
		<div className="flex gap-2 px-2 py-1 items-center w-full border rounded-lg border-gray-200">
			<div className="text-gray-400 font-medium flex flex-col text-sm w-full">
				{lesson.type === "personal" && 
					<h1 className="text-blue-400 pb-2 text-base">
						Индивидуальное занятие
					</h1>
				}
				<div className="flex gap-2 items-center">
					<FaCalendar />
					<h1>Дата:</h1>
					<Button className="text-white bg-blue-400 hover:bg-blue-500 py-1 h-6 px-2">{formattedTime}</Button>
				</div>
				<div className="flex gap-2 items-center">
					<FaClock />
					<h1>В</h1>
					<div className="text-blue-400">{lesson.slotTime}</div>
				</div>
				<div className="flex gap-2 items-center">
					<FaLanguage className="scale-110"/>
					<h1>Язык</h1>
					<div className="text-blue-400">
						{lesson.language === "China" && "Китайский"}
						{lesson.language === "Korean" && "Корейский"}
						{lesson.language === "German" && "Немецкий"}
						{lesson.language === "English" && "Английский"}
					</div>
				</div>
				<div className="flex flex-col gap-2 mt-[0.125rem]">
					<div className="flex gap-2 items-center">
						<HiAcademicCap  className="scale-110 text-base ml-[-1px]"/>
						<p>Учитель:</p>
					</div>
					<NearLessonTeacher teacherId={lesson.teacherId}/>
				</div>
				<div className="mt-3 w-full flex gap-2">
						<Button className="w-1/2 bg-blue-400 hover:bg-blue-500 h-8 gap-1" variant={"violetSelect"}>
						Войти
						<IoEnter />
					</Button>
					<Button className="w-1/2 h-8 gap-1" variant={"shadow2"}>
						Отменить
						<TiCancel className="scale-125"/>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default NearLessonBlock