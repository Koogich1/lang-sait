"use server"

import { db } from "@/lib/db"

type Props = {
	rasdId: string,
	name: string,
}

const updateLittleRasdelName = async({rasdId, name}:Props) => {
	const updatedRasdel = await db.littleRasdel.update({
		where:{
			id: rasdId,
		}, data:{
			name: name
		}
	})
	return updatedRasdel
}

export default updateLittleRasdelName