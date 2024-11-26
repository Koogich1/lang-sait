"use server"

import { db } from "@/lib/db"

type Props = {
	courseId: string,
	name?: string,
	aboutCourse?: string,
	photoUrl?: string,
}

const updateCourse = async({courseId, name, aboutCourse, photoUrl}:Props) => {
	await db.courseData.update({
		where:{
			id: courseId,
		}, 
		data:{
			name: name,
			aboutCourse: aboutCourse,
			photoUrl: photoUrl
		}
	})
}

export default updateCourse