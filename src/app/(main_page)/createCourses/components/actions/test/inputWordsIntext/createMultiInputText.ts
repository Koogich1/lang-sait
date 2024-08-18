"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createMultipleText = async({lessonId, littleRasdelId}: Props) => {
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
			questionType: "FILL_WORDS_IN_THE_TEXT_MENU",
			position: position,
			options: {
				create: [
					{text: "улице", isCorrect: true, order: 1},
					{text: "улица", isCorrect: false, order: 1},
					{text: "музыка", isCorrect: false, order: 2},
					{text: "музыку", isCorrect: true, order: 2},
					{text: "домой", isCorrect: true, order: 3},
					{text: "дома", isCorrect: false, order: 3},
				]
			}
		}
	})
}

export default createMultipleText