"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const getUserByEmail = async (email: string) => {
	const user = await db.user.findUnique({
			where: {
					email: email,
			},
	});

	return user;
};
const getAllTeachers = async () => {
	const allUsers = await db.user.findMany(); // Получение всех пользователей

	const teachersData = await Promise.all(
			allUsers
					.filter((user) => user.teacherId)
					.map(async (user) => {
						if(!user.teacherId){
							return
						}
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
							};
					})
	);

	return teachersData;
};


export default getAllTeachers