"use server"

import { db } from "@/lib/db"

type Props = {
	currentLittleRasdelId: string,
	currentLessonId: string,
}

const getMaterailFromDb = async({currentLittleRasdelId, currentLessonId}: Props) => {
	const materials = await db.materials.findMany({
		where:{
			lessonId: currentLessonId,
			littleRasdelId: currentLittleRasdelId,
		},
		orderBy:{
			position: "asc"
		}
	})
	return materials
}

export default getMaterailFromDb