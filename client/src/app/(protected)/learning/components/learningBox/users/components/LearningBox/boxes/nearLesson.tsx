"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { BookedLesson } from "@prisma/client"
import { IoSettings } from "react-icons/io5"

type Props = {
	nearLesson: BookedLesson
}

const NearLesson = ({nearLesson}: Props) => {
	if(!nearLesson){
		return(
			<Skeleton className="h-10 w-[15%]" />
		)
	}

	const startTime = new Date(nearLesson.startAt); // Убедитесь, что это объект Date
	const day = String(startTime.getUTCDate()).padStart(2, '0'); // Получаем часы и добавляем Leading Zero (если нужно)
	const mounths = String(startTime.getUTCMonth()).padStart(2, '0'); // Получаем минуты и добавляем Leading Zero (если нужно)
	const formattedTime = `${day}.${mounths}`; // Форматируем строку

	return (
		<div className="flex gap-2">
			<div className="p-1 h-10 w-[11.2rem] flex gap-1 bg-blue-400 rounded-lg hover:bg-blue-500 cursor-pointer hover:scale-[102%] transition-all">
				<div className="text-white text-xl flex justify-center items-center px-1 bg-blue-500 w-[3.6rem] rounded-lg">
					{formattedTime}
				</div>
				<div className="text-lg bg-blue-500 rounded-lg flex items-center justify-center text-white px-1">
					{nearLesson.slotTime}
				</div>
			</div>
			<Button className="h-10 w-10 p-0 text-xl bg-gray-200 hover:bg-gray-300" variant={"shadow2"}>
				<IoSettings className="hover:rotate-90 transition-all"/>
			</Button>
		</div>
	)
}

export default NearLesson