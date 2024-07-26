"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const GetTeacherById = async(teacherId:string) => {

	const userDB = await currentUser()

	const teacher = await db.teacher.findUnique({
		where:{
			id: teacherId
		}
	})

	const LessonsUser = await db.userSubscriptions.findFirst({
		where:{
			teacherId: teacher?.id
		}
	})

	const user = await db.user.findUnique({
		where:{
			id: teacher?.userId
		}
	})

	if(!teacher){
		return
	}

	if(!user){
		return
	}

	return {
		user:{
			id: user?.id,
			currUser: userDB?.id,
			teacherId: teacher.id,
			name: user?.name,
			surname: user?.surname,
			language: teacher.language,
			mail: user?.email,
			favourites: user?.favourites,
			image: user?.image,
			lessons: LessonsUser?.LessonsPayd,
			lessonPrise: teacher.lessonPrise
		}
};
}

export default GetTeacherById