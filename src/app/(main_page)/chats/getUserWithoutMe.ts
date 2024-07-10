"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"


const getUserWithoutMe = async() => {
	const user = await currentUser()
	if(!user?.email){return}

	try {
		const users = await db.user.findMany({
			where:{
				NOT:{email: user.email}
			}
		})
		return users
	} catch (error: any){
		return[]
	}
}

export default getUserWithoutMe