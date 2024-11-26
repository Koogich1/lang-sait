'use server'

import { getUserByEmail } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const getweeksFronDb = async() => {
	const user = await currentUser()

	if(!user?.email){
		return
	}

	const userByEmail = await getUserByEmail(user?.email)


	const teacherId = userByEmail?.teacherId
	
	if(!teacherId){
		return('Вы не учитель!')
	}

	const slotsMany = await db.teacherScheduleDay.findMany({
		where:{
			teacherId: teacherId
		}
	})

	return slotsMany
}

export default getweeksFronDb