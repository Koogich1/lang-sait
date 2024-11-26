"use server"

import { db } from "@/lib/db"
import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"  

export const updateTeacher = async (
	bio:string,
	prise: number,
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
			lessonPrise: prise,
		}
	})

		return {success: "Настройки обновлены!"}
	}catch(error){
		return { error: "An error occurred while updating teacher settings." }
	}
}