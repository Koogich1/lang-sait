"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { languageVariants } from "@prisma/client"

const createApplicationAdding = async(teacherId: string, language: languageVariants) => {
	const user = await currentUser()
	if(!user)return
	try{
		await db.application.create({
			data:{
				senderId: user.id,
				receiverId: teacherId,
				format: "addTeacher",
				status: "waiting",
				language: language
			}
		})
		return true
	}catch(e){
		console.log(e)
		return false
	}
}

export default createApplicationAdding