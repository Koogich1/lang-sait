"use server"

import { db } from "@/lib/db"

const FindRasdels = async(coureId: string) => {
	const data = await db.rasdelId.findMany({
		where:{
			coureId: coureId
		},
		orderBy:{
			position:"asc"
		}
	})
	return data
}

export default FindRasdels