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

		const teacher = await db.user.findFirst({
			where:{
				id: dbUser.id,
			}
		})

		if (teacher) {
			// Retrieve existing teacher IDs, ensure it's an array
			const existingTeacherIDs = teacher.TeacherS || []

			// Check if the teacherID already exists to avoid duplicates
			if (!existingTeacherIDs.includes(teacherID)) {
					existingTeacherIDs.push(teacherID)

					await db.user.update({
							where: {
									id: teacher.id
							},
							data: {
									TeacherS: existingTeacherIDs // Update with the new array
							}
						})
					}
			}

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

	return{success: "Успешно добавлен!)"}
	} catch (errors){
		console.log(errors)
	}
}

export default AddTeacherToUser