"use server"

import { db } from '@/lib/db'

type Props = {
	lessonId: string,
	littleRasdelId: string
}


const createWordToLearn = async({lessonId, littleRasdelId}: Props) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1

	const test = await db.test.create({
		data: {
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			question: "",
			questionType: "WORDS_TO_LEARN",
			options: {
				create: [
					{ text: "hello", order: 1},
				]
			},
			answers: {
				create: [
					{ text: "Привет", order: 1 },
				]
			},
			position: position
		}
	})

	// Получаем созданные варианты и ответы
	const options = await db.option.findMany({
		where: {
			testId: test.id
		}
	})

	const answers = await db.answer.findMany({
		where: {
			testId: test.id
		}
	})

	// Создаем правильные ответы, используя идентификаторы
	await db.correctAnswer.createMany({
		data: [
			{ testId: test.id, optionId: options[0].id, answerId: answers[0].id },
		]
	})
}

export default createWordToLearn