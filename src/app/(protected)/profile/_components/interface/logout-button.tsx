"use client"

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const LogoutButton = () => {
	
	const onClick = () => {
		logout()
	}

	return (
			<Button onClick={onClick}>Выйти</Button>
	)
}

export default LogoutButton