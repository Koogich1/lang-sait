"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string,
	position: number,
}

const updateTestPosition = async({rasdelId, position}: Props) => {
	await db.test.update({
		where:{
			id: rasdelId,
		}, 
		data:{
			position: position
		}
	})
}

export default updateTestPosition