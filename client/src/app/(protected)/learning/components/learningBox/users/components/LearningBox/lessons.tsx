"use client"

import { BookedLesson } from "@prisma/client"
import LessonItem from "./boxes/lessonItem"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FaArrowLeft } from "react-icons/fa6"
import LessonsMaterialsAdd from "./boxes/lessonsMaterialsAdd"

type Props = {
	lessonsBooked: BookedLesson[] | null,
}

const LessonsInfo = ({lessonsBooked}: Props) => {
	const[choosenItem, setChoosenItem] = useState<BookedLesson | null>(null)

	return (
		<div className="w-full flex flex-col min-h-[50vh] relative border-l border-gray-100 px-3">			
			{choosenItem ? 
				<>
					<LessonsMaterialsAdd lesson={choosenItem}/>
				</>
			: 
			<div className="flex flex-col">
				<h1 className="text-lg text-[#835BD2] font-medium">Уроки с учеником</h1>
				<div className="grid lg:grid-cols-2 gap-2 mt-5 items-start">
					{lessonsBooked?.map((data) => (
						<LessonItem lesson={data} setChoosen={setChoosenItem}/>
					))}
				</div>
			</div>
			}
			{
				choosenItem ? 
				<Button className="absolute z-50 top-0 right-0 h-8 text-sm flex gap-1" variant={"shadow2"} onClick={() => setChoosenItem(null)}>
					<FaArrowLeft />
					<p>Отменить выбор</p>
				</Button>
				:
				""
			}
		</div>
	)
}

export default LessonsInfo