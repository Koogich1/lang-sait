"use client"

import { Button } from '@/components/ui/button';
import React from 'react'
import { GoPlus } from "react-icons/go";

const StudentsBox = () => {

	const users:any = 1 //изменить позже

	return (
		<div className={
			`min-h-[50vh] w-full
			${users.lendth > 1 ? "" : "flex items-center justify-center"}
		`}>
			{users.lendth > 1 ? //тут поменять не забудь
			<div>
				usersu
			</div>
			:
			<div className='relative text-center flex flex-col items-center justify-center max-w-[1440px]'>
				<div className='w-20 h-20 flex items-center justify-center relative'>
					<p className='text-5xl scale-150'>💁‍♂️</p>
					<div className='absolute flex items-center justify-center text-3xl text-white w-8 h-8 mb-5 ml-[50px] rounded-full border-[3px] border-white bg-green-400 z-50'>
						<GoPlus />
					</div>
				</div>
				<h1 className='text-lg font-medium text-center text-gray-400'>
					Для проведения индивидуальных онлайн-<br />уроков добавьте ученика
				</h1>
				<Button variant='violetSelect' className='mt-[8px]'>
					Добавить ученика
				</Button>
			</div>
			}
		</div>
	)
}

export default StudentsBox