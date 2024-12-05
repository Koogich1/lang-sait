import React, { useEffect, useState } from 'react'
import FilterMaterials from '../../components/modal/filterMaterials'
import MaterialsBox from './materialsBox'
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RingLoader } from 'react-spinners';
import { courseData } from '@prisma/client';
import getAllCourses from '../../components/actions/getAllCourses';
import Link from 'next/link';
import Image from 'next/image';

const Katalog = () => {
	const[courses, setCourses] = useState<courseData[]>([])
	
	const fetchCourses = async() => {
		const data = await getAllCourses()
		if(data){
			setCourses(data)
		}
	}

	useEffect(() => {
		fetchCourses()
	}, [])

	return (
		<ul className='grid lg:grid-cols-6 md:grid-cols-3 gap-5 mt-5 sm:grid-cols-2 grid-cols-1 lggap-2 justify-center'>
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

export default Katalog