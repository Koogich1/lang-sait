import React from 'react'
import AddNewGroup from '../../modal/addNewGroup'
import { GoPlus } from 'react-icons/go'
import { Button } from '@/components/ui/button'


const GroupBox = () => {

	const groups:any = 1

	return (
		<div className={
			`min-h-[50vh] w-full
			${groups.lendth > 1 ? "" : "flex items-center justify-center"}
		`}>
			{groups.lendth > 1 ? //тут поменять не забудь
			<div>
				usersu
			</div>
			:
			<div className='relative text-center flex flex-col items-center justify-center max-w-[1440px]'>
				<div className='w-20 h-20 flex items-center justify-center relative'>
					<p className='text-5xl scale-150 flex m-0 p-0 pb-3 relative'><span className='absolute ml-3'>🧍‍♂️</span><span className='scale-110 z-50'>🧍‍♀️</span><span className='absolute ml-[-13px]'>🧍</span></p>
					<div className='absolute flex items-center justify-center text-3xl text-white w-8 h-8 mb-[7.3rem] rounded-full border-[3px] border-white bg-green-400 z-50'>
						<GoPlus />
					</div>
				</div>
				<h1 className='text-lg font-medium text-center text-gray-400'>
				Для проведения групповых онлайн-уроков<br />
				создайте виртуальный класс и добавьте в него учеников
				</h1>
				<Button variant='violetSelect' className='mt-[12px]'>
					Создать группу
				</Button>
			</div>
			}
		</div>
	)
}

export default GroupBox