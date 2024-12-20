'use server'

import { getUserByEmail } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const getweeksFronDb = async() => {
	const user = await currentUser()

	if(!user || !user.teacherId){
		return
	}
	

	const slotsMany = await db.teacherAvailability.findMany({
		where:{
			teacherId: user.teacherId
		}
	})

	return slotsMany
}

export default getweeksFronDb