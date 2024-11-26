"use client"

import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import { User } from '@prisma/client'
import { divide } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiOutlineBookOpen, HiOutlinePencil } from 'react-icons/hi2'


const LearningBox = () => {
	const [user, setUser] = useState<User | null>(null)
	const [page, setPage] = useState("videoCall")
	const router = useRouter()

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	}, [])

	if(!user){
		return
	}
	
	return (
		<div className='bg-white min-h-[60vh] rounded-lg'>
			<div className='flex mt-5 gap-3 px-3 rounded-xl'>
				<div className='w-1/3'>
					<div className='border-b border-gray-100 mt-3'>
						<Button
							variant='shadow' 
							size="lg" 
							className={`w-full text-[#4DA180] font-medium flex items-center justify-center`}
							onClick={() => setPage("Materials")}
						>
							<div className='flex gap-2'>
								<h1>Материалы</h1>
								<HiOutlineBookOpen
									className="text-2xl mr-[1px]"
								/>
							</div>
						</Button>
					</div>
				</div>
				<div className='w-1/3'>
					<div className='border-b border-gray-100 mt-3'>
						<Button 
								variant='shadow'  
								size="lg" 
								className={`w-full text-[#F07979] font-medium flex items-center justify-center`}
								onClick={() => setPage("TestsDz")}
							>
								<div className='flex gap-3'>
									Тесты и ДЗ
									<HiOutlinePencil className="text-[1.5rem] mr-[1px]"/> 	
								</div>
						</Button>
					</div>
				</div>
				<div className='w-1/3'>
					<div className='border-b border-gray-100 mt-3'>
						<Button 
								variant='shadow'  
								size="lg" 
								className={`w-full text-[#798bf0] font-medium flex items-center justify-center`}
								onClick={() => setPage("videoCall")}
							>
								<div className='flex gap-3'>
									Занятия
									<HiOutlinePencil className="text-[1.5rem] mr-[1px]"/> 	
								</div>
						</Button>
					</div>
				</div>
			</div>
			{page === "videoCall" && 
			<div>
			</div>
			}
		</div>
	)
}

export default LearningBox