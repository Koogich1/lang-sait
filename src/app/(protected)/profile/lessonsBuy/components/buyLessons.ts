"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

type Props = {
	teacherId: string,
	lessons: string,
}

const buyLessons = async({teacherId, lessons}: Props) => {
	try{
		const user = await currentUser()
		if(!user?.id){return}
		const userSubscription = await db.userSubscriptions.findFirst({
			where:{
				userId: user.id,
				teacherId: teacherId
			}
		})

		if(!userSubscription){return}

		const lessonsPrev = +userSubscription?.LessonsPayd + +lessons

		await db.userSubscriptions.update({
			where:{
				id: userSubscription?.id
			},
			data:{
				LessonsPayd: lessonsPrev
			}
		})
	} catch(e){
	}
}

export default buyLessons