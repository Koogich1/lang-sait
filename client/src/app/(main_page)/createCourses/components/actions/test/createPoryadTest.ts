"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const createPoryadTest = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

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
			questionType: "ORDERING",
			question: "Упорядочите...",
			position: position,
			answers: {
				create: [
					{ text: "+", order: 1 },
					{ text: "-", order: 2 },
					{ text: "*", order: 3 }
				]
			}
		}
	})
}

export default createPoryadTest