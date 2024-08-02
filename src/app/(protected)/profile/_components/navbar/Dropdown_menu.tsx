"use client"

import React, { useEffect, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutButton from '../interface/logout-button';
import TeacherCreate from '../interface/teacherCreate-button';
import { currentUser } from '@/lib/auth';
import Link from 'next/link';
import GetTeacher from '../actions/getTeacher';
import { Teacher } from '../actions/typeUser';
import { User, UserRole } from '@prisma/client';
import GetUser from '../actions/getUser';
import { Button } from '@/components/ui/button';

import { Skeleton } from "@/components/ui/skeleton"

type allInf = {
	user: {
		id: string;
		name: string | null;
		surname: string | null;
		mail: string | null;
		favourites: string[];
		image: string | null;
		role: UserRole;
		teacherUser: {
			id: string;
		};
	};
}

export default function DropDownMenu() {
	const [user, setUser] = useState<Teacher | allInf | null>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			const userdb = await currentUser();
			if (!userdb) return;
			if (userdb.role === "USER") {
				const allInf = await GetTeacher();
				if (allInf) {
					setUser(allInf);
					setLoading(false);
				}
			} else {
				const allInf = await GetUser();
				if (allInf) {
					setUser(allInf);
					setLoading(false);
				}
			}
		};
		fetchUser();
	}, []);

	const [brightness, setBrighness] = useState(0)

	if (loading) {
		return (
			<Skeleton className="h-[4rem] w-[4rem] rounded-full" />
		)
	}

	if (!user) {
		return (
			<Link href={"/auth/login"}>
				<Button 
					variant='violetSelect'
					className='px-8'
				>
					Войти
				</Button>
			</Link>
		)
	}

	if (!user.user.image) {
		return null; // Fixed to return null explicitly
	}

	return (
		<div className='text-base'>
			<DropdownMenu>
				<DropdownMenuTrigger className='border-none rounded-full'>
					{user.user.image.length > 10 ? 
						<div className='relative flex items-center justify-center w-[4rem] h-[4rem] rounded-full'>
							<img
								className="object-cover p-0 m-0 w-[4rem] h-[4rem] rounded-full bg-white"
								src={user.user.image} 
								alt=""
								style={{
									filter: 'brightness(100%)',
									transition: 'filter 0.3s ease',
								}}
								onMouseOver={(e) => { e.currentTarget.style.filter = 'brightness(70%)', setBrighness(100) }}
								onMouseOut={(e) => { e.currentTarget.style.filter = 'brightness(100%)', setBrighness(0) }}
							/>
							<HiOutlineUser className={`absolute text-white text-3xl transition-all opacity-${brightness}`} />
						</div>
					: 
						<div className='w-[4.2rem] h-[4.2rem] bg-white rounded-full flex items-center justify-center text-blue-400'>
							<HiOutlineUser className="text-4xl rounded-full" />
						</div>
					}
				</DropdownMenuTrigger>
				<DropdownMenuContent className='text-gray-600'>
					<DropdownMenuLabel className='text-xl text-gray-400'>
						Меню
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href={"/profile/user"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Профиль</DropdownMenuItem></Link>
					<Link href={"/news"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Новости</DropdownMenuItem></Link>
					<Link href={"/chats/conversations"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Мессенджер</DropdownMenuItem></Link>
					{user.user.role === "TEACHER" ? 
						<Link href={"/learning"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Мои курсы</DropdownMenuItem></Link>
					: ""}
					<Link href={"/teachers"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Преподаватели</DropdownMenuItem></Link>
					<Link href={"/payment"}><DropdownMenuItem className='text-base font-medium hover:bg-gray-200'>Подписка</DropdownMenuItem></Link>
					<DropdownMenuSeparator />
					<div className='text-base font-medium bg-[#835BD2] cursor-pointer hover:bg-[#6a4aaa] p-2 px-5 text-white rounded-lg items-center flex justify-center'><LogoutButton /></div>
					<div className='flex flex-col'>
						Тестовая кнопка &quot;создание учителя&quot;, <br /> в админ панель
						<TeacherCreate />
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}