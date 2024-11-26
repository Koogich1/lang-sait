"use server"

import { db } from "@/lib/db"

const deleteCourse = async(courseId: string) => {
	try {
		// Сначала удаляем тесты, связанные с маленькими разделами
		await db.test.deleteMany({
			where: {
				littleRasdel: {
					lesson: {
						rasdel: {
							coureId: courseId, // Используем coureId
						},
					},
				},
			},
		});

		// Затем удаляем ответы, связанные с тестами
		await db.answer.deleteMany({
			where: {
				test: {
					littleRasdel: {
						lesson: {
							rasdel: {
								coureId: courseId, // Используем coureId
							},
						},
					},
				},
			},
		});

		// Удаляем опции, связанные с тестами
		await db.option.deleteMany({
			where: {
				test: {
					littleRasdel: {
						lesson: {
							rasdel: {
								coureId: courseId, // Используем coureId
							},
						},
					},
				},
			},
		});
		
		// Удаляем маленькие разделы (LittleRasdel)
		await db.littleRasdel.deleteMany({
			where: {
				lesson: {
					rasdel: {
						coureId: courseId, // Используем coureId
					},
				},
			},
		});

		// Удаляем уроки (Lessons)
		await db.lessons.deleteMany({
			where: {
				rasdel: {
					coureId: courseId, // Используем coureId
				},
			},
		});

		// Удаляем разделы (rasdelId)
		await db.rasdelId.deleteMany({
			where: {
				coureId: courseId, // Используем coureId
			},
		});

		// Удаляем сам курс
		const deleteData = await db.courseData.delete({
			where: {
				id: courseId,
			},
		});

		return deleteData;
	} catch (e) {
		console.error("Ошибка при удалении курса и связанных данных:", e);
	}
}

export default deleteCourse;
