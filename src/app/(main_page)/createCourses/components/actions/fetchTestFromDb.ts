"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId:string, 
	littleRasdelId: string
}
const fetchTestFromDb = async ({ lessonId, littleRasdelId }: Props) => {
	const tests = await db.test.findMany({
		where: {
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
		},
		include: {
			textBlocks: {
				orderBy: { position: "asc" } // Сортируем textBlocks по позиции
			},
			options: true,
			answers: {
				orderBy: {order: "asc"}
			}, 
			correctAnswers: true
		},
		orderBy:{
			position: "asc"
		}
	});
	return tests;
}

export default fetchTestFromDb;