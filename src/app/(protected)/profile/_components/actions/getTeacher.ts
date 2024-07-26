"use server"

import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

const GetTeacher = async() => {

	const curentUser = await currentUser()
	if(!curentUser){return}
	const dbUser = await getUserById(curentUser.id)
	
	if(!dbUser?.teacherId){return}
	//ВОТ ТУТ ВСЕ ЛОМАЕТСЯ ЕСЛИ ТЫ УЧИТЕЛЬ, У ТЕБЯ НЕ БУДЕТ УЧИТЕЛЯ В USER И ОН ВОЗВРАЩАЕТ ПУСТУЮ ХУЙНЮ, НАДО ДУМАТЬ КАК ЕГО ЗАПУСКАТЬ
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