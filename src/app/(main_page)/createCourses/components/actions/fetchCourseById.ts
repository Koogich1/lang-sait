"use server"

import { db } from "@/lib/db"

const fetchCourseById = async(courseId: string) => {
	const data = await db.courseData.findUnique({
		where:{
			id: courseId
		}
	})
	return data
}

export default fetchCourseById