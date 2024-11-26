"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const getAllTeacherCourses = async() => {
	const user = await currentUser()
	if(!user){
		return
	}
	const data = await db.courseData.findMany({
		where:{
			userId: user.id
		}
	})
	
	return data
}

export default getAllTeacherCourses