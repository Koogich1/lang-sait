"use client"

import { useCallback, useEffect, useState } from "react"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"
import { ExtendedUser } from "@/next-auth"
import CalendarBox from "../_components/calendar/calendarBox"
import { User, UserSubscriptions } from "@prisma/client"
import getAllSubscription from "@/actions/getAllSubscription"

const SettingsPage = () => {
	const	[user, setUser] = useState<User | null>(null)


	useEffect(() => {
		const fetchUser = async() => {
			const userData = await currentUser()
			if(userData){
				setUser(userData)
			}
		}
		fetchUser()
	},[])

	if(!user){
		return
	}

	return(
		<div className="h-[100%]">
			<div>
				<Header 
					header="Календарь"
					user={user}
				/>
			</div>
			<div className="w-full flex justify-start">
				{user.role === "TEACHER" 
				? 
					"I am a teacher" 
					: 
					<CalendarBox user={user}/>}
			</div>
		</div>
	)
}

export default SettingsPage