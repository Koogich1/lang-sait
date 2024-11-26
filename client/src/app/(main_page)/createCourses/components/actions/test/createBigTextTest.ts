"use server"

import { db } from "@/lib/db"

const createBigTextTest = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {
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
			question: 'Тема для текста или сочинения',
			questionType: "BIG_TEXT_OR_STATIYA",
			position: position
		}
	})
}

export default createBigTextTest