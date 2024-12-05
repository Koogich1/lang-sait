"use server"

import { db } from "@/lib/db"

type Props = {
	teacherId: string,
	userId: string
}

const getUserLessons = async ({ teacherId, userId }: Props) => {
	try{
		const data = await db.bookedLesson.findMany({
			where: {
				teacherId: teacherId,
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