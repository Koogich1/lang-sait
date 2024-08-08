import React, { useEffect, useState } from 'react'
import FilterMaterials from '../../components/modal/filterMaterials'
import MaterialsBox from './materialsBox'
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RingLoader } from 'react-spinners';
import { courseData } from '@prisma/client';
import getAllCourses from '../../components/actions/getAllCourses';
import Link from 'next/link';

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
		<ul className='grid lg:grid-cols-4 md:grid-cols-3 gap-3 mt-5 sm:grid-cols-2 grid-cols-1 lggap-2 justify-center'>
			{courses?.map((data, id) => (
				<li className='flex items-center justify-center' key={id}>
					<Link href={`/createCourses/materials/${data.id}`}>
						<div className='w-[175px] bg-red-50 h-[270px] rounded-xl overflow-hidden relative border flex items-center justify-center'>
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

export default Katalog