import React from 'react'
import MainHeader from '../header'
import { FaPhone } from 'react-icons/fa6'
import DialogAbout from './components/dialogAbout'
import AllCalsNearAndActive from './components/allCalsNearAndActive'

const Page = () => {
	return (
		<div className='w-full z-50'>
			<MainHeader />
			<div className='w-[90%] ml-[5%] min-h-[70vh] my-10 bg-white rounded-lg p-5 shadow-lg'>
				<div className='flex w-full justify-between border-b border-gray-100 pb-4'>
					<h1 className='flex gap-2 items-center text-xl font-medium text-blue-400'>
						<FaPhone className='text-base'/>
						<span>Модуль звонков</span>
					</h1>
					<DialogAbout />
				</div>
				<div>
					<AllCalsNearAndActive />
				</div>
			</div>
		</div>
	)
}

export default Page