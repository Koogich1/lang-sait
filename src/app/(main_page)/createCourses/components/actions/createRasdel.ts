"use server"

import { db } from "@/lib/db"
import { courseData } from "@prisma/client"

type Props = {
	name: string,
	aboutRasdel: string,
	photoUrl: string,
	course: courseData,
}

const createRasdel = async({name, aboutRasdel, photoUrl, course}: Props) => {
	await db.rasdelId.create({
		data:{
			name: name,
			aboutRasdel: aboutRasdel,
			coureId: course.id,
			userId: course.userId,
			photoUrl: photoUrl,
		}
	})
}

export default createRasdel