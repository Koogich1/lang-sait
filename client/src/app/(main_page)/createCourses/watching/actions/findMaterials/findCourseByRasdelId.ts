"use server"

import { db } from "@/lib/db"

const findCourseByRasdelId = async(rasdelId: string) => {
	const rasdel = await db.rasdelId.findFirst({
		where:{
			id: rasdelId
		}
	})
	if(rasdel){
		const course = await db.courseData.findFirst({
			where:{
				id: rasdel.coureId
			}
		})
		return course
	}
}

export default findCourseByRasdelId