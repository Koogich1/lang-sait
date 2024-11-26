"use client"

import { logout } from '@/actions/logout'

const LogoutButton = () => {
	
	const onClick = () => {
		logout()
	}

	return (
			<div onClick={onClick}>Выйти из аккаунта</div>
	)
}

export default LogoutButton