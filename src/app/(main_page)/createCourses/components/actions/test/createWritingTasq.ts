"use server"

import { db } from "@/lib/db"

const createWritingTasq = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	console.log(tests.length)

	const position = tests.length

	await db.test.create({
		data:{
			question: "<h2>Напишите текстовое задание</h2>",
			questionType: "WRITING_TASK",
			position: position+1,
			littleRasdelId: littleRasdelId,
			lessonId: lessonId,
			textBlocks:{
				create:[
					{
						text: "<p>Текстовый блок 1<p>",
						position: 1
					},
					{
						text: "<p>Текстовый блок 2<p>",
						position: 2
					}
				]
			}
		}
	})
}

export default createWritingTasq