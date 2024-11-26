"use server"

import { db } from "@/lib/db"

const createTrueOrFalse = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1

	await db.test.create({
		data: {
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			questionType: "TRUE_OR_FALSE",
			question: "Истина или ложь",
			position: position,
			options: {
				create: [
					{
						text: 'правда',
						isCorrect: true
					},
					{
						text: 'неправда',
						isCorrect: false
					},
					{
						text: 'правда',
						isCorrect: true
					}
				]
			}
		}
	})
}

export default createTrueOrFalse