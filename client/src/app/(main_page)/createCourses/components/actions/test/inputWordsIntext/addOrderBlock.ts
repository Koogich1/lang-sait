"use server"

import { db } from "@/lib/db"

const addOrderBlock = async (testId: string) => {
	// Получаем максимальное значение order
	const maxOrderResult = await db.option.findMany({
		where: {
			testId: testId,
		},
		orderBy: {
			order: 'desc', // Сортируем по убыванию
		},
		take: 1, // Берем только одну запись
	});

	// Если есть записи, получаем их значение, иначе 0
	const orders = maxOrderResult.length > 0 ? maxOrderResult[0].order : 0;

	// Создаем новую запись с incremented order
	await db.option.create({
		data: {
			OptionMiniOrder: 1,
			testId: testId,
			text: "",
			order: orders ? orders + 1 : 1,
		},
	});
};

export default addOrderBlock;
