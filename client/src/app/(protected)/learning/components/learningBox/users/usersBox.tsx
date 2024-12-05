"use client"

import { useState } from 'react'
import AddNewUser from '../../modal/addNewUser'
import StudentsBox from './studentsBox'
import { Teacher, User } from '@prisma/client'
import { FaPlus } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import ChoosenUserBox from './choosenUserBox'

type Props = {
	user: User
	teacher: Teacher | null
}

const Users = ({user, teacher}: Props) => {
	const[open, setOpen] = useState<boolean>(false)
	const[choosenUser, setChoosenUser] = useState<string | null>(null)

	return (
		<div className='min-h-[50vh] relative'>
				{!choosenUser ? 
				<><div className='w-full mt-5 flex items-center justify-between'>
				<p className='text-nowrap text-lg font-semibold text-gray-400'>Кол-во учеников 
				{
				//добвить функционал проверки кол-ва учеников)
				}
				</p>
			<div className='h-1 mt-[0.12rem] border-t-2 border-gray-200 border-dotted w-full ml-2'></div>
		</div>
		<div>
			<Button 
				className="w-full flex items-center justify-center gap-3 h-20 border-2 border-dashed mt-5 hover:border-solid hover:border-purple-600 transition-all rounded-lg bg-white hover:bg-white"
				onClick={() => {
					setOpen(true)
				}}
			>
				<div className="h-6 w-6 bg-[#835BD2] rounded-lg">
					<FaPlus className="w-full h-full p-1 text-white"/>
				</div>
				<h1 className="text-lg font-semibold text-[#835BD2]">Добавить ученика</h1>
			</Button>
		</div>
		<div>
			<StudentsBox user={user} teacher={teacher} setChoosen={setChoosenUser}/>
		</div>
		<AddNewUser openModal={open} setOpenModal={setOpen} userInfo={user}/>
		</>
	:
	<div>
		<ChoosenUserBox userId={choosenUser} setChoosen={setChoosenUser} TeacherUser={user} teacher={teacher}/>
	</div>
	}
		</div>
	)
}

export default Users