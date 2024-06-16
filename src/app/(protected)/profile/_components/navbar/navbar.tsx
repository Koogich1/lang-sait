"use client"

import { Button } from "../../../../../components/ui/button"
import { 
	HiOutlineUser, 
	HiOutlineCalendar,
	HiOutlineClipboardList,
	HiOutlinePencil,
	HiOutlineBookOpen,
} from "react-icons/hi";

import { 
	HiCog6Tooth, 
	HiOutlineArrowUturnLeft }
from "react-icons/hi2";

import Link from "next/link";
import { useState } from "react";


export const Navbar = () => {

	return (
		<div className="fixed left-0 bg-white p-7 min-w-[240px] h-full flex flex-col items-start justify-between shadow-lg rounded-r-3xl">
			<h1 className="font-semibold text-2xl pl-3 text-[#B069CA]">LangShool</h1>
			<ul className="h-[60%] flex flex-col justify-between w-[100%]">
				<li>
					<Link
					href='/profile/user'
					>
						<Button 
						variant='shadow' size="lg" className={(`w-full
						 text-[#699BD8] font-semibold`)}>
							Профиль
							<HiOutlineUser 
							className="text-2xl"/> 
						</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/calendar'
					>
					<Button 
					variant='shadow' 
					size="lg" 
					className="w-full text-[#B069CA] font-semibold">
						Календарь
						<HiOutlineCalendar 
						className="text-2xl"
						/>
					</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/achievements'
					>
						<Button variant='shadow' size="lg" className="w-full text-[#C8A907] font-semibold"
						>
							Достижения
							<HiOutlineClipboardList 
							className="text-2xl"
							/>
						</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/materials'
					>
						<Button variant='shadow' size="lg" className="w-full text-[#4DA180] font-semibold">
						Материалы
						<HiOutlineBookOpen 
						className="text-2xl mr-[1px]"
						/>
						</Button>
					</Link>
				</li>
				<li>
				<Link
					href='/profile/tests'
				>
					<Button variant='shadow'  size="lg" className="w-full text-[#F07979] font-semibold">
						Тесты и ДЗ
						<HiOutlinePencil 
						className="text-[1.5rem] mr-[1px]"/> 
					</Button>
				</Link>
				</li>
				<li>
					<Link
					href='/profile/settings'
					>
						<Button variant='shadow' size="lg" className="w-full text-[#4D6785] font-semibold">
							Настройки
							<HiCog6Tooth 
							className="text-2xl mr-[1px]"/>
						</Button>
					</Link>
				</li>
			</ul>
			<div>
			<Link
				href="http://localhost:3000"
			>
				<Button 
					className="flex flex-between w-full font-light justify-between text-white opacity-50 hover:opacity-100" 
					variant="violetSelect" 
					size='lg'
				>
					<p className="p-4">На главную</p>
					<HiOutlineArrowUturnLeft />
				</Button>
			</Link>
			</div>
		</div>
	)
}