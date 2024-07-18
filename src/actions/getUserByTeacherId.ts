"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"


const getUserByTeacherId = async() => {
	const emailUser = await currentUser()
	if(!emailUser?.email) return
	const user = await getUserByEmail(emailUser.email)
	if(!user?.teacherId) return

	const teacher = await db.teacher.findUnique({
		where: {
				id: user.teacherId,
		},
	});
	
	if(!teacher){
		return
	}
	
	return {
		id: user.id,
		teacherId: user.teacherId,
		userInfo: {
				image: user.image,
				name: user.name,
				surname: user.surname,
		},
		teacherInfo: {
				aboutMe: teacher.aboutMe,
				language: teacher.language,
				levelLanguage: teacher.languageLevel
		},
	}

}

export default getUserByTeacherId