'use client'

import { currentUser } from "@/lib/auth"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"
import { ClipLoader } from "react-spinners"

const AllCalsNearAndActive = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	}, [])

	if(!user){
		return(
			<div className="w-full h-[50vh] flex items-center justify-center flex-col gap-3 text-gray-400">
				<h1>
					Поиск звонков...
				</h1>
				<ClipLoader color="#9ca3af"/>
			</div>
		)
	}
	
	return (
		<div>
			<p className="text-base font-light text-gray-400 py-3">
				Добро пожаловать, {user.name}:
			</p>
			<div className="text-base font-light text-gray-400 py-3 bg-gray-50 border h-[50vh] flex items-center justify-center">
				тут будут открытые комнаты, уроки, курсы и пр
			</div>
		</div>
	)
}

export default AllCalsNearAndActive