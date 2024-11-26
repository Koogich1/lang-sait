"use server"

import { db } from "@/lib/db"

type Props = {
	testId: string
	question?: string,
	text?: string,
	answers?: { id: string; text: string }[] // принимает массив объектов с id и text
}

const updateInputTest = async({ testId, question, text, answers }: Props) => {
	console.log("Начинаем обновление")
	try{
		await db.test.update({
			where: { id: testId },
			data: {
				question: text,
				audioHeader: question,
			},
		});
	
		// Теперь обновляем ответы
		if (answers && answers.length > 0) {
			await Promise.all(answers.map(answer => 
				db.answer.update({
					where: { id: answer.id },
					data: {
						text: answer.text,
					}
				})
			));
		}
	}catch(e){
		console.log(e)
	}
}

export default updateInputTest