"use server"

import { db } from '@/lib/db'

const getLittleRasdels = async(lessonId:string) => {
	const data = await db.littleRasdel.findMany({
		where:{
			lessonId: lessonId,
		},
		orderBy:{
			position: "asc"
		},
	})
	return data
}

export default getLittleRasdels