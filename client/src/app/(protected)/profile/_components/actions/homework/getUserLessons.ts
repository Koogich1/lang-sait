"use server"

import { db } from "@/lib/db"

type Props = {
	userId: string
}

const getUserLessons = async ({ userId }: Props) => {
	try{
		const data = await db.bookedLesson.findMany({
			where: {
				userId: userId,
			},
			orderBy: {
				startAt: 'asc', // Сортировка по дате от меньшей к большей
			},
		});
		
		return data; // Не забудьте вернуть полученные данные
	}catch(e){
		console.log(e)
	}
}

export default getUserLessons;