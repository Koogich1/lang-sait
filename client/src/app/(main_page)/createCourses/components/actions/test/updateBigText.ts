"use server"

import { db } from "@/lib/db"

type Props ={
	testId: string;
	text: string;
	question?: string;
}

const updateBigText = async({testId, text, question}: Props) => {
	await db.test.update({
		where:{
			id: testId,
		},
		data:{
			question: text,
			audioHeader: question
		}
	})
}

export default updateBigText