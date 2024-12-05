"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string,
	position: number,
}

const updateLessonPosition = async({rasdelId, position}: Props) => {
	await db.lessons.update({
		where:{
			id: rasdelId,
		}, 
		data:{
			position: position
		}
	})
}

export default updateLessonPosition