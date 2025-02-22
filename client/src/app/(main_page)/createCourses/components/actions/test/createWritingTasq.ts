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
			question: "<div><!--block-->Напишите текстовое задание</div>",
			questionType: "WRITING_TASK",
			position: position+1,
			littleRasdelId: littleRasdelId,
			lessonId: lessonId,
			textBlocks:{
				create:[
					{
						text: "<div><!--block-->Текстовый блок 1</div>",
						position: 1
					},
					{
						text: "<div><!--block-->Текстовый блок 2</div>",
						position: 2
					}
				]
			}
		}
	})
}

export default createWritingTasq