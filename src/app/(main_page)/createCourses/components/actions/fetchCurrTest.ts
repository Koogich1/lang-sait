"use server"

import { db } from "@/lib/db"

const fetchCurrTest = async(testId: string) => {
	const data = await db.test.findFirst({
		where:{
			id: testId
		},
		include:{
			answers: true,
			options: true,
		}
	})
	console.log(data)
	return data
}

export default fetchCurrTest