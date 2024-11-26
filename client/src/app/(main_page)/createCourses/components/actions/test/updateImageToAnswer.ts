"use server"

import { db } from "@/lib/db"

const updateImageToAnswer = async(answerId: string, testId: string, url: string) => {
	await db.answer.update({
		where:{
			id: answerId,
			testId: testId
		},
		data:{
			text: url
		}
	})
}

export default updateImageToAnswer