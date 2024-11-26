'use server'

import { db } from "@/lib/db"

type Props = {
	teacherId: string,
	userId: string,
}
const addLessonToTeacher = async({teacherId, userId}: Props) => {
	try{
		const data = await db.userSubscriptions.findFirst({
			where:{
				teacherId: teacherId,
				userId: userId,
			}
		})
		console.log(data)
		if(data){
			await db.userSubscriptions.update({
				where:{
					id: data.id
				},
				data:{
					LessonsPayd: data.LessonsPayd + 1
				}
			})
		}
		console.log(data)
		console.log("yra")
	} catch(e){
		console.log(e)
	}
}

export default addLessonToTeacher