"use server"

import { db } from "@/lib/db"


const addBlock = async(testId: string) => {
	const allAnswers = await db.answer.findMany({
		where: {
			testId: testId
		}
	})
	const answer = await db.answer.create({
		data: {
			testId: testId,
			text: "ответ",
			order: allAnswers.length + 1
		}
	})
	const option = await db.option.create({
		data: {
			testId: testId,
			text: "ответ",
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

export default addBlock