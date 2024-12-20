'use server'

import { db } from "@/lib/db"
import { Achievement } from "@prisma/client"

const addCoinsAndUpdateAchivment = async(achivment: Achievement, coins: number, userId: string) => {
	const updateAchivment = await db.achievement.update({
		where:{
			id: achivment.id
		},
		data:{
			isReverdReceived: true
		}
	})
	const addCoins = await db.user.update({
		where:{
			id: userId
		},
		data:{
			coins: {
				increment: coins
			}
		}
	})
}

export default addCoinsAndUpdateAchivment