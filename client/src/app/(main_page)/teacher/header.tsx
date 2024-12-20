"use client"

import React, { useEffect, useState } from 'react'
import DropDownMenu from '@/app/(protected)/profile/_components/navbar/Dropdown_menu'
import { User } from '@prisma/client'
import { currentUser } from '@/lib/auth'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'

const HeaderTeacher = () => {
	const[user, setUser] = useState<User | null>(null)
	const[loading, setLoading] = useState(true)

	const fetchUser = async() => {
		setLoading(true)
		const data = await currentUser()
		if(data){
			setUser(data)
		}
		setLoading(false)
	}

	useEffect(() => {
		fetchUser()
	},[])

	if(loading){
		return(
			<div>
				<div className="flex justify-between items-center w-full mx-auto max-w-[1440px] px-[5%] text-[#3E236C] mt-3">
				<div className='flex items-center'>
					<Image width={1000} height={1000} src="/logo.png" alt="" className='w-20 h-20' />
					<div className='lg:text-3xl text-2xl font-medium lg:font-semibold text-[#61439d]'>
						Acyberg
					</div>
				</div>
				<Skeleton className='w-[4rem] h-[4rem] rounded-full'/>
			</div>
			</div>
		)
	}
	
	return (
		<div className="flex justify-between items-center w-full mx-auto max-w-[1440px] px-[5%] text-[#3E236C] mt-3">
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

export default HeaderTeacher