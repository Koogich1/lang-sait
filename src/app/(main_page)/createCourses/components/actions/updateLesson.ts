"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	name?: string,
	aboutLesson?: string,
	photoUrl?: string,
}

const updateLesson = async({lessonId, name, aboutLesson, photoUrl}:Props) => {
	await db.lessons.update({
		where:{
			id: lessonId,
		}, 
		data:{
			name: name,
			aboutLesson: aboutLesson,
			photoUrl: photoUrl
		}
	})
}

export default updateLesson