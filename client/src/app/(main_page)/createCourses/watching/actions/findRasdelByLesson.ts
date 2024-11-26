"use server"

import { db } from "@/lib/db"

const findRasdelByCourseId = async (courseId: string) => {
	return await db.customRasdelBox.findMany({
		where:{
			customCourseId: courseId
		}
	})
}

export default findRasdelByCourseId