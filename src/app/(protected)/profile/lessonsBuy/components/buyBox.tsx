"use client"

import { useEffect, useState } from "react"
import { Teacher } from "../../_components/actions/typeUser"
import GetTeacher from "../../_components/actions/getTeacher"
import { UserSubscriptions } from "@prisma/client"
import getAllSubscription from "@/actions/getAllSubscription"
import TeacherSub from "./teacherSub"

const BuyBox = () => {
	const[user, setUser] = useState<Teacher | null>(null)
	const[userSubs, setUserSubs] = useState<UserSubscriptions[] | null>([])
	useEffect(() => {
		const handleData = async() => {
			const userdata = await GetTeacher()
			const subsData = await getAllSubscription()
			if(userdata){
				setUser(userdata)
			}
			if(subsData){
				setUserSubs(subsData)
			}
		}
		handleData()
	},[])

	return (
		<div className="grid grid-cols-3 gap-2 relative">
			{userSubs?.map((subs) => (
				<div key={subs.id} className="mt-5">
					<TeacherSub subs={subs}/>
				</div>
			))}
		</div>
	)
}

export default BuyBox