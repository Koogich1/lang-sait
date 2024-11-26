"use server"

import { db } from "@/lib/db"

const updateTrueOrFalse = async(optionId: string, isCorrect: boolean) => {
	console.log(`обновил ${optionId} on ${isCorrect}`)
	await db.option.update({
		where:{
			id: optionId,
		},
		data:{
			isCorrect: isCorrect
		}
	})
}

export default updateTrueOrFalse