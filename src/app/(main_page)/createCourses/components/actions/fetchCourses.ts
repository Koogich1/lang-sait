"use server"

import { db } from "@/lib/db"

type Props = {
	courseID: string,
}

const fetchCourses = async({courseID}: Props) => {
	const fetchData = await db.rasdelId.findMany({
		where:{
			coureId: courseID
		}
	})
	return fetchData
}

export default fetchCourses