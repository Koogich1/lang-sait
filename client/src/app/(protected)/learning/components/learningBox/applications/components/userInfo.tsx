"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { getUserById } from "@/data/user"
import { User } from "@prisma/client"
import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
	userId: string
}

const UserInfo = ({userId}: Props) => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await getUserById(userId)
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	},[])

	if(!user){
		return(
			<Skeleton className="w-[100px] h-[20px] rounded-full" />
		)
	}

	return (
		<div>
			<div className="flex gap-3 items-center">
				<Image src={user.image ? user.image : ""} alt="logo" width={100} height={100} className="w-[3rem] h-[3rem] rounded-full" />
				<div>
					<p>{user.name}</p>
					<p>{user.surname}</p>
				</div>
			</div>
		</div>
	)
}

export default UserInfo