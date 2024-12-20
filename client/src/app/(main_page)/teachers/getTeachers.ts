"use server"

import { db } from "@/lib/db";

const getAllTeachers = async () => {
	const allTeachers = await db.teacher.findMany({
		where: {
			isAcceptToLearn: true, // Добавлено условие для фильтрации учителей, которые могут обучать
		},
		include: {
			languages: {  // Include the related languages
				select: {
					language: true,
					level: true,
					prefers: true,
				}
			},
		},
	});

	const teachersData = await Promise.all(
		allTeachers
			.filter((teacher) => teacher.id)
			.map(async (teacher) => {
				if (!teacher.userId) {
					return;
				}

				const user = await db.user.findUnique({
					where: {
						id: teacher.userId
					}
				});

				if (!user) {
					return;
				}

				// Extract languages from the teacher object
				const languages = teacher.languages.map(lang => ({
					language: lang.language,
					level: lang.level,
					prefers: lang.prefers
				}));

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
						languages: languages, // Use the mapped languages array
						lessonPrise: teacher.lessonPrise
					},
				};
			})
	);

	return teachersData;
};

export default getAllTeachers;
