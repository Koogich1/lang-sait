"use server"

import { db } from "@/lib/db"

const getAllCourses = async() => {
	const data = await db.courseData.findMany({
    orderBy: {
        createdAt: 'asc' // 'asc' для сортировки по возрастанию, 'desc' для убывания
    }
	});
	return data
}

export default getAllCourses