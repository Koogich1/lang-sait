"use client"

import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Social = () => {
	return (
		<div className='flex items-end w-full gap-x-2 justify-between mt-3'>
			<Button 
				className='bg-[#fff] shadow-sm border-[1px] border-[#f3f3f3] hover:bg-[#f3f3f3] h-12 w-[140px]'
				>
				<Image 
					className='w-5 h-5'
					src={'/vk.png'}
					width={100}
					height={100}
					alt='vk'
				/>
			</Button>
			<Button 
				className='bg-[#fff] shadow-sm border-[1px] border-[#f3f3f3] hover:bg-[#f3f3f3] h-12 w-[140px]'
				>
				<Image 
					className='w-5 h-5'
					src={'/ya.png'}
					width={100}
					height={100}
					alt='ya'
				/>
			</Button>
		</div>
	)
}

export default Social