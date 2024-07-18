"use server"

import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"  

export const updateTeacher = async (
	bio:string,
	language:string,
	languages: string[],
) => {
	try{
		const user = await currentUser()
	
	if(!user?.id)return{ error: "Вы не не авторизованы" }

	const dbUser = await getUserById(user?.id)

	if(!dbUser?.teacherId)return{ error: "Вы не Учитель" }

	console.log(dbUser.teacherId)

	let Newlanguages

	if(!language || language == undefined){
		return {success: "Настройки обновлены!"}
	}
	
	if(languages.includes(language)){
		Newlanguages = languages
	}else{
		Newlanguages = [...languages, language]
	}

	await db.teacher.update({
		where: {id: dbUser.teacherId},
		data:{
			aboutMe: bio,
			language: Newlanguages
		}
	})
	

		return {success: "Настройки обновлены!"}
	}catch(error){
		return { error: "An error occurred while updating teacher settings." }
	}
}