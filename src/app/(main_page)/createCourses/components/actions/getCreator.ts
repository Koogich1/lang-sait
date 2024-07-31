"use server"

import { db } from "@/lib/db"

const getCreator = async(userId: string) => {
	const data = await db.user.findFirst({
		where:{
			id: userId
		}
	})
	return data
}

export default getCreator