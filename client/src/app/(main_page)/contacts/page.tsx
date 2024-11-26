import React from 'react'
import MainHeader from '../header'
import { Button } from '@/components/ui/button'

const Page = () => {
	return (
		<div className='w-full'>
			<MainHeader />
			<div className='mx-20'>
				<div className='w-full h-[40vh] bg-white mt-20 shadow-lg rounded-xl flex flex-col py-4 px-2'>
					<h1 className='text-2xl font-medium text-[#835BD2]'>Контакты</h1>
					<div className="flex flex-col text-sm text-gray-600 font-light gap-1 h-[35vh] justify-center">
            <h1>По техническим вопросам, а также вопросам поддержки обращайтесь: <span className="font-semibold">koogich@mail.ru</span></h1>
            <h1>Связь с администатором: <span className="font-semibold">zaripova_ah@mail.ru</span></h1>
          </div>
				</div>
			</div>
		</div>
	)
}

export default Page