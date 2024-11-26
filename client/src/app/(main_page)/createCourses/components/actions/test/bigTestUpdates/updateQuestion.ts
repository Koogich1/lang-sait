"use server"

import { db } from "@/lib/db"

type Props = {
	question: string,
	testId: string,
}

const updateQuestion = async({testId, question}: Props) => {
	const data = await db.test.update({
		where:{
			id: testId,
		},
		data:{
			question: question
		}
	})
	return data
}

export default updateQuestion