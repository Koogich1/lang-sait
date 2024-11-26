"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const GetTeacherById = async(teacherId:string) => {

	const userDB = await currentUser()

	const teacher = await db.teacher.findFirst({
		where:{
			id: teacherId
		}
	})

	const LessonsUser = await db.userSubscriptions.findFirst({
		where:{
			teacherId: teacher?.id
		}
	})



	const user = await db.user.findFirst({
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

	const languages = await db.language.findMany({
		where:{
			userId: user.id,
		}
	})


	return {
		user:{
			id: user?.id,
			currUser: userDB?.id,
			teacherId: teacher.id,
			name: user?.name,
			surname: user?.surname,
			language: languages,
			mail: user?.email,
			favourites: user?.favourites,
			image: user?.image,
			lessons: LessonsUser?.LessonsPayd,
			lessonPrise: teacher.lessonPrise
		}
};
}

export default GetTeacherById