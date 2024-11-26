"use server"

import { db } from "@/lib/db"

const accept = async(applicationId: string) => {
	await db.application.update({
		where:{
			id: applicationId
		},
		data:{
			status: "accepted",
			isArchive: true
		}
	})
}

export default accept