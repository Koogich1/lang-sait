"use server"

import { db } from "@/lib/db"

const cansel = async(applicationId: string) => {
	await db.application.update({
		where:{
			id: applicationId
		},
		data:{
			status: "waiting",
			isArchive: false
		}
	})
}

export default cansel