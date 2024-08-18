"use server"

import { db } from '@/lib/db'

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createPdfFail = async({lessonId, littleRasdelId}: Props) => {
	const tests = await db.test.findMany({
		where:{
			littleRasdelId: littleRasdelId
		}
	})

	const position = tests.length + 1

	await db.test.create({
		data:{
			position: position,
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			questionType: "PDF",
			question: "Скачайте и распечатайте этот файл",
			audioHeader: "https://storage.yandexcloud.net/langschoolacynberg/pdf/korean.pdf",
		}
	})
}

export default createPdfFail