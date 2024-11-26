"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string,
	name?: string,
	aboutRasdel?: string,
	photoUrl?: string,
}

const updateRasdel = async({rasdelId, name, aboutRasdel, photoUrl}:Props) => {
	await db.rasdelId.update({
		where:{
			id: rasdelId,
		}, 
		data:{
			name: name,
			aboutRasdel: aboutRasdel,
			photoUrl: photoUrl
		}
	})
}

export default updateRasdel