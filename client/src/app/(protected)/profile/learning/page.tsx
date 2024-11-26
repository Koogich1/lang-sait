"use client"

import { useEffect, useState } from "react"
import Header from "../_components/header"
import LearningBox from "../_components/learning/learningBox"
import { User } from "@prisma/client"
import { currentUser } from "@/lib/auth"

const SettingsPage = () => {
	const[user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	}, [])

	return(
		<div className="h-[100%]">
			<div>
				<Header 
					user={user}
					header="Обучение"
				/>
				<LearningBox />
			</div>
		</div>
	)
}

export default SettingsPage