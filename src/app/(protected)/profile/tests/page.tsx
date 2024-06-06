"use client"

import { logout } from "@/actions/logout"
import { Navbar } from "@/app/(protected)/profile/_components/navbar/navbar"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import Header from "../_components/header"


const SettingsPage = () => {

	const user = useCurrentUser()

	const onClick = () => {
 logout();
}

	return(
		<div className="h-[100%]">
			<div>
				<Header 
					header="Тесты и Домашние задания"
				/>
			</div>
		</div>
	)
}

export default SettingsPage