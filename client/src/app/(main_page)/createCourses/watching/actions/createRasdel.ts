"use server"

import { db } from "@/lib/db"

const createRasdel = async(courseId: string, name: string) => {
	const allRasdels = await db.customRasdelBox.findMany({
		where:{
			customCourseId: courseId
		}
	})

	await db.customRasdelBox.create({
		data:{
			customCourseId: courseId,
			name: name,
			order: allRasdels.length
		}
	})
}

export default createRasdel