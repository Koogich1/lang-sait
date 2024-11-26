"use server"

import { db } from "@/lib/db"

const createTestTasq = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	console.log(tests.length)

	const position = tests.length

	await db.test.create({
		data:{
			question: "<p>Напишите большое текстовое задание</p>",
			questionType: "ONLY_TEXT",
			position: position+1,
			littleRasdelId: littleRasdelId,
			lessonId: lessonId,
			audioHeader: "obichniy"
		}
	})
}

export default createTestTasq