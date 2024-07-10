import React from 'react'
import MainHeader from '../header'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'
import UsersList from './components/usersList'

const page = () => {
	return (
		<div className='h-full w-full'>
			<MainHeader />
			<div className='w-full flex h-full px-[5%] gap-5 p-5'>
				<div className='w-1/4 bg-white rounded-lg shadow-md p-3'>
					<UsersList />
				</div>
				<div className='w-3/4 bg-white h-[80vh] flex flex-col items-center justify-center text-gray-600 rounded-lg shadow-md'>
					<HiOutlineChatBubbleLeftRight  className='text-5xl'/>
					<p className='text-center text-xl pt-3'>Выберите чат<br/>
					или создайте новый</p>
				</div>
			</div>
		</div>
	)
}

export default page