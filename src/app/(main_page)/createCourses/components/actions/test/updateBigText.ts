"use server"

import { db } from "@/lib/db"

type Props ={
	testId: string;
	text: string;
}

const updateBigText = async({testId, text}: Props) => {
	await db.test.update({
		where:{
			id: testId,
		},
		data:{
			question: text
		}
	})
}

export default updateBigText