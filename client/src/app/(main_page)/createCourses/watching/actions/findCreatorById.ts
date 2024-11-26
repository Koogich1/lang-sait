"use server"

import { db } from "@/lib/db"

const findCreatorById = async(id: string) => {
	return await db.user.findFirst({
		where:{
			id: id
		}
	})
}

export default findCreatorById