"use client"

import { customCourse } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import fetchCustomCourse from "../../actions/lesson/fetchCustomCourse"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
	id: string;
	position: number
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const year = date.getFullYear();

	return `${day}:${month}:${year}`; // Возвращает формат DD:MM:YYYY
};

const LittleCourseInfo = ({id, position}: Props) => {

	const [customCourse, setCustomCourse] = useState<customCourse | null>(null)

	const fetchCourses = useCallback(async() => {
		const info = await fetchCustomCourse(id)
		if(info){
			setCustomCourse(info)
		}
	}, [id])

	useEffect(() => {
		fetchCourses()
	}, [id, fetchCourses])

	if(!customCourse){
		return(
			<Skeleton className="w-full h-[3.2rem] rounded-lg"/>
		)
	}

	return (
		<div className="h-[3.2rem] py-1 w-full relative border-blue-200 rounded-lg justify-between shadow-sm bg-white flex items-center px-2">
			<div className="flex gap-2 items-center">
				<p className="text-blue-400">{customCourse.name}</p>
			</div>
			<div className="flex flex-col items-end">
				<p className="text-sm text-gray-400">Добавлен</p>
				<div className="py-[0.075rem] px-2 bg-blue-400 rounded-lg text-white">{formatDate(customCourse.createdAt.toJSON())}</div>
			</div>
		</div>
	)
}

export default LittleCourseInfo