import React from 'react'
import DropDownMenu from '../../profile/_components/navbar/Dropdown_menu'

const Header = () => {
	return (
		<div className="flex justify-between items-center w-full mx-auto text-[#3E236C] mt-3">
			<div className='text-3xl font-medium'>LangSchool</div>
			<DropDownMenu />
		</div>
	)
}

export default Header