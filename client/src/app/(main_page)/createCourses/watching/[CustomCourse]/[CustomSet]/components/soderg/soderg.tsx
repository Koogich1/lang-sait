import React from 'react'
import CourseBox from './Box/courseBox'
import LessonBox from './Box/lessonBox'
import RasdelBox from './Box/rasdelBox'

const Soderg = ({customSet} : {customSet:string}) => {
	return (
		<div>
			<h1 className='text-2xl font-light mt-3'>
				Добавленные материалы
			</h1>
			<div className='my-2 w-full h-[1px] bg-gray-100'/>
				<CourseBox />
				<RasdelBox />
				<LessonBox />
		</div>
	)
}

export default Soderg