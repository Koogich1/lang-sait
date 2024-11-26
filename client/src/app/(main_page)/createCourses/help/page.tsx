"use client"

import React from 'react'
import { ClipLoader, RingLoader } from 'react-spinners'

const page = () => {
	return (
		<div className='w-full bg-white rounded-lg shadow-lg min-h-[60vh] mt-5 flex items-center justify-center'>
			<div className='flex flex-col items-center gap-5 text-xl font-bold text-gray-400'>
				В разработке
				<RingLoader />
			</div>
		</div>
	)
}

export default page