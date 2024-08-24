'use server'

import { db } from "@/lib/db"

const addPhotoTOTextTasq = async(testId: string) => {
	await db.option.create({
		data:{
			testId: testId,
			text: "https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png"
		}
	})
}

export default addPhotoTOTextTasq