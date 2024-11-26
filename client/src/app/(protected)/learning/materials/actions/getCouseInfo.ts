"use server"

import { db } from "@/lib/db"

const getCourseInfo = async(courseId: string) => {
	const data = await db.customCourse.findFirst({
		where:{
			id: courseId
		}
	})
	return data
}

export default getCourseInfo