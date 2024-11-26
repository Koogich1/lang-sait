"use server"

import { db } from "@/lib/db"

const fetchCourses = async() => {
	return await db.courseData.findMany()
}

export default fetchCourses