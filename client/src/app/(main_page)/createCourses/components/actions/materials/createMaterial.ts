"use server"

import { db } from "@/lib/db"

type Props = {
	currentLittleRasdelId: string,
	currentLessonId: string,
	content: string,
}

const createMaterial = async({currentLittleRasdelId, currentLessonId, content}: Props) => {
	await db.$transaction(async (prisma) => { 
		const lastMaterial = await db.materials.findFirst({
			where: { 
				littleRasdelId: currentLittleRasdelId, 
				lessonId: currentLessonId
			},
			orderBy: { position: 'desc' }
		});

		const order = lastMaterial ? lastMaterial?.position + 1 : 1;

		await prisma.materials.create({
			data:{
				content: content,
				littleRasdelId: currentLittleRasdelId,
				lessonId: currentLessonId,
				position: order,
			}
		})

	})
}

export default createMaterial