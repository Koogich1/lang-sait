'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { BookedLesson } from "@prisma/client"
import { useState } from "react"
import { IoChevronDown } from "react-icons/io5"
import { ClipLoader } from "react-spinners"
import LittleCourseInfo from "./littleCourseInfo"

type Props = {
	lesson: BookedLesson;
	setChoosen: any;
}

const LessonItem = ({lesson, setChoosen}: Props) => {
	const[open, setOpen] = useState<boolean>(false)

	if(!lesson)return	

	const startTime = new Date(lesson.startAt); // Убедитесь, что это объект Date
	const day = String(startTime.getUTCDate()).padStart(2, '0'); // Получаем часы и добавляем Leading Zero (если нужно)
	const mounths = String(startTime.getUTCMonth()).padStart(2, '0'); // Получаем минуты и добавляем Leading Zero (если нужно)
	const formattedTime = `${day}.${mounths}`; // Форматируем строку

	return (
		<div>
			<Accordion 
			type="single" 
			collapsible 
			className="w-full border border-gray-200 hover:border-blue-100 transition-all shadow-sm min-h-20 rounded-lg overflow-hidden"
			>
				<AccordionItem value="1" className="border-none">
					<AccordionTrigger 
						className="h-[5.4rem] border-none border-b-0 p-2 px-3 flex relative hover:bg-blue-50"
						onClick={() => {setOpen(!open)}}
					>
						<div className="flex flex-col justify-between items-start">
							<div className="text-blue-500 text-lg flex font-semibold justify-center items-start rounded-lg">
								Дата:
								{" " + formattedTime}
							</div>
							<div className="flex gap-2 items-center">
								<p className="font-semibold text-gray-400">Слот: </p>
								<div className="text-base bg-blue-400 rounded-lg flex items-center justify-center text-white px-1">
									{lesson.slotTime}
								</div>
							</div>
							<div className="flex gap-1 items-center">
								<h1 className="text-gray-400">Материалов добавлено:</h1>
								<div className="text-base bg-blue-400 rounded-lg flex items-center justify-center text-white px-2">{lesson.Materials.length}</div>
							</div>
						</div>
						<Button className="absolute text-white right-3 flex items-center justify-center p-0 h-6 w-6 bg-blue-400 hover:bg-blue-500 z-50" variant={"violetSelect"}>
							<IoChevronDown className={`text-xl transition-all rotate-${open ? "180" : "0"}`} />
						</Button>
					</AccordionTrigger>
					<AccordionContent className="border-none px-3 py-3">
						<h1 className="text-lg text-blue-500 font-medium">
							Список материалов:
						</h1>
						{lesson.Materials.length > 0 ? 
						<div className="flex flex-col gap-2 mt-1">
							{lesson.Materials.slice(0, 3).map((data: any, index) => (
									<div key={index} className="min-h-10"> 
											<LittleCourseInfo id={data} position={index + 1}/>
									</div>
							))}
						</div>
						: 
						<div className="min-h-20 flex items-center justify-center">
							<div className="flex gap-1 items-center justify-center text-gray-400">
								<p>Материалов пока нет...</p>
								<ClipLoader color="#9ca3af" size={15}/>
							</div>
						</div>
						}
						{lesson.Materials.length > 0 ? 
						<div className="w-full pt-5 flex items-center justify-start">
							<Button 
								className="h-8 font-medium text-base" 
								variant={"violetSelect"}
								onClick={() => {setChoosen(lesson)}}
							>
								Редактировать
							</Button>
						</div>
						:
						<div className="w-full pt-5 flex items-center justify-start">
							<Button 
								className="h-8 font-medium text-base" 
								variant={"violetSelect"}
								onClick={() => {setChoosen(lesson)}}
							>
								Добавить материалы!
							</Button>
						</div>
						}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

export default LessonItem