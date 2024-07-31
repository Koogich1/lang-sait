"use server"

import { db } from "@/lib/db"

const deleteOrdering = async(answerId: string) => {
	const data = await db.answer.delete({
		where: {
			id: answerId
		}
	})
	return data
}

export default deleteOrdering