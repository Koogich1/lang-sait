"use client"

import React, { useEffect, useState } from 'react'
import CreateNewCourse from '../../components/modal/createNewCourse'
import { courseData } from '@prisma/client'
import getAllTeacherCourses from '../../components/actions/getAllTeacherCourses'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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
		<ul className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lggap-2 justify-center'>
			<li className='flex items-center justify-center'>
				<CreateNewCourse updateData={fetchCourses}/>
			</li>
			{courses?.map((data, id) => (
				<li className='flex items-center justify-center' key={id}>
					<Link href={`/createCourses/materials/${data.id}`}>
						<div className='w-[175px] h-[270px] rounded-xl overflow-hidden relative border flex items-center justify-center'>
							<img src={data.photoUrl} alt="" className='w-full h-full object-cover' />
							<div className='absolute bottom-0 p-3 bg-white w-full'>
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