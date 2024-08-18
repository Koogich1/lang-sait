"use server"

import { db } from "@/lib/db"

const deleteLittleRasdel = async({rasdelId, lessonId} : {rasdelId: string, lessonId: string}) => {
	// Сначала удаляем связанные опции, ответы и тесты
	try {
		// Delete all tests associated with the littleRasdel
		const tests = await db.test.findMany({
			where: { littleRasdelId: rasdelId }
		});
		
		// Delete linked entities from Test first
		for (const test of tests) {
			await db.textBlock.deleteMany({ where: { testId: test.id } });
			await db.correctAnswer.deleteMany({ where: { testId: test.id } });
			await db.option.deleteMany({ where: { testId: test.id } });
			await db.answer.deleteMany({ where: { testId: test.id } });
		}
		await db.materials.deleteMany({
			where: {
				littleRasdelId: rasdelId
			}
		})

		// Now delete the tests themselves
		await db.test.deleteMany({
			where: {
				littleRasdelId: rasdelId
			}
		});

		// Finally, delete the littleRasdel
		await db.littleRasdel.delete({
			where: { id: rasdelId }
		});

		// Update positions of remaining littleRasdel
		const remainingRasdels = await db.littleRasdel.findMany({
			where: { lessonId },
			orderBy: { position: 'asc' }
		});

		for (let index = 0; index < remainingRasdels.length; index++) {
			await db.littleRasdel.update({
				where: { id: remainingRasdels[index].id },
				data: { position: index + 1 }
			});
		}
	} catch (error) {
		console.error("Error deleting littleRasdel:", error);
		throw error; // or handle it as needed
	}
};


export default deleteLittleRasdel
