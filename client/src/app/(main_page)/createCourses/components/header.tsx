import LogoutButton from '@/app/(protected)/profile/_components/interface/logout-button'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image'
import React from 'react'

const Header = () => {
	return (
		<div className="flex justify-between items-center w-full mx-auto text-[#3E236C] mt-3">
			<div className='text-3xl font-medium flex gap-5'>
				<div className='w-10 h-10 ml-[0.9rem] bg-[#835BD2] rounded-full flex items-center justify-center'>
					<Image src="/logo.png" alt='logo' width={100} height={100} className='absolute scale-120'/>
				</div>
				<h1>Acyberg</h1>
			</div>
			<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='w-[4rem] h-[4rem] rounded-full p-2 bg-white hover:bg-gray-100 cursor-pointer shadow-lg hover:shadow-none'>
					<Image src={"/metodist_icon.png"} alt="icon" width={100} height={100} className='rounded-full cursor-pointer'/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className='text-gray-600'>Методист Acyberg</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className='w-full h-6 hover:bg-gray-100'><LogoutButton /></DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
		</div>
	)
}

export default Header