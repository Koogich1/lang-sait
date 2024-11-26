"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string,
	position: number,
}

const upateRasdelPosition = async({rasdelId, position}: Props) => {
	await db.rasdelId.update({
		where:{
			id: rasdelId,
		}, 
		data:{
			position: position
		}
	})
}

export default upateRasdelPosition