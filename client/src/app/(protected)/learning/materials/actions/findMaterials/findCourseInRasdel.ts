"use server"

import { db } from "@/lib/db"

const findCourseInRasdel = async(courseId: string) => {
	return await db.courseData.findFirst({
		where:{
			id: courseId
		}
	})
}

export default findCourseInRasdel