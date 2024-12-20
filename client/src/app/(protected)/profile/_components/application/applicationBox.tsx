"use client"

import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useState } from "react"
import Applications from "./applications"
import NearLessons from "./nearLessons"
import { FaBell, FaUser } from "react-icons/fa6"

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
		<>
			<div className="flex w-full justify-center text-lg font-semibold gap-2 lg:text-xl items-center">
				<FaBell className="w-6 h-6 p-1 text-white bg-gray-500 rounded-md"/>
        <div className="flex gap-1">
          Заявки и занятия
        </div>
			</div>
			<div className="w-full h-[1px] bg-gray-200 my-2"/>
			<div className="flex justify-between font-medium">
			<Button 
				className={`px-2 py-1 border-2 ${active === "NearLessons" ? "bg-blue-500 text-white hover:bg-blue-600 border-blue-500 hover:border-blue-600" : "border-blue-500 text-blue-500 hover:bg-blue-200 bg-white"} rounded-lg transition-all cursor-pointer`}
				onClick={() => {
					handleMenuAcctive("NearLessons")
				}}
			>
				Ближайшие занятия
			</Button>
			<Button 
				className={`px-2 py-1 border-2 ${active === "Applications" ? "bg-green-600 text-white hover:bg-green-700 border-green-600 hover:border-green-700" : "border-green-600 text-green-600 hover:bg-green-200 bg-white"} rounded-lg transition-all cursor-pointer`}
				onClick={() => {
					handleMenuAcctive("Applications")
				}}
			>
				Заявки
			</Button>
			</div>
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
		</>
	)
}

export default ApplicationBox