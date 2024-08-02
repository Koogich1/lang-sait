"use server"

import { db } from "@/lib/db"

const deleteLittleRasdel = async({rasdelId, lessonId} : {rasdelId: string, lessonId: string}) => {
	// Сначала удаляем связанные опции, ответы и тесты
	await db.option.deleteMany({
		where: {
			test: {
				littleRasdelId: rasdelId
			}
		}
	});

	await db.answer.deleteMany({
		where: {
			test: {
				littleRasdelId: rasdelId
			}
		}
	});
	
	await db.test.deleteMany({
		where: {
			littleRasdelId: rasdelId
		}
	});

	// Удаляем littleRasdel
	await db.littleRasdel.delete({
		where: {
			id: rasdelId
		}
	});
	
	// После удаления, нужно обновить позиции оставшихся littleRasdel
	const remainingRasdels = await db.littleRasdel.findMany({
		where: {
			lessonId: lessonId,  // Убедитесь, что lessonId доступен здесь
		},
		orderBy: {
			position: 'asc'
		}
	});

	for (let index = 0; index < remainingRasdels.length; index++) {
		await db.littleRasdel.update({
			where: { id: remainingRasdels[index].id },
			data: { position: index + 1 }
		});
	}
}

export default deleteLittleRasdel
