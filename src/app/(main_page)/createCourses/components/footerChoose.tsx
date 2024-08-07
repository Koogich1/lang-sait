'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { HiOutlineBookOpen, HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { PiStudent } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";

const FooterChoose = () => {
	const [ page, setPage ] = useState("")

	const handleChangePage = (page:string) => {
		setPage(page)
	}
	return (
		<div
			className='fixed bottom-0 h-[63px] bg-white rounded-lg shadow-lg py-2 px-4 w-[90%] max-w-[1268px] border border-gray-200
			'
		>
			<ul className='w-full flex justify-between text-gray-400'>
			<li className={`flex flex-col items-center justify-center hover:text-[#835BD2] cursor-pointer relative
					text-${page === "/learning/help" ? "[#835BD2]": ""}
				`}
				onClick={() => setPage('/createCourses/help')}
				>
					<HiOutlineQuestionMarkCircle className='text-2xl'/>
					<Link href={"/createCourses/help"} className='w-full h-full absolute'></Link>
					<p className='text-sm'>Помощь</p>
				</li>
				<li className={`flex flex-col items-center justify-center hover:text-[#835BD2] cursor-pointer relative
					text-${page === "/materials" ? "[#835BD2]": ""}
				`}
				onClick={() => setPage('/createCourses/help')}
				>
					<HiOutlineBookOpen className='text-2xl' />
					<Link href={"/createCourses/materials"} className='w-full h-full absolute'></Link>
					<p className='text-sm'>Материалы</p>
				</li>
				<li className={`flex flex-col items-center justify-center hover:text-[#835BD2] cursor-pointer relative
					text-${page === "/learning" ? "[#835BD2]": ""}
				`}
				onClick={() => setPage('/createCourses/watching')}
				>
					<PiStudent className='text-2xl' />
					<p className='text-sm'>Предпросмотр</p>
					<Link href={"/createCourses/watching"} className='w-full h-full absolute'></Link>
				</li>
			</ul>
		</div>
	)
}

export default FooterChoose