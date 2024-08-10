"use server"

import { db } from "@/lib/db"
	
const updateAnswer = async(answerId: string, text: string) => {
	await db.answer.update({
		where:{
			id: answerId
		},
		data:{
			text: text
		}
	})
}

export default updateAnswer