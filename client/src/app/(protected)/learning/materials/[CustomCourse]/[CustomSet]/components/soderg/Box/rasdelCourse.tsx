"use client"
import findCourseInRasdel from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findCourseInRasdel";
import { courseData } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

const RasdelCourse = ({courseId}: {courseId: string}) => {
	const [course, setCourse] = useState<courseData>()

	const fetchCourses = useCallback(async() => {
		const fetchedInf = await findCourseInRasdel(courseId)
		if(fetchedInf){
			setCourse(fetchedInf)
		}
	}, [courseId])

	useEffect(() => {
		fetchCourses()
	}, [fetchCourses])

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
		<>
		<div className="text-sm text-gray-400 p-0 m-0 hover:text-blue-400 cursor-pointer transition-all border-blue-400">Курс: {course?.name}</div>
		<div className="text-sm text-gray-400 p-0 m-0 hover:text-blue-400 cursor-pointer transition-all border-blue-400">Язык: {translatedLanguage(course?.language)}</div>
		</>
	)
}

export default RasdelCourse