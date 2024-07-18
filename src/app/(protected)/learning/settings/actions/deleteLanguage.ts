"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const DeleteLanguage = async(language: string, languages: string[]) => {
	const user = await currentUser()
	if(!user?.id)return
	const userDb= await getUserById(user?.id)

	if(!userDb?.teacherId){
		return{error:"Вы не учитель"}
	}

	const newLanguages = languages.filter(lang => lang !== language);

	await db.teacher.update({
		where: {
			id: userDb?.teacherId
		},
		data:{
			language: newLanguages
		}
	})

	return newLanguages
}

export default DeleteLanguage