import React from 'react'
import LeftPart from './components/leftPart'
import RightPart from './components/rightPart'

const page = () => {
	return (
		<div className='w-full flex gap-2 px-4'>
			<LeftPart />
			<RightPart />
		</div>
	)
}

export default page