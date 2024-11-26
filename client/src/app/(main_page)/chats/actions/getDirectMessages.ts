"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { response } from "express"

const getDirectMessages = async(friendId: string) => {
	const user = await currentUser()
	const friend = await getUserById(friendId)

	if(!user || !friend){
		throw new Error("Failed to load Users!")
	}

	try{
		const messages = await db.directMessage.findMany({
			where:{
				OR:[
					{receivedId: user.id, senderId: friendId},
					{receivedId: friendId, senderId: user.id}
				]
			},
			orderBy:{
				createdAt: "asc"
			}
		})

		return {response: messages}
	}catch(e){
		throw new Error("Failed to fetch")
	}
	
}

export default getDirectMessages