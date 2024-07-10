
import Link from 'next/link'
import React from 'react'
import DropDownMenu from '../(protected)/profile/_components/navbar/Dropdown_menu'

const MainHeader = () => {
	return (
		<div className="flex justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0">
			<div className='flex w-full mt-3 justify-between items-center'>
				<div className='lg:text-3xl text-2xl font-medium lg:font-semibold text-[#61439d]'>
					LangSchool
				</div>
				<ul className='flex gap-4 lg:gap-10 xl:gap-[50px] items-center pt-[3px] font-semibold lg:font-medium text-lg text-gray-400'>
					<Link href={"/"}><li className='hover:text-[#61439d]'>Главная</li></Link>
					<Link href={"/courses"}><li className='hover:text-[#61439d]'>Выбор языка</li></Link>
					<Link href={"/teachers"}><li className='hover:text-[#61439d]'>Преподаватели</li></Link>
					<Link href={"/"}><li className='hover:text-[#61439d]'>Контакты</li></Link>
					<Link href={"/"}><li className='hover:text-[#61439d]'>Новости</li></Link>
				</ul>
				<div>
					<DropDownMenu />
				</div>
			</div>
		</div>
	)
}

export default MainHeader