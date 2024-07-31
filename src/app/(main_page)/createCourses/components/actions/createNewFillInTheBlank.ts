"use server"

import { db } from "@/lib/db"

const createNewFillInTheBlank = async(testId: string) => {
	await db.option.create({
		data:{
			testId: testId,
			text: "Новый вариант",
			isCorrect: true,
		}
	})
}

export default createNewFillInTheBlank