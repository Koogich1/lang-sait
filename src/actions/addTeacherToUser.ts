"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const AddTeacherToUser = async(teacherID: string) => {
	try{
		const user = await currentUser()
		if(!user?.id)return
		const dbUser = await getUserById(user?.id)

		if(!dbUser)return

		await db.user.update({
			where:{
				id: dbUser.id,
			},
			data:{
				teacher: {
					connect:{
						id: teacherID
					}
				},
			}
		})


		console.log(teacherID, "добавлен к пользователю")
	} catch (errors){
		console.log(errors)
	}
}

export default AddTeacherToUser