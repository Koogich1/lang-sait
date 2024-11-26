"use server"

import { db } from '@/lib/db'
import React from 'react'

const getUserByIdChat = async(userId:string) => {
	const data = await db.user.findFirst({
		where:{
			id: userId
		}
	})
	return data
}

export default getUserByIdChat