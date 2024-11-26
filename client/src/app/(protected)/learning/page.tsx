import React from 'react'
import LearningBox from './components/learningBox/page'
import TimerTeacher from '@/app/timerUpdate/updateTeacherClock'

const MyLearning = () => {
	return (
		<div className='w-full h-full'>
			{
				<LearningBox />
			}
		</div>
	)
}

export default MyLearning