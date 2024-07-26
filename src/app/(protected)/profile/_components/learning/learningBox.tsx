import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import { HiOutlineBookOpen, HiOutlinePencil } from 'react-icons/hi2'

const LearningBox = () => {
	return (
		<div className='flex mt-5 gap-3 px-3 rounded-xl bg-white'>
			<div className='w-1/2 min-h-[60vh]'>
				<div className='border-b border-gray-100'>
					<Button
						variant='shadow' 
						size="lg" 
						className={`w-full text-[#4DA180] font-medium`}
					>
						<div className='flex gap-2'>
							<h1>Материалы</h1>
							<HiOutlineBookOpen
								className="text-2xl mr-[1px]"
							/>
						</div>
					</Button>
				</div>
			</div>
			<div className='w-1/2 min-h-[60]'>
				<div className='border-b border-gray-100'>
					<Button 
							variant='shadow'  
							size="lg" 
							className={`w-full text-[#F07979] font-medium`}
						>
							<div className='flex gap-3'>
								Тесты и ДЗ
								<HiOutlinePencil className="text-[1.5rem] mr-[1px]"/> 	
							</div>
					</Button>
				</div>
			</div>
		</div>
	)
}

export default LearningBox