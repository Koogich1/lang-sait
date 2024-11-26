'use server'

import { db } from "@/lib/db"

const findLessonsByRasdel = async(rasdelId: string) => {
	const data = await db.lessons.findMany({
		where:{
			rasdelId: rasdelId
		}
	})
	return data
}

export default findLessonsByRasdel