"use client"

import React, { useEffect, useState } from 'react'
import CreateNewCourse from '../../components/modal/createNewCourse'
import { courseData } from '@prisma/client'
import getAllTeacherCourses from '../../components/actions/getAllTeacherCourses'
import Link from 'next/link'
import Image from 'next/image'

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const year = date.getFullYear();

	return `${day}:${month}:${year}`; // Возвращает формат DD:MM:YYYY
};

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
		<div>
			<div className='my-3 mt-5 text-gray-400'>
				<div className='w-full mt-5 flex items-center justify-between'>
          <p className='text-nowrap text-base font-semibold text-gray-400 flex gap-2'>
						<span className='text-nowrap'>Количество уроков</span>
						<span>{courses && courses.length}</span>
          </p>
					<div className='h-1 mt-[0.12rem] border-t-[3px] border-gray-200 border-dotted w-full ml-2'></div>
				</div>
			</div>
			<ul className='grid lg:grid-cols-6 md:grid-cols-4 gap-3 mt-5 sm:grid-cols-2 grid-cols-1 lggap-2 justify-center'>
				<li className='flex items-center justify-center'>
					<CreateNewCourse updateData={fetchCourses}/>
				</li>
				{courses?.map((data, id) => (
					<li className='flex items-center justify-center' key={id}>
						<Link href={`/createCourses/materials/${data.id}`}>
							<div className='w-[175px] h-[275px] rounded-lg shadow-md overflow-hidden relative flex flex-col justify-center hover:scale-105 hover:shadow-lg transition-all duration-300'>
								<Image width={1000} height={1000} src={data.photoUrl} alt="" className='w-full h-[85%] object-cover' />
								<div className='w-full flex items-center justify-center text-center bg-white h-[15%] relative'>
									<p className='text-[#835BD2] font-medium text-base mb-1'>
										{data.name}
									</p>
									<p className='text-xs absolute font-semibold top-[-0.5rem] px-1 py-[0.02rem] rounded-sm bg-blue-400 right-[0.2rem] text-white'>
										{formatDate(data.createdAt.toJSON())}
									</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Personal