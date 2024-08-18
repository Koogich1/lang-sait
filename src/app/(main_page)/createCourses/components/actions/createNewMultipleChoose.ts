"use server"

import { db } from "@/lib/db"

const createNewMultipleChoose = async(testId: string) => {
	const data = await db.option.create({
		data:{
			testId: testId,
			text: "Новый вариант",
			isCorrect: false,
		}
	})
	return data
}

export default createNewMultipleChoose