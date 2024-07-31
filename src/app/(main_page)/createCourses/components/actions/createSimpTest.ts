"use server"

import { db } from "@/lib/db"

const createSimpTest = async(littleRasdelId:string, lessonId: string) => {
	const data = await db.littleRasdel.update({
		where:{
			id: littleRasdelId,
		}, data:{
			tests:{
				create: [
					{
						question: "Какой тип данных существует в JavaScript? ",
						questionType: "MULTIPLE_CHOICE",
						lessonId: lessonId,
						options: {
							create: [
								{ text: "Число", isCorrect: false },
								{ text: "Строка", isCorrect: false },
								{ text: "Объект", isCorrect: false },
								{ text: "Все вышеперечисленное", isCorrect: true }
							]
						}
					},
					{
						question: "Упорядочите следующие операторы от меньшего к большему приоритету: +, *, -",
						questionType: "ORDERING",
						lessonId: lessonId,
						answers: {
							create: [
								{ text: "+", order: 1 },
								{ text: "-", order: 2 },
								{ text: "*", order: 3 }
							]
						}
					},
					{
						question: "В каком случае код внутри блока if будет выполнен?",
						questionType: "FILL_IN_THE_BLANK",
						lessonId: lessonId,
						options: {
							create: [
								{ text: "Если условие истинно", isCorrect: true }
							]
						}
					}
				]
			}
		}
	})
}

export default createSimpTest