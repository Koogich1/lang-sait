"use client"

import findCourseByRasdelId from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findCourseByRasdelId"
import { courseData } from "@prisma/client"
import { useEffect, useState } from "react"

const LessonInfo = ({rasdelId} : {rasdelId: string}) => {
	const[course, setCourse] = useState<courseData>()

	const fetchCourse = async() => {
		const fetched = await findCourseByRasdelId(rasdelId)
		if(fetched){
			setCourse(fetched)
		}
	}

	useEffect(() => {
		fetchCourse()
	},[])

	const languageTranslations: any = {
    China: "Китайский",
    Korean: "Корейский",
    English: "Английский",
    German: "Немецкий",
    // Добавьте другие языки по мере необходимости
  };

	const translatedLanguage = (course: any) => {
    return languageTranslations[course] || "Неизвестный язык";
  }

	return (
		<div className="flex flex-col gap-0 text-sm">
			<p className="text-gray-400 hover:text-blue-400 transition:all cursor-pointer">Курс: {course?.name}</p>
			<p className="text-gray-400 hover:text-blue-400 transition:all  cursor-pointer">Язык: {translatedLanguage(course?.language)}</p>
		</div>
	)
}

export default LessonInfo