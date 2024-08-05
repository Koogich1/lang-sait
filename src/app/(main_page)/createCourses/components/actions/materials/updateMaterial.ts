"use server"

import { db } from "@/lib/db"

type Props = {
	materialId: string,
	materialRasdelId: string,
	materialLessonId: string,
	content: string,
}

const updateMaterial = async({materialId, materialLessonId, materialRasdelId, content}: Props) => {
	await db.materials.update({
		where:{
			id: materialId,
			lessonId: materialLessonId,
			littleRasdelId: materialRasdelId,
		}, data:{
			content: content
		}
	})
}

export default updateMaterial