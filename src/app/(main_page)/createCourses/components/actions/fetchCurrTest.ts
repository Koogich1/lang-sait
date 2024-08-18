"use server"

import { db } from "@/lib/db"

const fetchCurrTest = async(testId: string) => {
	const data = await db.test.findFirst({
		where:{
			id: testId
		},
		include:{
			answers: {
        orderBy: {
          order: 'asc' // Сортировка по полю order
        }
      },
			options: true,
		},
	})
	return data
}

export default fetchCurrTest