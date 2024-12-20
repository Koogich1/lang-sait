"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const acceptEmail = async() => {
	const user = await currentUser()
	if(!user) return
	try{
		await db.user.update({
			where:{
				id: user.id
			},
			data:{
				emailVerified: new Date(),
			}
		})
	}catch(e){
		console.log(e)
	}
}

export default acceptEmail