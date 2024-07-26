"use server"

import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

type Props = {
	dayId: string,
	timeSlot: string,
	teacherId: string,
}
const bookingLogic = async({dayId, timeSlot, teacherId}: Props) => {
	const user = await currentUser()
	if(!user){
		return
	}

	try{
		await db.studentBooking.create({
			data:{
				studentId: user.id,
				teacherScheduleDayId: dayId,
				timeSlot: timeSlot,
				status: "waitingAccess"
			}
		})
		const userSubscription = await db.userSubscriptions.findFirst({
			where:{
				userId: user.id,
				teacherId: teacherId,
			}
		})
		
		console.log(userSubscription)
		
		if(!userSubscription){
			return
		}

		if(userSubscription.LessonsPayd <= 0){
			return{error: "Пополните баланс"}
		}

		const newLessonsPayd = userSubscription.LessonsPayd - 1

		await db.userSubscriptions.update({
			where:{
				id: userSubscription.id
			}, 
			data:{
				LessonsPayd: newLessonsPayd
			}
		})
		console.log("Успешная бронь")
	}catch(e){
		console.log(e)
	}
}

export default bookingLogic