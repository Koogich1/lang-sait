"use server"

import { db } from '@/lib/db'
import { User } from '@prisma/client'

const findNotification = async(user: User) => {
	try{
		const notifications = await db.notification.findMany({
			where:{
				user2Id: user.id
			}
		})
		return notifications
	} catch(e){
		console.log(e)
	}
}

export default findNotification