"use client"

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react'
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

export default function DropDownMenu() {
	const user = useCurrentUser()

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="bg-white outline-none focus-visible:ring-0 rounded-full w-[4rem] h-[4rem] flex items-center justify-center text-[#4D6785] hover:bg-[#B069CA] hover:text-white border-none">
						<HiOutlineUser className="text-3xl" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>
						<div>
							{user?.name}
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Занятия</DropdownMenuItem>
					<DropdownMenuItem>Чат</DropdownMenuItem>
					<DropdownMenuItem>Тесты</DropdownMenuItem>
					<div>
						<div>
							<LogoutButton />
						</div>
						<div>
							<TeacherCreate />
						</div>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
