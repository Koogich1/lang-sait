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

		console.log(teacherID)

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
		await db.userSubscriptions.create({
			data:{
				user:{
					connect:{
						id: dbUser.id
					}
				},
				teacherId: teacherID
			}
		})

		console.log(teacherID, "добавлен к пользователю")
	} catch (errors){
		console.log(errors)
	}
}

export default AddTeacherToUser