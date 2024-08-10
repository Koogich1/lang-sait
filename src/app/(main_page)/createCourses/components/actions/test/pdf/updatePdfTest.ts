"use server"

import { db } from "@/lib/db"

type Props ={
	testId: string,
	question?: string,
	src: string,
}

const updatePdfTest = async({testId, question, src}: Props) => {
	await db.test.update({
		where:{
			id: testId,
		},
		data:{
			question: question,
			audioHeader: src
		}
	})
}

export default updatePdfTest