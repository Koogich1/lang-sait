"use client"

import React, { useEffect, useState } from 'react'
import DropDownMenu from '../../profile/_components/navbar/Dropdown_menu'
import { User } from '@prisma/client'
import { currentUser } from '@/lib/auth'
import Image from 'next/image'

const Header = () => {
	const[user, setUser] = useState<User>()

	const fetchUser = async() => {
		const data = await currentUser()
		if(data){
			setUser(data)
		}
	}

	useEffect(() => {
		fetchUser()
	},[])

	if(!user) return
	
	return (
		<div className="flex justify-between items-center w-full mx-auto text-[#3E236C] mt-3">
			<div className='flex items-center'>
				<Image width={1000} height={1000} src="/logo.png" alt="" className='w-20 h-20' />
				<div className='lg:text-3xl text-2xl font-medium lg:font-semibold text-[#61439d]'>
					Acyberg
				</div>
			</div>
			<DropDownMenu user={user} />
		</div>
	)
}

export default Header