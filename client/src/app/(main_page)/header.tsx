"use client"

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DropDownMenu from '../(protected)/profile/_components/navbar/Dropdown_menu'
import { currentUser } from '@/lib/auth'
import { User } from '@prisma/client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoClose } from 'react-icons/io5'
import Image from 'next/image'

const MainHeader = () => {
	const [user, setUser] = useState<User | null>(null)
	const [open, setOpen] = useState(false)
	const [activeLink, setActiveLink] = useState("");

	useEffect(() => {
		const catchUser = async () => {
			const userdata = await currentUser();
			console.log(userdata);
			if (!userdata) {
				return;
			}
			setUser(userdata);
		}
		catchUser();
	}, []);

	useEffect(() => {
		setActiveLink(window.location.pathname);

		const handleLocationChange = () => {
			setActiveLink(window.location.pathname);
		};

		window.addEventListener("popstate", handleLocationChange);

		return () => window.removeEventListener("popstate", handleLocationChange);
	}, []);

	const handleLinkClick = (href: any) => {
		setActiveLink(href); 
	};

	return (
		<div className="flex justify-around items-center w-full max-w-[1440px] px-[5%] mx-auto text-[#3E236C] flex-col m-0">
			<div className='w-full mt-3 justify-between items-center hidden lg:flex'>
				<div className='flex items-center'>
					<Image src="/logo.png" alt="logo" width={200} height={200} className='w-20 h-20' />
					<div className='lg:text-3xl text-2xl font-medium lg:font-semibold text-[#61439d]'>
						Acyberg
					</div>
				</div>
				<ul className='flex gap-4 lg:gap-4 xl:gap-[50px] items-center pt-[3px] font-semibold lg:font-medium text-base text-gray-400'>
					<Link 
						href={"/"}
						onClick={() => {
							handleLinkClick("/");
						}}
					>
						<li className={`p-1 px-3 rounded-md shadow-md ${activeLink === '/' ? "bg-[#835BD2] text-white" : "bg-white text-[#835BD2]"} hover:bg-[#835BD2] hover:text-white transition-all`}>
							Главная
						</li>
					</Link>
					<Link 
						href={"/courses"}
						onClick={() => {
							handleLinkClick("/courses");
						}}
					>
						<li className={`p-1 px-3 rounded-md shadow-md ${activeLink === '/courses' ? "bg-[#835BD2] text-white" : "bg-white text-[#835BD2]"} hover:bg-[#835BD2] hover:text-white transition-all`}>
							Выбор языка
						</li>
					</Link>
					<Link 
						href={"/teachers"}
						onClick={() => {
							handleLinkClick("/teachers");
						}}
					>
						<li className={`p-1 px-3 rounded-md shadow-md ${activeLink === '/teachers' ? "bg-[#835BD2] text-white" : "bg-white text-[#835BD2]"} hover:bg-[#835BD2] hover:text-white transition-all`}>
							Преподаватели
						</li>
					</Link>
					<Link 
						href={"/contacts"}
						onClick={() => {
							handleLinkClick("/contacts");
						}}
					>
						<li className={`p-1 px-3 rounded-md shadow-md ${activeLink === '/contacts' ? "bg-[#835BD2] text-white" : "bg-white text-[#835BD2]"} hover:bg-[#835BD2] hover:text-white transition-all`}>
							Контакты
						</li>
					</Link>
					<Link 
						href={"/news"}
						onClick={() => {
							handleLinkClick("/news");
						}}
					>
						<li className={`p-1 px-3 rounded-md shadow-md ${activeLink === '/news' ? "bg-[#835BD2] text-white" : "bg-white text-[#835BD2]"} hover:bg-[#835BD2] hover:text-white transition-all`}>
							Новости
						</li>
					</Link>
				</ul>
				<div className='flex items-center justify-center'>
					{user && user.role === "MODERATOR" ? 
						<a href="/createCourses" className='text-base font-medium btn-style'>
							Создать курсы
						</a>
					: 
						user && <DropDownMenu user={user}/>
					}
					{!user && 
						<a href="/auth/login" className='text-base font-medium px-4 py-2 mt-1 bg-[#835BD2] text-white rounded-md shadow-sm'>
							Войти
						</a>}
				</div>
			</div>
			<div className='w-full mt-3 justify-between items-center flex lg:hidden'>
				<div className='flex items-center'>
					<Image width={1000} height={1000} src="/logo.png" alt="" className='w-20 h-20' />
					<div className='lg:text-3xl text-2xl font-semibold lg:font-semibold text-[#61439d]'>
						Acyberg
					</div>
				</div>
				<Sheet open={open} onOpenChange={setOpen}>
					<SheetTrigger className='w-12 h-12 z-50'>
						{!user ? 
							<a href="/auth/login" className='text-base font-medium px-4 py-2 mt-1 bg-[#835BD2] text-white rounded-md shadow-sm'>
								Войти
							</a>
							:
							<div>
								<Image width={1000} height={1000} className='w-12 h-12 rounded-full' src={user.image ?? ''} alt="" />
							</div>
						}
						
					</SheetTrigger>
					<SheetContent className='md:w-1/3 w-[200px]'>
						<SheetTitle className='text-xl font-semibold text-gray-500 w-full flex justify-between'>
							<div 
								className='px-[0.125rem] py-[0.125rem] rounded-lg cursor-pointer border-2 bg-red-300 border-red-500 text-red-500 hover:text-white hover:bg-red-500 transition-all'
								onClick={() => {
									setOpen(false)
								}}
							>
								<IoClose />
							</div>
							<h1>
								Меню
							</h1>
						</SheetTitle>
						<SheetDescription className='mt-5'>
							<ul className='flex flex-col lg:gap-10 xl:gap-[50px] items-end pt-[3px] font-semibold lg:font-medium text-lg text-gray-400'>
								<Link href={"/profile/user"} className='border-y border-gray-100 w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Профиль</li>
								</Link>
								<Link href={"/"} className='border-b border-gray-100 w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Главная</li>
								</Link>
								<Link href={"/courses"} className='w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Выбор языка</li>
								</Link>
								<Link href={"/teachers"} className='border-t border-gray-100 w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Преподаватели</li>
								</Link>
								<Link href={"/"} className='border-t border-gray-100 w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Контакты</li>
								</Link>
								<Link href={"/"} className='border-y border-gray-100 w-full h-10 flex items-center justify-end'>
									<li className='hover:text-[#61439d]'>Новости</li>
								</Link>
							</ul>
						</SheetDescription>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	)
}

export default MainHeader;