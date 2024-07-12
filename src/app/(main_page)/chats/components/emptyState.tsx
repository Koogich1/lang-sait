import React from 'react'
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2'

const EmptyState = () => {
	return (
		<div className='w-full bg-white h-[80vh] flex flex-col items-center justify-center text-gray-600 rounded-lg shadow-md'>
      <HiOutlineChatBubbleLeftRight className='text-5xl' />
      <p className='text-center text-xl pt-3'>
        Выберите чат<br />
        или создайте новый
      </p>
    </div>
	)
}

export default EmptyState