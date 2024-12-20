import { Button } from '@/components/ui/button'
import React from 'react'
import { FaSackDollar } from 'react-icons/fa6'
import { PiStudentBold } from 'react-icons/pi'

type Props = {
	users: string[],
	allLessons: number
}

const UsersLearn = ({users, allLessons}: Props) => {
	return (
		<div className='flex flex-col gap-2 w-full'>
			<div className="flex flex-col">
					<div className="w-full text-center font-medium text-gray-500 text-xl pb-2 flex gap-2 items-center justify-center">
						<PiStudentBold className='text-white bg-gray-500 rounded-md h-6 w-6 p-[0.180rem]'/> 
						Количество учеников
					</div>
					<div className="w-full h-[1px] bg-gray-200" />
				</div>
			<div className='flex gap-2 items-center justify-between' >
				<h1 className='font-medium text-gray-400'>Количество студентов:</h1>
				<Button className='text-lg font-bold p-0 h-6 px-2 bg-[#835BD2] text-white hover:bg-[#835BD2]'>
					{users.length + " "}
				</Button>
			</div>
			<div className='flex gap-2 items-center justify-between'>
				<h1 className='font-medium text-gray-400'>Уроков всего проведено:</h1>
				<Button className='text-lg font-bold p-0 h-6 px-2 bg-[#835BD2] text-white hover:bg-[#835BD2]'>
					{allLessons}
				</Button>
			</div>
		</div>
	)
}

export default UsersLearn