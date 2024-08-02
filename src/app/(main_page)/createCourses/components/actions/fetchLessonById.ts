"use server"

import { db } from "@/lib/db"

const fetchLessonById = async(lessonId: string) => {
	const data = await db.lessons.findUnique({
		where:{
			id: lessonId
		}
	})
	return data
}

export default fetchLessonById