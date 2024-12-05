"use client"

import { customCourse } from "@prisma/client"
import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import fetchCustomCourse from "../../actions/lesson/fetchCustomCourse"
import { Skeleton } from "@/components/ui/skeleton"

type Props = {
	data: string
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const year = date.getFullYear();

	return `${day}:${month}:${year}`; // Возвращает формат DD:MM:YYYY
};

const MaterialInfo = ({data}: Props) => {
	const [customCourse, setCustomCourse] = useState<customCourse | null>(null)

	const fetchCourses = useCallback(async() => {
		const info = await fetchCustomCourse(data)
		if(info){
			setCustomCourse(info)
		}
	}, [data])

	useEffect(() => {
		fetchCourses()
	}, [data, fetchCourses])

	if(!customCourse){
		return(
			<Skeleton className="w-[175px] h-[245px] rounded-lg"/>
		)
	}

	return (
				<div className='flex cursor-default items-center justify-center'>
					<div className='w-[175px] h-[245px] rounded-lg overflow-hidden relative flex justify-center hover:scale-[102%] hover:shadow-md transition-all duration-300 cursor-pointer'>
						{customCourse.imageSrc === "" ? (
							<div className='w-full h-4/5 bg-[#835BD2] flex items-center justify-center rounded-lg'>
								<h1 className='text-5xl text-white'>{customCourse.name.charAt(0).toUpperCase()}</h1>
							</div>
							) : (
							<Image src={customCourse.imageSrc ? customCourse.imageSrc : ""} alt={customCourse.name} width={1000} height={1000} className='w-full h-4/5 object-cover' />
							)}
							<div className='absolute text-sm bottom-0 p-3 rounded-xl bg-white w-full h-1/5 flex items-center justify-center text-gray-400'>
							<p className='absolute text-xs top-1 right-1 font-light text-gray-300'>{formatDate(customCourse.createdAt.toJSON())}</p>
								{customCourse.name}
							</div>
				</div>
			</div>
	)
}

export default MaterialInfo