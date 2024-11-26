"use client"

import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useState } from "react"
import Applications from "./applications"
import NearLessons from "./nearLessons"

type Props = {
	user: User
}

const ApplicationBox = ({user}: Props) => {
	const [active, setActive] = useState("NearLessons")
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleMenuAcctive = (name: string) => {
		setIsTransitioning(true)
		setTimeout(() => {
			setActive(name)
			setIsTransitioning(false)
		}, 300)
	}

	return (
		<div>
			<div className="flex justify-between font-medium">
			<Button 
				className={`px-2 py-1 border-2 ${active === "NearLessons" ? "bg-green-600 text-white hover:bg-green-700 border-green-600 hover:border-green-700" : "border-green-600 text-green-600 hover:bg-green-200 bg-white"} rounded-lg transition-all cursor-pointer`}
				onClick={() => {
					handleMenuAcctive("NearLessons")
				}}
			>
				Ближайшие занятия
			</Button>
			<Button 
				className={`px-2 py-1 border-2 ${active === "Applications" ? "bg-yellow-600 text-white hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700" : "border-yellow-400 text-yellow-500 hover:bg-yellow-200 bg-white"} rounded-lg transition-all cursor-pointer`}
				onClick={() => {
					handleMenuAcctive("Applications")
				}}
			>
				Заявки
			</Button>
			</div>
			<div className="h-[1px] w-full bg-gray-100 mt-3"/>
			<div className={`${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-all pt-1`}>
				{active === "NearLessons" ? 
				<div>
					<NearLessons user={user} />
				</div>
				:
				<div>
					<Applications user={user}/>
				</div>
				}
			</div>
		</div>
	)
}

export default ApplicationBox