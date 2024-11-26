"use client"

import { User } from '@prisma/client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import findUsers from '../actions/findAllUsers'
import { useRouter } from 'next/navigation'
import { Skeleton } from "@/components/ui/skeleton"
import { useMessageStore } from '@/lib/useStore'

const LeftPart = () => {
	const[users, setUsers] = useState<User[] | null>(null)
	const router = useRouter()

	useEffect(() => {
		const fetchUsers = async() => {
			const data = await findUsers()
			if(data){
				setUsers(data)
			}
		} 
		fetchUsers()
	},[])

	const handleOpenUserChat = (userId: string) => {
		router.push(`/chats/${userId}`)
	}

	if(!users){
		<div className='w-1/3 bg-white shadow-sm rounded-lg p-1'>
			<div className='flex items-center'>
				<Image src={"/logo.png"} alt='logo' width={300} height={300} className='w-20 h-20'/>
				<h1 className='text-lg font-semibold text-gray-600'>Acyberg</h1>
			</div>
			<div className='w-full bg-gray-200 h-[1px]'/>
			<div className='flex flex-col gap-1 pt-4'>
				<Skeleton className='py-1 w-full'/>
			</div>
		</div>
	}

	return (
		<div className='w-1/3 bg-white shadow-sm rounded-lg p-1'>
			<div className='flex items-center'>
				<Image src={"/logo.png"} alt='logo' width={300} height={300} className='w-20 h-20'/>
				<h1 className='text-lg font-semibold text-gray-600'>Acyberg</h1>
			</div>
			<div className='w-full bg-gray-200 h-[1px]'/>
			<div className='flex flex-col gap-1 pt-4'>
				{users?.map((data, index) => (
					<div 
						key={data.id} 
						className='py-1 w-full flex-col text-gray-600 items-center border-gray-100 border rounded-lg gap-2 hover:bg-blue-50 cursor-pointer transition-all hover:text-blue-500'
						onClick={() => {handleOpenUserChat(data.id)}}
					>
						<div className='flex'>
							<Image src={data.image ? data.image : ""} alt='' width={100} height={100} className='h-10 w-10 rounded-sm'/>
							<div className='font-semibold flex flex-col'>
								<div>
									<span className='pl-2'> 
										{data.name}
									</span>
									<span className='pl-1'>
										{data.surname ? data.surname.charAt(0) : ""}.
									</span>
								</div>
								<div className='text-xs ml-2 text-gray-400 font-medium'>
									
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default LeftPart