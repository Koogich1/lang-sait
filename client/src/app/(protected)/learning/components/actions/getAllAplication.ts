"use server"

import { db } from "@/lib/db"
import { User } from "@prisma/client"

const getAllAplication = async(teacherId : User) => {

	if(!teacherId)return
	try{
		const data = await db.application.findMany({
			where:{
				OR: [
					{ receiverId: teacherId.id },
					{receiverId: teacherId.teacherId ? teacherId.teacherId : ""}
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

export default getAllAplication