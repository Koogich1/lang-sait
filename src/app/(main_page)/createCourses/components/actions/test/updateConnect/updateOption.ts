"use server"

import { db } from "@/lib/db"
	
const updateOption = async(optionId: string, text: string) => {
	await db.option.update({
		where:{
			id: optionId
		},
		data:{
			text: text
		}
	})
}

export default updateOption