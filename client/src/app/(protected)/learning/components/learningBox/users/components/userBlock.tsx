"use client"

import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { FaMessage, FaUser } from "react-icons/fa6";

type Props = {
	userId: string;
	setChoosen: any;
}

const UserBlock = ({userId, setChoosen}: Props) => {
	const[user, setUser] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await getUserById(userId)
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	}, [])

	return (
		<div className="w-full border rounded-lg h-20 border-gray-200 shadow-sm flex items-center justify-between gap-2 p-2">
			<div className="flex items-center gap-2">
				<Image src={user?.image ? user.image : ""} alt="userImage" width={70} height={70} className="rounded-full"/>
				<div className="flex flex-col items-start justify-center text-gray-400 font-medium">
					<p>{user?.name}</p>
					<p>{user?.surname}</p>
				</div>
			</div>
			<div className="flex flex-col gap-2 items-end">
				<Button className="h-7 flex gap-2 font-medium" variant={"violetSelect"} onClick={() => setChoosen(user?.id)}><FaUser/>Профиль</Button>
				<Button className="h-7 flex gap-2 bg-blue-400 hover:bg-blue-500 font-medium" variant={"violetSelect"}><FaMessage/>Чат</Button>
			</div>
		</div>
	)
}

export default UserBlock