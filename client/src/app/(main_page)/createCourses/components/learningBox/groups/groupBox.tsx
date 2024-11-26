import React from 'react'
import AddNewGroup from '../../modal/addNewGroup'
import { GoPlus } from 'react-icons/go'
import { Button } from '@/components/ui/button'
import GroupBox from './groups'

const Groups = () => {

	return(
		<div>
				<div className='w-full mt-5 flex items-center justify-between'>
					<p className='text-nowrap text-lg font-semibold text-gray-400'>Кол-во групп 
					{" 1"
					//добвить функционал проверки кол-ва учеников)
					}
					</p>
				<div className='h-1 mt-[0.12rem] border-t-2 border-gray-200 border-dotted w-full ml-2'></div>
			</div>
			<div>
				<AddNewGroup />
			</div>
			<div>
				<GroupBox />
			</div>
		</div>
	)

	
}

export default Groups