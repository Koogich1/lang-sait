"use server"

import { db } from "@/lib/db"

const getTeacherAviabillityByTeacherID = async (teacherId: string) => {
	return await db.teacherAvailability.findMany({
			where: {
					teacherId: teacherId
			}
	});
}

export default getTeacherAviabillityByTeacherID