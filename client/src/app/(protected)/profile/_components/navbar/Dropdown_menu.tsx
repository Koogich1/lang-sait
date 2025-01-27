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
import Image from 'next/image';
import { IoMenu } from 'react-icons/io5';
import { FaDollarSign, FaMessage, FaNewspaper, FaSubscript, FaUser, FaUsers } from 'react-icons/fa6';
import { FaMoneyCheckAlt } from 'react-icons/fa';
import { LucideCircleDollarSign } from 'lucide-react';

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

type Props = {
	user: User | null
}

export default function DropDownMenu({user}: Props) {
	const [brightness, setBrighness] = useState(0)

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

	if (!user.image) {
		return null; // Fixed to return null explicitly
	}

	return (
		<div className='text-base'>
			<DropdownMenu>
				<DropdownMenuTrigger className='border-none rounded-full'>
					{user.image.length > 0 ? 
						<div className='relative flex items-center justify-center w-[4rem] h-[4rem] rounded-full'>
							<Image
								width={1000}
								height={1000}
								className="object-cover p-0 m-0 w-[4rem] h-[4rem] rounded-full bg-white"
								src={user.image} 
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
				<DropdownMenuContent className='text-gray-600 right-0 mr-6 sm:mr-10 p-2 px-2 w-[260px]'>
					<DropdownMenuLabel className='text-xl text-center w-full text-gray-600 flex items-center justify-center gap-3'>
						<IoMenu className='scale-125 text-white bg-gray-600 rounded-sm p-[0.1rem]'/>
						<span>Меню</span>
					</DropdownMenuLabel>
					<div className='w-full h-[1px] bg-gray-200'/>
					<div className='flex flex-col mt-2 text-gray-400'>
						<Link href={"/profile/user"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 flex gap-2 items-center justify-center'>
								<FaUser />
								Профиль
							</DropdownMenuItem>
						</Link>
						<Link href={"/news"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 flex gap-2 items-center justify-center'>
								<FaNewspaper />
								Новости
							</DropdownMenuItem>
						</Link>
						<Link href={"/chats/conversations"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 flex gap-2 items-center justify-center'>
								<FaMessage />
								Мессенджер
							</DropdownMenuItem>
						</Link>
						{user.role === "TEACHER" ? 
						<Link href={"/learning"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 flex gap-2 items-center justify-center'>
								Мои курсы
							</DropdownMenuItem>
						</Link>
						: ""}
						<Link href={"/teachers"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 gap-2 items-center justify-center'>
								<FaUsers />
								Преподаватели
							</DropdownMenuItem>
						</Link>
						<Link href={"/profile/buyLessons"}>
							<DropdownMenuItem className='text-base font-medium hover:bg-blue-50 hover:text-blue-400 flex gap-2 items-center justify-center'>
								<FaDollarSign />
								Подписка
							</DropdownMenuItem>
						</Link>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}