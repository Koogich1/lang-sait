"use server"

import { db } from "@/lib/db"

type Props = {
	testId: string,
	order: number,
}

const addOrder = async({testId, order}: Props) => {
	await db.option.create({
		data:{
			testId: testId,
			order: order,
			isCorrect: false,
			text: "вариант"
		}
	})
}

export default addOrder