"use server"

import { db } from "@/lib/db"
import { User } from "@prisma/client"

const getUserAplication = async(userId: User) => {

	if(!userId)return
	try{
		const data = await db.application.findMany({
			where:{
				OR: [
					{ senderId: userId.id },
					{ receiverId: userId.id },
					{senderId: userId.teacherId ? userId.teacherId : ""},
					{receiverId: userId.teacherId ? userId.teacherId : ""}
				]
			}
		})
		if(data){
			return data
		}else{
			return false
		}
	}catch(e){
		console.log(e)
	}
}

export default getUserAplication