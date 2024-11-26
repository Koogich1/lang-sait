"use client"

import { logout } from "@/actions/logout"
import { Navbar } from "@/app/(protected)/profile/_components/navbar/navbar"
import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-current-user"
import Header from "../_components/header"
import { useEffect, useState } from "react"
import { currentUser } from "@/lib/auth"
import { User } from "@prisma/client"


const SettingsPage = () => {
	const [user, setUser] = useState<User | null>(null)

	const fetchUser = async() => {
		const fetchData = await currentUser()
		if(fetchData){
			setUser(fetchData)
		}
	}

	useEffect(() => {
		fetchUser()
	}, [])

	if(!user){
		return(
			<div>
				загрузка...
			</div>
		)
	}

	return(
		<div className="h-[100%]">
			<div>
				<Header
					user={user}
					header="Достижения"
				/>
			</div>
		</div>
	)
}

export default SettingsPage