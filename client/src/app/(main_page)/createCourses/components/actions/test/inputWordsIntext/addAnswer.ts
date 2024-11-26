"use server"

import { db } from "@/lib/db"

const addAnswer = async(testId: string) => {
	const data = await db.answer.findMany({
		where: {
			testId: testId,
		}
	})

	const orders = data.length

	await db.answer.create({
		data:{
			testId: testId,
			text: "",
			order: orders + 1
		}
	})
}

export default addAnswer