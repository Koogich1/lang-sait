"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createInputText = async({lessonId, littleRasdelId}: Props) => {
	await db.test.create({
		data:{
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			question: "Я шел по [] и слушал [] пока не дошел до магазина, а после вернулся []",
			questionType: "FILL_WORDS_IN_THE_BLANK_DROPDOWN",
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