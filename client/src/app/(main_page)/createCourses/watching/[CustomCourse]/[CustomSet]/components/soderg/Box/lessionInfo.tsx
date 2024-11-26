"use client"

import findCourseByRasdelId from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findCourseByRasdelId"
import { courseData } from "@prisma/client"
import { useEffect, useState, useCallback } from "react"

const LessonInfo = ({ rasdelId }: { rasdelId: string }) => {
	const [course, setCourse] = useState<courseData>()

	// Используем useCallback для меморизации функции
	const fetchCourse = useCallback(async () => {
		const fetched = await findCourseByRasdelId(rasdelId)
		if (fetched) {
			setCourse(fetched)
		}
	}, [rasdelId]) // Добавляем rasdelId как зависимость

	useEffect(() => {
		fetchCourse()
	}, [fetchCourse]) // Теперь зависимость fetchCourse без предупреждений

	const languageTranslations: Record<string, string> = {
		China: "Китайский",
		Korean: "Корейский",
		English: "Английский",
		German: "Немецкий",
		// Добавьте другие языки по мере необходимости
	};

	const translatedLanguage = (language: string | undefined) => {
		return languageTranslations[language || ''] || "Неизвестный язык";
	}

	return (
		<div className="flex flex-col gap-0 text-sm">
			<p className="text-gray-400 hover:text-blue-400 transition:all cursor-pointer">Курс: {course?.name}</p>
			<p className="text-gray-400 hover:text-blue-400 transition:all cursor-pointer">Язык: {translatedLanguage(course?.language)}</p>
		</div>
	)
}

export default LessonInfo
