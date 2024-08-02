"use server"

import { db } from "@/lib/db"

const createSimpleTest = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	console.log(tests.length)

	const position = tests.length

	await db.test.create({
		data:{
			question: "Вопрос",
			questionType: "MULTIPLE_CHOICE",
			position: position+1,
			littleRasdelId: littleRasdelId,
			lessonId: lessonId,
			options: {
				create: [
					{ text: "Ответ 1", isCorrect: false },
				]
			}
		}
	})
}

export default createSimpleTest