"use server"

import { db } from "@/lib/db"

type Props = {
	testId: string,
	text: "Новый блок",
}

const createBlock = async({testId, text}: Props) => {
	const allBlock = await db.textBlock.findMany({
		where:{
			testId: testId
		}
	})

	const position = allBlock.length + 1

	const info = await db.textBlock.create({
		data:{
			testId: testId,
			text: text,
			position: position
		}
	})
	return info
}

export default createBlock