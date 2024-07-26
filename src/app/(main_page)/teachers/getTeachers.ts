"use server"

import { db } from "@/lib/db";

const getAllTeachers = async () => {
	const allTeachers = await db.teacher.findMany(); // Получение всех пользователей

	const teachersData = await Promise.all(
		allTeachers
			.filter((teacher) => teacher.id)
			.map(async (teacher) => {
				if(!teacher.userId){
					return
				}

				const user = await db.user.findUnique({
					where:{
						id: teacher.userId
					}
				})

				if(!user){
					return
				}

				return {
					id: user.id,
					teacherId: teacher.id,
					userInfo: {
							image: user.image,
							name: user.name,
							surname: user.surname,
					},
					teacherInfo: {
							aboutMe: teacher.aboutMe,
							language: teacher.language,
							levelLanguage: teacher.languageLevel,
							lessonPrise: teacher.lessonPrise
					},
			};
		})
	)

	return teachersData;
};


export default getAllTeachers