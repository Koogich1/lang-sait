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
import { useEffect, useState } from "react";


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

	return (
		<div className="fixed left-0 bg-white p-7 min-w-[240px] h-full flex flex-col items-start justify-between shadow-lg rounded-r-3xl">
			<h1 className="font-semibold text-2xl pl-3 text-[#B069CA]">LangShool</h1>
			<ul className="h-[60%] flex flex-col justify-between w-[100%]">
				<li>
					<Link
					href='/profile/user'
					onClick={() => handleLinkClick("/profile/user")}
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
					onClick={() => handleLinkClick("/profile/calendar")}
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
					href='/profile/achievements'
					onClick={() => handleLinkClick("/profile/achievements ")}
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
					href='/profile/materials'
					onClick={() => handleLinkClick("/profile/materials")}
					>
						<Button 
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#4DA180] font-semibold ${activeLink=== "/profile/materials" ? "bg-gray-100" : ""}`}
						>
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
					onClick={() => handleLinkClick("/profile/tests")}
				>
					<Button 
					variant='shadow'  
					size="lg" 
					className={`w-full text-[#F07979] font-semibold ${activeLink=== "/profile/tests" ? "bg-gray-100" : ""}`}
					>
						Тесты и ДЗ
						<HiOutlinePencil 
						className="text-[1.5rem] mr-[1px]"/> 
					</Button>
				</Link>
				</li>
				<li>
					<Link
					href='/profile/settings'
					onClick={() => handleLinkClick("/profile/settings")}
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
	)
}