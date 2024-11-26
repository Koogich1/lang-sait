"use client"

import { useEffect, useState } from "react"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"
import { ExtendedUser } from "@/next-auth"
import CalendarBox from "../_components/calendar/calendarBox"
import { User, UserSubscriptions } from "@prisma/client"
import getAllSubscription from "@/actions/getAllSubscription"

const SettingsPage = () => {
	const	[user, setUser] = useState<User | null>(null)
	const	[userSubs, setUserSubs] = useState<UserSubscriptions[] | null>([])

	const handleData = async() => {
		const subsData = await getAllSubscription()
		if(subsData){
			setUserSubs(subsData)
		if(userSubs == null){
			return
		}
		}
	}

	const updateData = () => {
		handleData()
	}

	useEffect(() => {
		const fetchUser = async() => {
			const userData = await currentUser()
			if(userData){
				setUser(userData)
			}
		}
		fetchUser()
		handleData()
	},[])

	if(!user){
		return
	}
	if(!userSubs){
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
				{user.role === "TEACHER" ? "I am a teacher" : <CalendarBox user={user} subs={userSubs} updateUserSubs={updateData}/>}
			</div>
		</div>
	)
}

export default SettingsPage