import React from 'react'
import { AiOutlinePicture } from 'react-icons/ai'
import { FaSackDollar } from 'react-icons/fa6'

type Props = {
	lessonPrise: number
}

const LessonPrise = ({lessonPrise}: Props) => {


	const Prise = lessonPrise
	const x5Prise = lessonPrise * 0.95
	const x10Prise = lessonPrise * 0.90

	return (
		<div className='flex'>
				<div className='flex flex-col gap-2 w-full'>
				<div className="flex flex-col">
					<div className="w-full text-center font-medium text-gray-500 text-xl pb-2 flex gap-2 items-center justify-center">
						<FaSackDollar className='text-white bg-gray-500 rounded-md h-6 w-6 p-1'/> 
						Стоимость обучения
					</div>
					<div className="w-full h-[1px] bg-gray-200" />
				</div>
				<div className="flex items-center justify-center flex-col">
					<p className="text-[#835BD2] text-base font-semibold">Цена за урок</p>
						<div className="bg-gradient-to-r mt-2 from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-base text-white font-medium">
							{Prise}₽
						</div>
					</div>
					<div className="w-full h-[1px] bg-gray-200 mt-2" />
					<div className="border-gray-200 rounded-lg">
						<h1 className="text-[#835BD2] text-base font-semibold">При покупке пакета</h1>
							<div className="mt-1 flex gap-2 items-center w-full justify-between">
									<h1 className='text-sm font-medium text-gray-400'>5+ уроков</h1>
									<div className="relative w-20">
										<div className=" bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-base text-white font-medium">
											{x5Prise}₽
										</div>
										<span className="py px-1 bg-yellow-300 text-red-500 font-semibold absolute top-[-6px] right-[-20px] rounded-sm rotate-45">
											-5%
										</span>
									</div>
								</div>
								<div className="mt-3 flex gap-2 items-center w-full justify-between">
									<h1 className='text-sm font-medium text-gray-400'>10+ уроков</h1>
									<div className="relative w-20">
										<div className=" bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-base text-white font-medium">
											{x10Prise}₽
										</div>
										<span className="py px-1 bg-yellow-300 text-red-500 font-semibold absolute text-sm top-[-6px] right-[-20px] rounded-sm rotate-45">
											-10%
										</span>
									</div>
								</div>
							</div> 
			</div>
		</div>
	)
}

export default LessonPrise