"use server"

import FreeDatesWeek from "../TimePicker/freeDates"

type Props ={
	currWeek: string
}


const WeekModalContent = async({currWeek} : Props) => {
	return (
		<div className='w-full bg-white mt-10 shadow-lg rounded-lg'>
			<h1 className='p-5 text-xl font-semibold text-gray-600'>
				Мои занятия
			</h1>
			<FreeDatesWeek currentDay={currWeek}/>
		</div>
	)
}

export default WeekModalContent