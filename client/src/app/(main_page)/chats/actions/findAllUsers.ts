"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const findUsers = async() => {
	const user = await currentUser()

	const data = await db.user.findMany({
		where:{
			NOT:{
				id: user?.id
			}
		}
	})
	return data
}

export default findUsers