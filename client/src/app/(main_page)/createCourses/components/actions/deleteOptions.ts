"use server"

import { db } from "@/lib/db"

const deleteOptions = async(optionId: string) => {
	await db.option.delete({
		where:{
			id: optionId
		}
	})
	
}

export default deleteOptions