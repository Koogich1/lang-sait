"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string;
}

const deleteResdel = async({rasdelId }: Props) => {
	try {
		// Удаление ответов, связанных с маленькими разделами
		await db.answer.deleteMany({
			where: {
				test: {
					littleRasdel: {
						lesson: {
							rasdelId: rasdelId,
						},
					},
				},
			},
		});

		// Удаление опций
		await db.option.deleteMany({
			where: {
				test: {
					littleRasdel: {
						lesson: {
							rasdelId: rasdelId,
						},
					},
				},
			},
		});

		// Удаление тестов
		await db.test.deleteMany({
			where: {
				littleRasdel: {
					lesson: {
						rasdelId: rasdelId,
					},
				},
			},
		});

		// Удаление маленьких разделов
		const deletedLittleRasdels = await db.littleRasdel.deleteMany({
			where: {
				lesson: {
					rasdelId: rasdelId,
				},
			},
		});

		// Удаление всех уроков
		await db.lessons.deleteMany({
			where: {
				rasdelId: rasdelId,
			},
		});

		// Удаление самого раздела
		await db.rasdelId.delete({
			where: {
				id: rasdelId,
			},
		});

		// Обновление позиций оставшихся больших разделов
		const remainingRasdels = await db.rasdelId.findMany({
			orderBy: {
				position: 'asc',
			},
		});

		for (let index = 0; index < remainingRasdels.length; index++) {
			await db.rasdelId.update({
				where: { id: remainingRasdels[index].id },
				data: { position: index + 1 },
			});
		}
	} catch (error) {
		console.error("Ошибка при удалении раздела и связанных данных:", error);
	}
};

export default deleteResdel;
