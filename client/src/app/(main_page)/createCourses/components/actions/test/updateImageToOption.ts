"use server"

import { db } from "@/lib/db"

const updateImageToOption = async(optionId: string, testId: string, url: string) => {
	await db.option.update({
		where:{
			id: optionId,
			testId: testId
		},
		data:{
			text: url
		}
	})
}

export default updateImageToOption