"use client"

import { ExtendedUser } from '@/next-auth'
import { UserSubscriptions } from '@prisma/client'
import CalendarMenuItems from './calendarMenuItems'
import { useState } from 'react'
import TeacherAllFreeDays from './TeacherAllFreeDays'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
	user: ExtendedUser
	subs: UserSubscriptions[],
	updateUserSubs: () => void;
}


const CalendarBox = ({user, subs, updateUserSubs}: Props) => {
	const[active, setActive] = useState<number>(0)

	const onClick = (id:number) => {
		setActive(id)
	}

	return (
		<>
			<ToastContainer
        position="bottom-left"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
			<div className='mt-5 w-full bg-white min-h-[80vh] rounded-lg shadow-lg p-3'>
			<div className='w-full border-b border-gray-100'>
				<h1 className='text-xl font-semibold text-gray-400'>Выберете время для занятия, или просмотрите текущие!</h1>
				<div className='flex gap-2 mt-5'>
				{subs.map((sub, id) => (
          <div key={id} onClick={() => onClick(id)}>
            <CalendarMenuItems teacherId={sub.teacherId} lessons={sub.LessonsPayd} active={active === id} />
          </div>
        ))}
				</div>
			</div>
			<div>
				{subs.map((sub, key) => (
						<div key={key}>
							{active === key && (
								<TeacherAllFreeDays teacherId={sub.teacherId} lessons={sub.LessonsPayd} updateAll={updateUserSubs}/>
							)}
						</div>
				))}
			</div>
		</div>
		</>
	)
}

export default CalendarBox