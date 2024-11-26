"use server"

import { db } from "@/lib/db"

const getAllAplication = async(teacherId: string | null) => {

	if(!teacherId)return
	try{
		const data = await db.application.findMany({
			where:{
				receiverId: teacherId
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