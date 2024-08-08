"use server"

import { db } from "@/lib/db"

type Props = {
	blockId: string
	testId: string
	text: string
}

const updateBlock = async({blockId, testId, text}: Props) => {
	const data = await db.textBlock.update({
		where:{
			id: blockId,
			testId: testId,
		},
		data:{
			text: text
		}
	})
	return data
}

export default updateBlock