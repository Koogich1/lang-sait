"use client"

import MainHeader from '../header'
import { Button } from '@/components/ui/button'
import { IoMailOpenOutline, IoMapOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { IoIosHammer } from 'react-icons/io'

const Page = () => {
	return (
		<div className='w-full pb-5'>
			<MainHeader />
			<div className='mx-20'>
				<div className='w-full min-h-[75vh] items-center justify-center bg-white mt-10 shadow-lg rounded-xl flex flex-col py-4 px-2'>
					<h1 className='text-3xl font-medium text-[#835BD2]'>Напишите нам!</h1>
					<p className='text-center text-sm font-light text-gray-400 pt-3'>Мы всегда открыты для обратной связи <br /> и рады вашему контакту.</p>
					<div className='flex gap-10 w-full items-center justify-center mt-10'>
						<div className='w-1/5 flex flex-col gap-3 items-center justify-center'>
							<IoPhonePortraitOutline className='text-5xl scale-[135%] text-[#835BD2]'/>
							<div className='flex flex-col leading-5 pt-3 h-[5rem] text-center text-[#835BD2]'>
								<p>+7(xxx)xxx-xx-xx</p>
								<p>+7(xxx)xxx-xx-xx</p>
							</div>
						</div>
						<div className='w-1/5 flex flex-col gap-2 items-center justify-center'>
							<IoIosHammer className='text-5xl scale-150 text-[#835BD2]'/>
							<div className='flex flex-col leading-5 pt-3 h-[5rem] text-center text-[#835BD2]'>
								<p>koogich@mail.ru</p>
							</div>
						</div>
						<div className='w-1/5 flex flex-col gap-2 items-center justify-center'>
							<IoMailOpenOutline className='text-5xl scale-150 text-[#835BD2]'/>
							<div className='flex flex-col leading-5 pt-3 h-[5rem] text-center text-[#835BD2]'>
								<p>zaripova_ah@mail.ru</p>
								<p>koogich@mail.ru</p>
							</div>
						</div>
					</div>
					<div className='mt-3 w-[45%] text-sm font-light text-gray-400 text-center'>
						У вас есть вопросы или пожелания, касающиеся наших услуг? Компания acyberg.com с удовольствием на них ответит. Написав нам на zaripova_ah@mail.ru. Мы с радостью обсудим все детали!
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page