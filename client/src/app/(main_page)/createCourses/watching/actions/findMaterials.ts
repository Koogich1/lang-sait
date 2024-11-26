"use server"

import { db } from "@/lib/db"

const findMaterials = async() => {
	const data = await db.courseData.findMany()
	return data
}

export default findMaterials