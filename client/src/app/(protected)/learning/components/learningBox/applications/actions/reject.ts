"use server"

import { db } from "@/lib/db"

const reject = async(applicationId: string) => {
	await db.application.update({
		where:{
			id: applicationId
		},
		data:{
			status: "rejected",
			isArchive: true
		}
	})
}

export default reject