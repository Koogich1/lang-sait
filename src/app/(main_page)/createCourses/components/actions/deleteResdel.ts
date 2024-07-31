"use server"

import { db } from "@/lib/db"

type Props = {
	rasdelId: string;
}


const deleteResdel = async({rasdelId}: Props) => {
	// Удаляем все уроки, связанные с разделом
	await db.lessons.deleteMany({
		where: {
			rasdelId: rasdelId
		}
	})

	// Удаляем сам раздел
	const data = await db.rasdelId.delete({
		where: {
			id: rasdelId
		}
	})
	return data
}


export default deleteResdel