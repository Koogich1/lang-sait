"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const getAllSubscription = async() => {
	const user = await currentUser()
	
	if(!user?.id)return

	const userSubscriptions = await db.userSubscriptions.findMany({
		where:{
			userId: user.id
		}
	})

	return userSubscriptions
}

export default getAllSubscription