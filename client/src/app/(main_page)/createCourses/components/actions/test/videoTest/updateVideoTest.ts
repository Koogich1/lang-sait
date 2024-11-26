"use server"

import { db } from "@/lib/db"

type Props ={
	testId: string,
	question?: string,
	src: string,
}

const updateVideoTest = async({testId, question, src}: Props) => {
	await db.test.update({
		where:{
			id: testId,
		},
		data:{
			question: src,
			audioHeader: question
		}
	})
}

export default updateVideoTest