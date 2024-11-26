"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const createFillAnswer = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

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
			questionType: "FILL_IN_THE_BLANK",
			question: "Ворос",
			position: position,
			options: {
				create: [
					{ text: "Если условие истинно", isCorrect: true }
				]
			}
		}
	})
}

export default createFillAnswer