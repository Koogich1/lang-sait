"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const findedLessons = async() => {
	const user = await currentUser()
	if(user){
		const lessons = await db.customCourse.findMany({
			where:{
				userId: user.id
			}
		})
		return lessons
	}
}

export default findedLessons