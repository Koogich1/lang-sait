"use server"

import { db } from "@/lib/db"

const setFalseToOption = async(optionId: string) => {
	await db.option.update({
		where:{
			id: optionId
		}, 
		data: {
			isCorrect: false
		}
	})
}

export default setFalseToOption