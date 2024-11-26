"use client"

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { GoPlus } from "react-icons/go";
import AddStudentModal from './modal/addStudentModal';
import { Teacher, User } from '@prisma/client';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import UserBlock from './components/userBlock';

type Props = {
	user: User;
	teacher: Teacher | null
}

const StudentsBox = ({user, teacher}: Props) => {
	const[open, setOpen] = useState<boolean>(false)

	return (
		<div className={
			`min-h-[31vh] w-full
			${user ? "" : "flex items-center justify-center"}
		`}>
			<div className='relative text-center flex flex-col items-center justify-center max-w-[1440px]'>
				{teacher?.studentsList && teacher.studentsList.length > 0 ? 
					<div className='mt-5 w-full grid md:grid-cols-2 lg:grid-cols-3'>
						{teacher.studentsList.map((data) => (
							<UserBlock userId={data}/>
						))}
					</div>
				: 
					<>
						<div className='w-20 h-20 flex items-center justify-center relative mt-6'>
							<p className='text-5xl scale-150'>💁‍♂️</p>
							<div className='absolute flex items-center justify-center text-3xl text-white w-8 h-8 mb-5 ml-[50px] rounded-full border-[3px] border-white bg-green-400 z-50'>
								<GoPlus />
							</div>
						</div>
						<h1 className='text-lg font-medium text-center text-gray-400'>
							Для проведения индивидуальных онлайн -<br />уроков добавьте ученика
						</h1>
						<Button variant='violetSelect' className='mt-5' onClick={() => { setOpen(true); }}>
							Добавить ученика
						</Button>
					</>
				}
			</div>
			<AddStudentModal openModal={open} setOpenModal={setOpen} userInfo={user} />
		</div>
	);
};

export default StudentsBox;
