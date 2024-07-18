"use client"

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
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
import { HiOutlineCamera } from 'react-icons/hi2';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import userImg from '@/actions/getImageUser';
import Link from 'next/link';

type role = "ADMIN" | "USER" | "TEACHER";

type User = {
	id: string;
	name: string | null;
	surname: string | null;
	email: string | null;
	emailVerified: Date | null;
	favourites: string[];
	image: string | null;
	password: string | null;
	role: role;
	isTwoFactorEnabled: boolean;
	teacherId: string | null;
	favouritesTeachers: string;
}

export default function DropDownMenu() {
	const [user, setUser] = useState<User | null>(null);
	const [cacheBuster, setCacheBuster] = useState(Date.now())
	const [image, setImage] = useState("");

  useEffect(() => {
		const fetchUser = async () => {
			const img = await userImg()
			if(img){
				setImage(img)
			}
		};
		fetchUser();
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const data = await currentUser();
			if (data) {
				setUser(data);
			}
		};
		fetchData();
	}, []);

	const [brightness, setBrighness] = useState(0)

	if(!user){
		return
	}

	return (
		<div className='text-base'>
			<DropdownMenu>
				<DropdownMenuTrigger className='border-none rounded-full'>
					{image.length > 10 ? 
					<div className='relative flex items-center justify-center w-[4rem] h-[4rem] rounded-full'>
						<img
						className="object-cover p-0 m-0 w-[4rem] h-[4rem] rounded-full"
						src={image} 
						alt=""
						style={{
							filter: 'brightness(100%)',
							transition: 'filter 0.3s ease',
						}}
						onMouseOver={(e) => { e.currentTarget.style.filter = 'brightness(70%)', setBrighness(100)}}
						onMouseOut={(e) => { e.currentTarget.style.filter = 'brightness(100%)', setBrighness(0)}}
						/>
						<HiOutlineUser className={`absolute text-white text-3xl transition-all opacity-${brightness}`}/>
					</div>
					: 
					<div className='w-[4.2rem] h-[4.2rem] bg-white rounded-full flex items-center justify-center text-blue-400'>
						<HiOutlineUser className="text-4xl rounded-full" />
					</div>
					}
				</DropdownMenuTrigger>
				<DropdownMenuContent className='text-gray-600'>
					<DropdownMenuLabel className='text-lg'>
						<div>
							{user?.email}
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<Link href={"/profile/user"}><DropdownMenuItem className='text-base font-medium'>Профиль</DropdownMenuItem></Link>
					<Link href={"/news"}><DropdownMenuItem className='text-base font-medium'>Новости</DropdownMenuItem></Link>
					<Link href={"/chats/conversations"}><DropdownMenuItem className='text-base font-medium'>Мессенджер</DropdownMenuItem></Link>
					{user.role === "TEACHER" ? 
					<Link href={"/learning"}><DropdownMenuItem className='text-base font-medium'>Мои курсы</DropdownMenuItem></Link>
					: ""}
					<Link href={"/teachers"}><DropdownMenuItem className='text-base font-medium'>Преподаватели</DropdownMenuItem></Link>
					<Link href={"/payment"}><DropdownMenuItem className='text-base font-medium'>Подписка</DropdownMenuItem></Link>
					<DropdownMenuSeparator />
					<div className='text-base font-medium bg-[#835BD2] p-2 px-5 text-white rounded-lg items-center flex justify-center'><LogoutButton /></div>
					<div className='flex flex-col'>
						Тестовая кнопка <br />  "создание учителя", <br /> в админ панель
							<TeacherCreate />
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
