"use server"

import { db } from '@/lib/db'

type Props = {
	lessonId: string,
	littleRasdelId: string
}

const createPdfFail = async({lessonId, littleRasdelId}: Props) => {
	await db.test.create({
		data:{
			lessonId: lessonId,
			littleRasdelId: littleRasdelId,
			questionType: "PDF",
			question: "Скачайте и распечатайте этот файл",
			audioHeader: "https://storage.yandexcloud.net/langschoolacynberg/pdf/korean.pdf",
		}
	})
}

export default createPdfFail