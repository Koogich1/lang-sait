'use server'

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const indApplicationToTeacher = async(teacherId: string) => {
	const user = await currentUser()
	return await db.application.findFirst({
		where:{
			senderId: user?.id,
			receiverId: teacherId
		}
	})
}

export default indApplicationToTeacher