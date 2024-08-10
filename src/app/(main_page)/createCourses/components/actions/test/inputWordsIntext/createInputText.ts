"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createInputText = async({lessonId, littleRasdelId}: Props) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1

	await db.test.create({
		data:{
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			audioHeader: "Текст задания",
			question: "Я шел по [] и слушал [] пока не дошел до магазина, а после вернулся []",
			questionType: "FILL_WORDS_IN_THE_BLANK_DROPDOWN",
			position: position,
			answers: {
				create: [
					{text: "улице", order: 1},
					{text: "музыку", order: 2},
					{text: "домой", order: 3}
				]
			}
		}
	})
}

export default createInputText