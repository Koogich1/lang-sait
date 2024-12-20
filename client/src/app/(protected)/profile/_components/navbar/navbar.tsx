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
	HiBars3,
	HiCog6Tooth, 
	HiOutlineArrowUturnLeft, 
	HiOutlineXMark}
from "react-icons/hi2";

import Link from "next/link";
import { useEffect, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export const Navbar = () => {
	const [activeLink, setActiveLink] = useState("");

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

	const [open, setOpen] = useState(false)
	const handleClickBurger = () => {
		setOpen(true)
    gsap.to("#section", {
      opacity: 1,
      left: 0,
      duration: 0.2
    });
  };

	const handleCloseBurger = () => {
		setOpen(false)
		gsap.to("#section", {
      opacity: 0,
      left: -300,
      duration: 0.2
    });
	}

	return (
		<>
		<div 
			className={"absolute lg:hidden bg-[#835BD2] p-1 rounded-lg ml-5 md:ml-10 xl:ml-15 mt-8 cursor-pointer hover:bg-[#7853c0] shadow-lg"}
			onClick={() => {
				handleClickBurger()
			}}
		>
			<HiBars3 className="text-4xl text-white"/>
		</div>
		<div className={`w-[100vh] h-[100vh] absolute bg-black opacity-30 z-40 ${open ? "" : "hidden"} transition-all`} 
			onClick={handleCloseBurger}
		/>
		<div 
		id={"section"}
		className={`lg:hidden opacity-0 lg:opacity-100 absolute bg-white p-7 min-w-[240px] h-full flex flex-col items-start justify-between shadow-lg rounded-r-3xl z-[100] left-[-300px]`}>
			<div className="flex justify-between w-full items-center">
				<h1 className="font-semibold text-2xl pl-3 text-[#B069CA]">
					Acyberg
				</h1>
				<div 
					className="lg:hidden flex items-center justify-center bg-red-400 p-[0.125rem] rounded-lg hover:bg-red-500 transition-all cursor-pointer"
					onClick={handleCloseBurger}
				>
					<HiOutlineXMark className="text-2xl text-white"/>
				</div>
			</div>
			<ul className="h-[60%] flex flex-col justify-between w-[100%]">
				<li>
					<Link
					href='/profile/user'
					onClick={() => 
						{
							handleLinkClick("/profile/user")
							handleCloseBurger()
						}
					}
					>
						<Button 
						variant='shadow' size="lg" className={(`w-full
						 text-[#699BD8] font-semibold ${activeLink=== "/profile/user" ? "bg-gray-100" : ""}`)}>
							Профиль
							<HiOutlineUser 
							className="text-2xl"/> 
						</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/calendar'
					onClick={() => {
						handleLinkClick("/profile/calendar")
						handleCloseBurger()
					}}
					>
					<Button 
					variant='shadow' 
					size="lg" 
					className={`w-full text-[#B069CA] font-semibold ${activeLink=== "/profile/calendar" ? "bg-gray-100" : ""}`}>
						Календарь
						<HiOutlineCalendar 
						className="text-2xl"
						/>
					</Button>
					</Link>
				</li>
				<li>
					<Link
						href='/profile/learning'
						onClick={() => {
							handleLinkClick("/profile/learning")
							handleCloseBurger()
						}}
					>
					<Button 
					variant='shadow' 
					size="lg" 
					className={`w-full text-[#545ba8] font-semibold ${activeLink=== "/profile/learning" ? "bg-gray-100" : ""}`}>
						Обучение
						<HiOutlineCalendar 
						className="text-2xl"
						/>
					</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/achievements'
					onClick={() => {
						handleLinkClick("/profile/achievements")
						handleCloseBurger()
					}}
					>
						<Button 
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#C8A907] font-semibold ${activeLink=== "/profile/achievements" ? "bg-gray-100" : ""}`}
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
					href='/profile/settings'
					onClick={() => {
						handleLinkClick("/profile/settings")
						handleCloseBurger()
					}}
					>
						<Button 
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#4D6785] font-semibold ${activeLink=== "/profile/settings" ? "bg-gray-100" : ""}`}
						>
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
		<div 
		className={`hidden lg:fixed opacity-100 left-0 absolute bg-white p-7 min-w-[240px] h-full lg:flex flex-col items-start justify-between shadow-lg rounded-r-3xl z-50`}>
			<div className="flex justify-between w-full items-center">
				<Image width={1000} height={1000} src="/logo.png" alt="" className='w-20 h-20' />
				<div className='lg:text-3xl text-2xl font-medium lg:font-semibold text-[#61439d]'>
					Acyberg
				</div>
				<div 
					className="lg:hidden flex items-center justify-center bg-red-400 p-1 rounded-lg"
					onClick={handleCloseBurger}
				>
					<HiOutlineXMark className="text-xl"/>
				</div>
			</div>
			<ul className="h-[60%] flex flex-col justify-between w-[100%]">
				<li>
					<Link
					href='/profile/user'
					onClick={() => 
						{
							handleLinkClick("/profile/user")
							handleCloseBurger()
						}
					}
					>
						<Button 
						variant='shadow' size="lg" className={(`w-full
						 text-[#699BD8] font-semibold ${activeLink=== "/profile/user" ? "bg-gray-100" : ""}`)}>
							Профиль
							<HiOutlineUser 
							className="text-2xl"/> 
						</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/calendar'
					onClick={() => {
						handleLinkClick("/profile/calendar")
						handleCloseBurger()
					}}
					>
					<Button 
					variant='shadow' 
					size="lg" 
					className={`w-full text-[#B069CA] font-semibold ${activeLink=== "/profile/calendar" ? "bg-gray-100" : ""}`}>
						Календарь
						<HiOutlineCalendar 
						className="text-2xl"
						/>
					</Button>
					</Link>
				</li>
				<li>
					<Link
						href='/profile/learning'
						onClick={() => {
							handleLinkClick("/profile/learning")
							handleCloseBurger()
						}}
					>
					<Button 
					variant='shadow' 
					size="lg" 
					className={`w-full text-[#545ba8] font-semibold ${activeLink=== "/profile/learning" ? "bg-gray-100" : ""}`}>
						Обучение
						<HiOutlineCalendar 
						className="text-2xl"
						/>
					</Button>
					</Link>
				</li>
				<li>
					<Link
					href='/profile/achievements'
					onClick={() => {
						handleLinkClick("/profile/achievements")
						handleCloseBurger()
					}}
					>
						<Button 
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#C8A907] font-semibold ${activeLink=== "/profile/achievements" ? "bg-gray-100" : ""}`}
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
					href='/profile/settings'
					onClick={() => {
						handleLinkClick("/profile/settings")
						handleCloseBurger()
					}}
					>
						<Button 
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#4D6785] font-semibold ${activeLink=== "/profile/settings" ? "bg-gray-100" : ""}`}
						>
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
		</>
	)
}