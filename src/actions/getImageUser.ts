"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const userImg = async() => {
	const user = await currentUser()
	if(!user?.id){
		return
	}
	const userId = await getUserById(user.id)

	const userFullInf = await db.user.findFirst({
		where:{
			id: userId?.id
		}
	})

	return userFullInf?.image
}
export default userImg