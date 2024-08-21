"use server"

import { db } from "@/lib/db"

type Props = {
	testId: string,
	order: number,
}

const addOrder = async({testId, order}: Props) => {
	const allOptions = await db.option.findMany({
		where:{
			testId: testId,
			order: order
		}
	})
	await db.option.create({
		data:{
			testId: testId,
			order: order,
			isCorrect: false,
			text: "вариант",
			OptionMiniOrder: allOptions.length + 1
		}
	})
}

export default addOrder