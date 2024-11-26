"use client"

import { Button } from "@/components/ui/button";
import { HiOutlineBell } from "react-icons/hi";
import DropDownMenu from "./navbar/Dropdown_menu";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import getAllSubscription from "@/actions/getAllSubscription";
import HeaderTeacherBox from "./navbar/headerTeacherBox";
import { currentUser } from "@/lib/auth";
import { Notification, User, UserSubscriptions } from "@prisma/client";
import findNotification from "@/actions/findNotification";

type Props = {
	header: string,
	user: User | null
}

const Header = ({header, user}: Props) => {
	const	[userSubs, setUserSubs] = useState<UserSubscriptions[] | null>([])
	const [notifications, setNotifications] = useState<Notification[] | null>(null)

	if(!user){
		return(
			<div>
				Нет инфы
			</div>
		)
	}

 return(
	<div>
		<div className="flex justify-between items-center pl-[50px] lg:pl-0">
			<h1 className="text-3xl font-semibold text-[#4D6785]">
				{header}
			</h1>
			<div className="flex items-center gap-3">
				{user.role === "USER" ? 
				<DropdownMenu >
				<DropdownMenuTrigger>
					<div className="bg-[#835BD2] text-sm text-white font-semibold p-[0.65rem] px-5 rounded-sm scale-105 hover:bg-[#6d4caf] transition-all">
						Мои уроки</div>
					</DropdownMenuTrigger>
				<DropdownMenuContent className="ml-[-25px]">
					<DropdownMenuLabel className="text-lg text-gray-600">Мои преподаватели</DropdownMenuLabel>
					<DropdownMenuSeparator />
						
					<DropdownMenuSeparator />
					<DropdownMenuItem className="w-full p-1 m-0">
						<Link href={'/profile/lessonsBuy'} className="w-full"><Button className="w-full text-sm" variant='violetSelect'>В магазин</Button></Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			:
			""
			}
					<DropdownMenu >
						<DropdownMenuTrigger 
						className="rounded-full" 
						asChild 
						>
							<div className={`rounded-full w-[3.5rem] h-[3.5rem] flex items-center justify-center bg-white`}
							>
								<HiOutlineBell className="text-[#4D6785] text-3xl"/>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="ml-[-125px] min-w-[260px] max-w-[300px]">
							<DropdownMenuLabel className="text-lg text-gray-600">Уведомления</DropdownMenuLabel>
							<DropdownMenuSeparator />
								{notifications?.length === 0 ? 
								"" 
								:
								notifications?.map((data, id) => (
									<div className="flex flex-col text-md border border-gray-100 p-2 rounded-lg shadow-lg text-gray-600" key={id}>
										<h1 className="font-semibold">{data.head}</h1>
										<span>{data.message}</span>
									</div>
								))
								}
							<DropdownMenuSeparator />
							<DropdownMenuItem className="w-full p-1 m-0">
								<Link href={'/profile/lessonsBuy'} className="w-full"><Button className="w-full text-sm" variant='violetSelect'>Очистить все</Button></Link>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				<DropDownMenu user={user}/>
			</div>
		</div>
		<div className="h-[1px] w-full bg-[#BFBEC2] mt-5 rounded-full" />
	</div>
 )
}

export default Header