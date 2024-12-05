"use server"

import { db } from "@/lib/db"

const updateLesson = async(id:string) => {
	return await db.bookedLesson.findFirst({
		where:{
			id: id
		}
	})
}

export default updateLesson