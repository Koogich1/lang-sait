"use server"

import { db } from "@/lib/db"

const getUserByTeacherId = async(teacherID: string) => {
	try{
		return await db.user.findFirst({
			where:{
				teacherId: teacherID
			}
		})
	}catch(e){
		return null
		console.log(e)
	}
}

export default getUserByTeacherId