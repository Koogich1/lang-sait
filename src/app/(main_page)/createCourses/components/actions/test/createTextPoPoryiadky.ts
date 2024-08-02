"use server"

import { db } from "@/lib/db"

const createBigTestByPoryad = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

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
			questionType: "TEXT_PO_PORYADKY",
			question: "Упорядочите...",
			position: position,
			answers: {
				create: [
					{ text: "Большой блок текста 1", order: 1 },
					{ text: "Большой блок текста 2", order: 2 },
					{ text: "Большой блок текста 3", order: 3 }
				]
			}
		}
	})
}

export default createBigTestByPoryad