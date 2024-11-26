"use server"

import { db } from "@/lib/db"

type Props = {
	materialId: string,
	position: number,
}

const upateMaterialPosition = async({materialId, position}: Props) => {
	await db.materials.update({
		where:{
			id: materialId,
		}, 
		data:{
			position: position
		}
	})
}

export default upateMaterialPosition