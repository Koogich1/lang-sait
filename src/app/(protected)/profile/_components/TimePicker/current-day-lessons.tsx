"use server"

type Props ={
	currWeek: string
}


const CurrentDayLessons = async({currWeek} : Props) => {
	return (
		<div className='w-full bg-white mt-10 shadow-lg rounded-lg'>
			<h1 className='p-5 text-xl font-semibold text-gray-600'>
				Мои занятия
			</h1>
		</div>
	)
}

export default CurrentDayLessons