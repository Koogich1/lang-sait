"use server"

import { db } from "@/lib/db"

type Props = {
	userId: string, 
	teacherId: string,
}

const getBookingInfo = async({userId, teacherId}: Props) => {
	const data = await db.userSubscriptions.findFirst({
		where:{
			teacherId: teacherId,
			userId: userId,
		}
	})
	return data
}

export default getBookingInfo