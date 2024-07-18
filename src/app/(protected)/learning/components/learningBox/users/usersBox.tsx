import React from 'react'
import AddNewUser from '../../modal/addNewUser'
import StudentsBox from './studentsBox'

const Users = () => {
	return (
		<div>
				<div className='w-full mt-5 flex items-center justify-between'>
					<p className='text-nowrap text-lg font-semibold text-gray-400'>Кол-во учеников 
					{" 1"
					//добвить функционал проверки кол-ва учеников)
					}
					</p>
				<div className='h-1 mt-[0.12rem] border-t-2 border-gray-200 border-dotted w-full ml-2'></div>
			</div>
			<div>
				<AddNewUser />
			</div>
			<div>
				<StudentsBox />
			</div>
		</div>
	)
}

export default Users