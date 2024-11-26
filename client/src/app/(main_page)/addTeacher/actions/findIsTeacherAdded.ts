"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const findIsTeacherAdded = async(teacherId: string) => {
	const user = await currentUser()
	if(!user){
		return
	}
	try{
		const data = await db.application.findFirst({
			where:{
				senderId: user.id,
				receiverId: teacherId,
			}
		})
		if(data){
			return true
		}else{
			return false
		}
	}catch(e){
		console.log(e)
		return false
	}
}

export default findIsTeacherAdded