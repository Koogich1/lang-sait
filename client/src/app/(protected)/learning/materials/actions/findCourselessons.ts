"use server"

import { db } from "@/lib/db"

const findCourselessons = async(customCourseId: string) => {
	const customCourse = await db.customCourseSet.findFirst({
		where:{
			id: customCourseId
		},
		include: {
			lessons: true,
		}
	})
	if(customCourse){
		return customCourse.lessons
	}
}

export default findCourselessons