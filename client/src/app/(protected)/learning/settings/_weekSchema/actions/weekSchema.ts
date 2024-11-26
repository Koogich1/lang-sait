"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const WeekSchema = async() => {
	const user = await currentUser()
	if(!user){return}
	const dbUser = await getUserById(user.id)
	if(!dbUser?.teacherId){
		return
	}
	
	const teacherAviabillity = await db.teacherAvailability.findMany({
		where:{
			teacherId: dbUser?.teacherId
		}
	})

	return teacherAviabillity
}

export default WeekSchema