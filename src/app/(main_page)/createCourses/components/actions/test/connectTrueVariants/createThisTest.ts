"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createTrueVariantsTest = async ({ lessonId, littleRasdelId }: Props) => {
	const tests = await db.test.findMany({
		where: {
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1
	
	// Создаем тест без правильных ответов
	const test = await db.test.create({
		data: {
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			question: "Текст задания соединения:",
			questionType: "CONNECT_VATIANTS",
			options: {
				create: [
					{ text: "текст 1", isCorrect: false },
					{ text: "текст 2", isCorrect: true }, // Пример правильного варианта
				]
			},
			answers: {
				create: [
					{ text: "ответ для 1", order: 1 },
					{ text: "ответ для 2", order: 2 },
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
			{ testId: test.id, optionId: options[0].id, answerId: answers[0].id }, // Пример: связываем второй вариант с вторым ответом
			{ testId: test.id, optionId: options[1].id, answerId: answers[1].id}
		]
	})

	return test; // Возвращаем созданный тест
}

export default createTrueVariantsTest;
