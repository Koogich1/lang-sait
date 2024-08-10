"use server"

import { db } from "@/lib/db"

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createVideoTest = async({lessonId, littleRasdelId}: Props) => {

	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1
	
	await db.test.create({
		data: {
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			questionType: "VIDEO",
			question: "https://storage.yandexcloud.net/langschoolacynberg/teachersVideo/teacherVideo.mp4",
			audioHeader: "Текст задания",
			position: position
		}
	})
}

export default createVideoTest