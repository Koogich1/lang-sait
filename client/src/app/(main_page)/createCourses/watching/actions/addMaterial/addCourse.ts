"use server"

import { db } from "@/lib/db"

const addCourse = async(courseId: string, customRasdelId: string) => {
	const rasdel = await db.customRasdelBox.findUnique({
		where: { id: customRasdelId }
	});
	
	if (!rasdel) {
		console.log('Custom rasdel ID не существует  ' + `${customRasdelId}`);
		throw new Error('Custom rasdel ID не существует  ' + `${customRasdelId}`);
	}

	const allRAsdels = await db.customCourseSet.findMany({
		where:{
			customRasdelId: customRasdelId
		}
	})

	const data = await db.customCourseSet.create({
		data:{
			customRasdelId: customRasdelId,
			courses: { connect: { id: courseId } },
			position: allRAsdels ? allRAsdels.length : 0
		}
	})
}

export default addCourse