"use server"

import { db } from "@/lib/db"


const addImageBlock = async(testId: string) => {
	const allAnswers = await db.answer.findMany({
		where: {
			testId: testId
		}
	})
	const allOrders = await db.option.findMany({
		where:{
			testId: testId
		}
	})
	const answer = await db.answer.create({
		data: {
			testId: testId,
			text: "https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png",
			order: allAnswers.length + 1
		}
	})
	const option = await db.option.create({
		data: {
			testId: testId,
			text: "ответ",
			order: allOrders.length + 1
		}
	})
	await db.correctAnswer.create({
		data:{
			testId: testId,
			answerId: answer.id,
			optionId: option.id
		}
	})
}

export default addImageBlock