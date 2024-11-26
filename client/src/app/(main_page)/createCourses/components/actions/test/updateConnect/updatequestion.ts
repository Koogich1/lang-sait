"use server"

import { db } from "@/lib/db"
	
const updateQuestion = async(testId: string, text: string) => {
	await db.test.update({
		where:{
			id: testId
		},
		data:{
			question: text
		}
	})
}

export default updateQuestion