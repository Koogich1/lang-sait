"use server"

import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"  

export const updateTeacher = async (
	bio:string,
	language:string,
	languages: string[],
	levelLanguage: string,
) => {
	try{
		const user = await currentUser()
	
	if(!user?.id)return{ error: "Вы не не авторизованы" }

	const dbUser = await getUserById(user?.id)

	if(!dbUser?.teacherId)return{ error: "Вы не Учитель" }

	let Newlanguages

	await db.teacher.update({
		where: {id: dbUser.teacherId},
		data:{
			aboutMe: bio,
			languageLevel: levelLanguage,
		}
	})
		if(languages.includes(language)){
			Newlanguages = languages

		}else{
			
			Newlanguages = [...languages, language]
		}

		if(!language || language == undefined || language.length < 2){
			return {success: "Настройки обновлены!"}
		}

		await db.teacher.update({
			where: {id: dbUser.teacherId},
			data:{
				language: Newlanguages,
			}
		})

		return {success: "Настройки обновлены!"}
	}catch(error){
		return { error: "An error occurred while updating teacher settings." }
	}
}