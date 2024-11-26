"use server"

import { db } from "@/lib/db"

const removeOrderBlock = async (testId: string, orderToRemove: number) => {
	// Удаляем запись с указанным порядком
	await db.option.deleteMany({
		where: {
			testId: testId,
			order: orderToRemove,
		},
	});

	// Обновляем порядок у всех оставшихся записей
	await db.option.updateMany({
		where: {
			testId: testId,
			order: { gt: orderToRemove }, // Находим все записи с порядком больше удаляемого
		},
		data: {
			order: {
				increment: -1, // Уменьшаем порядок на 1
			},
		},
	});
};

export default removeOrderBlock;
