import LogoutButton from '@/app/(protected)/profile/_components/interface/logout-button'
import { Button } from '@/components/ui/button'
import React from 'react'

const Header = () => {
	return (
		<div className="flex justify-between items-center w-full mx-auto text-[#3E236C] mt-3">
			<div className='text-3xl font-medium'>LangSchool</div>
			<Button variant="violetSelect" className='text-base font-medium px-3 h-[43px]'><LogoutButton /></Button>
		</div>
	)
}

export default Header