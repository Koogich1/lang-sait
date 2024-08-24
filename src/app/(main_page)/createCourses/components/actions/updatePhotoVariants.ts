"use server"

import { db } from "@/lib/db"

const updatePhotoVariants = async(testId: string, audioHeader: string) => {
	await db.test.update({
		where:{
			id: testId
		},
		data:{
			audioHeader: audioHeader
		}
	})
}

export default updatePhotoVariants