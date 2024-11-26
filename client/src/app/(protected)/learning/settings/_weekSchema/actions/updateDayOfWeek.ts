"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { DayOfWeek } from "@prisma/client"

const UpdateDayOfWeek = async({ day, slots }: { day: string, slots: string[] }) => {
	const user = await currentUser()
	if(!user){
		return
	}
	const dbUser = await getUserById(user.id)
	if(!dbUser?.teacherId){
		return
	}

	const dayOfWeek: DayOfWeek = DayOfWeek[day as keyof typeof DayOfWeek];
	
	try{
		const teacherAvailabilityId = await db.teacherAvailability.findFirst({
			where:{
				teacherId: dbUser.teacherId,
				day: dayOfWeek,
			}
		})
		await db.teacherAvailability.update({
			where:{
				id: teacherAvailabilityId?.id
			},
			data:{
				timeSlots: slots
			}
		})
		return{success: "success"}
	}catch(error){
		return{error: "error"}
	}
}

export default UpdateDayOfWeek