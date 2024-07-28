"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import createNotification from "./createNotification"

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

	const user2 = await db.teacher.findFirst({
		where:{
			id: teacherID
		}
	})

	if(!user2){
		return
	}

	try {
		console.log("пользователь 2", user2.id)
		console.log("пользователь 1", user.id)
		await createNotification({head: `${user.name} добавил вас как учителя!`, message: "Теперь вы можете написать ему в чате, обсудить уровень знаний, дать тесты", user1id: user.id, user2id: user2.userId})
	} catch(e){
		console.log(e)
	}
	return{success: "Успешно добавлен!)"}
	} catch (errors){
		console.log(errors)
	}
}

export default AddTeacherToUser