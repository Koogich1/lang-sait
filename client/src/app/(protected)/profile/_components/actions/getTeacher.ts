"use server"

import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

const GetTeacher = async() => {

	const user = await currentUser()
	if(!user){
		return
	}

	const dbUser = await db.user.findUnique({
		where:{
			id: user.id
		}
	})

	if(!dbUser?.teacherId){
		return
	}
	
	const teacher = await db.teacher.findUnique({
		where:{
			id: dbUser?.teacherId 
		}
	})
	

	const LessonsUser = await db.userSubscriptions.findFirst({
		where:{
			userId: dbUser.id,
			teacherId: teacher?.id
		}
	})

	const TeacherUser = await db.user.findUnique({
		where:{
			id: teacher?.userId
		}
	})

	if(!teacher){
		return
	}

	if(!TeacherUser){
		return
	}

	return {
		user:{
			id: dbUser?.id,
			name: dbUser?.name,
			surname: dbUser?.surname,
			mail: dbUser?.email,
			favourites: dbUser?.favourites,
			image: dbUser?.image,
			lessons: LessonsUser?.LessonsPayd,
			role: dbUser.role,
			teacherUser:{
				id: TeacherUser?.id,
				name: TeacherUser?.name,
				surname: TeacherUser?.surname,
				mail: TeacherUser?.email,
				favourites: TeacherUser?.favourites,
				image: TeacherUser?.image,
			}
		}
};
}

export default GetTeacher