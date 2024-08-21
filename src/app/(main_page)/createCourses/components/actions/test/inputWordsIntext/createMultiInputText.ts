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
			question: "Большой текст []",
			questionType: "FILL_WORDS_IN_THE_TEXT_MENU",
			position: position,
			options: {
				create: [
					{text: "улице", isCorrect: true, order: 1, OptionMiniOrder: 1}
				]
			}
		}
	})
}

export default createMultipleText