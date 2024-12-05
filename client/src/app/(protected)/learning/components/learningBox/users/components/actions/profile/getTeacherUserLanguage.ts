"use server"

import { db } from "@/lib/db"

const getTeacherUserLanguage = async(userId: string, teacherId: string) => {
	try{
		const languages = await db.language.findFirst({
			where:{
				userId: userId,
				teacherId: teacherId
			}
		})
		return languages
	}catch(e){
		console.log(e)
	}
}

export default getTeacherUserLanguage