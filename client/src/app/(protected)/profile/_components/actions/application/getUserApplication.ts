"use server"

import { db } from "@/lib/db"

const getUserAplication = async(userId: string | null) => {

	if(!userId)return
	try{
		const data = await db.application.findMany({
			where:{
				OR: [
					{ senderId: userId },
					{ receiverId: userId }
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