"use client"

import { BookedLesson } from "@prisma/client"

type Props = {
	lesson: BookedLesson
}

const PageLesson = ({ lesson }: Props) => {
	const startTime = new Date(lesson.startAt); // Убедитесь, что это объект Date
	const day = String(startTime.getUTCDate()).padStart(2, '0'); // Получаем день и добавляем Leading Zero (если нужно)
	const month = String(startTime.getUTCMonth() + 1).padStart(2, '0'); // Получаем месяц и добавляем Leading Zero (если нужно)
	const formattedTime = `${day}.${month}`; // Форматируем строку

	return (
		<div className="text-sm flex gap-1 items-center w-full text-gray-400 font-medium py-2 justify-start border-t rounded-lg">
			<div className="px-2 py-[0.075rem] bg-blue-400 rounded-md text-white font-medium">{formattedTime}</div>
			<p>в</p>
			<div className="px-2 py-[0.075rem] bg-blue-400 rounded-md text-white font-medium">{lesson.slotTime}</div>
		</div>
	)
}

export default PageLesson;
