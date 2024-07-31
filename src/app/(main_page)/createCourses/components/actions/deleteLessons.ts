"use server"

import { db } from "@/lib/db"

const deleteLessons = async(lessonId: string) => {
	const data = await db.lessons.delete({
		where:{
			id: lessonId
		}
	})
	return data
}

export default deleteLessons