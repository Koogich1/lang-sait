"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const createAudioTest = async({lessonId, littleRasdelId} : {littleRasdelId: string, lessonId: string}) => {

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
			questionType: "AUDIOCHOOSE",
			question: "https://storage.yandexcloud.net/langschoolacynberg/courses/audio/test.mp3",
			position: position
		}
	})
}

export default createAudioTest