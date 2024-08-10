"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DropDownMenu from '../(protected)/profile/_components/navbar/Dropdown_menu'
import { currentUser } from '@/lib/auth'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'

const MainHeader = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const catchUser = async() => {
			const userdata = await currentUser()
			console.log(userdata)
			if(!userdata){
				return
			}
			setUser(userdata)
		}
		catchUser()
	},[])

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
					{user && user.role === "MODERATOR" ? 
					<Link href={"/createCourses"}><Button variant='violetSelect' className='text-base font-medium'>Создать курсы</Button></Link>
					: 
					<DropDownMenu />}
					{!user && <Link href={"/auth/login"}><Button variant={"violetSelect"}>Войти</Button></Link>}
				</div>
			</div>
		</div>
	)
}

export default MainHeader