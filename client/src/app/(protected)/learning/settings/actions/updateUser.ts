"use server"

import { db } from "@/lib/db"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"  

type UpdateResult = { success: string } | { error: string };

export const updateUser = async (
	name:string, surname:string
): Promise<UpdateResult> => {
	try{
		const user = await currentUser()
	
	if(!user?.id)return{ error: "Вы не авторизованы" }

	const dbUser = await getUserById(user?.id)

	if(!dbUser)return{ error: "Вы не авторизованы" }

	console.log(dbUser.email)

	await db.user.update({
		where: {id: dbUser.id},
		data: {
			name: name,
			surname: surname
		}
	})

		return {success: "Настройки обновлены!"};
	} catch(error){
		return { error: "An error occurred while updating teacher settings." };
	}
}