"use server"

import { db } from "@/lib/db"

const createLettersToWord = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

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
			position: position,
			questionType: "CONNECT_LETTERS",
			question: "Слово"
		}
	})
}

export default createLettersToWord