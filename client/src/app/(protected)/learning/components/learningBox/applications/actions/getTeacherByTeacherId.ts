"use server"

import { db } from "@/lib/db"

const getTeacherByTeacherId = async(teacherId: string) => {
	return await db.teacher.findFirst({
		where:{
			id: teacherId
		}
	})
}

export default getTeacherByTeacherId