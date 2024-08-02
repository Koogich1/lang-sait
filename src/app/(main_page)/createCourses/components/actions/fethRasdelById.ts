"use server"

import { db } from '@/lib/db'

const fetchRasdelById = async(rasdelId: string) => {
	const data = await db.rasdelId.findUnique({
		where:{
			id: rasdelId
		}
	})

	return data
}

export default fetchRasdelById