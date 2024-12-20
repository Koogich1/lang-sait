"use client"

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const LogoutButton = () => {
	
	const onClick = () => {
		logout()
	}

	return (
			<Button variant={"violetSelect"} className='text-sm font-medium' onClick={onClick}>Выйти из аккаунта</Button>
	)
}

export default LogoutButton