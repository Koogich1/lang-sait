"use server"

import { db } from "@/lib/db"

type Props = {
	courseID: string,
}

const fetchCourses = async({courseID}: Props) => {
	const fetchData = await db.rasdelId.findMany({
		where:{
			coureId: courseID
		},
		orderBy: {
			position: 'asc' // или 'desc' для убывающего порядка
		}
	})
	return fetchData
}

export default fetchCourses