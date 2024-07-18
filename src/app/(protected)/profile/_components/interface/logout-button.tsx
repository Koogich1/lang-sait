"use client"

import { logout } from '@/actions/logout'
import { Button } from '@/components/ui/button'

const LogoutButton = () => {
	
	const onClick = () => {
		logout()
	}

	return (
			<div onClick={onClick}>Выйти</div>
	)
}

export default LogoutButton