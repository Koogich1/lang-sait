"use client"

import React, { useEffect, useState } from 'react'
import CreateNewCourse from '../../components/modal/createNewCourse'
import { courseData } from '@prisma/client'
import getAllTeacherCourses from '../../components/actions/getAllTeacherCourses'
import Link from 'next/link'
import Image from 'next/image'

const Personal = () => {
	const [courses, setCourses] = useState<courseData[]|null>(null)
	 
	const fetchCourses = async() => {
		const coursesData = await getAllTeacherCourses()
		if(coursesData){
			setCourses(coursesData)
		}
	}
		
	useEffect(() => {
		fetchCourses()
	},[])

	return (
		<ul className='grid lg:grid-cols-4 md:grid-cols-3 gap-3 mt-5 sm:grid-cols-2 grid-cols-1 lggap-2 justify-center'>
			<li className='flex items-center justify-center'>
				<CreateNewCourse updateData={fetchCourses}/>
			</li>
			{courses?.map((data, id) => (
				<li className='flex items-center justify-center' key={id}>
					<Link href={`/createCourses/materials/${data.id}`}>
						<div className='w-[175px] h-[275px] rounded-lg overflow-hidden relative flex justify-center hover:scale-105 hover:shadow-lg transition-all duration-300'>
							<Image width={1000} height={1000} src={data.photoUrl} alt="" className='w-full h-4/5 object-cover' />
							<div className='absolute text-sm bottom-0 p-3 bg-white w-full h-1/5'>
								{data.name}
							</div>
						</div>
					 </Link>
				</li>
			))}
		</ul>
	)
}

export default Personal