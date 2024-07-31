"use server"

import { db } from "@/lib/db"

const createNewMultipleChoose = async(testId: string) => {
	await db.option.create({
		data:{
			testId: testId,
			text: "Новый вариант"
		}
	})
}

export default createNewMultipleChoose