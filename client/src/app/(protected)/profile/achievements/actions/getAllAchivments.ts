'use server'

import { db } from "@/lib/db"

const getAllAchievements = async(userId: string) => {
	const data = await db.achievement.findMany({
		where: {
			userId: userId
		},
		orderBy: [
			{ isReverdReceived: 'asc' }, // false будет первым
			{ id: 'asc' } // сортировка по id
		]
	})
	return data
}

export default getAllAchievements
