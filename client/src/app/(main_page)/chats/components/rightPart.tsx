"use client"

import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2"
import ChatComponent from "./chatComponent";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/user";
import crypto from "crypto"
import getUserByIdChat from "../actions/getUserById";
import Image from "next/image";
import initializeSocket from "@/lib/socket";
import MoreMenu from "./moreMenu";
import { callStore } from "@/lib/useStore";

type Props = {
	friendId?: string;
}

const RightPart = ({friendId}: Props) => {
	const[user, setUser] = useState<User | null>(null)
	const[friend, setFriend] = useState<User | null>(null)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
			console.log(friendId as string)
			const frientInfo = await getUserByIdChat(friendId as string)
			console.log(frientInfo)
			if(frientInfo){
				setFriend(frientInfo)
			}
		}
		fetchUser()
	},[])

	if(!friendId || !user){
		return(
			<div className="w-2/3 bg-white rounded-lg shadow-sm min-h-[60vh] flex items-center justify-center flex-col gap-3">
				<HiOutlineChatBubbleLeftRight className="text-gray-400 text-5xl scale-125" />
				<span className="text-center text-lg font-medium text-gray-400">Выберите чат <br/>или создайте новый</span>
			</div>
		)
	}

	const socket = initializeSocket(user.id)

	const combinedData = [user.id, friendId].sort().join("")
	const hash = crypto.createHash("sha256").update(combinedData).digest("hex")
	const uniqueKey = `chat:${hash}:message:update`

	return (
		<div className="w-2/3 bg-white rounded-lg shadow-sm min-h-[60vh] flex items-center justify-center flex-col gap-3 relative">
			<div className="h-[4vh] w-full p-3 text-lg flex items-center">
				<div className="flex items-center mt-6 ml-1 gap-2">
					<Image src={friend?.image ?? "https://storage.yandexcloud.net/langschoolacynberg/images/user.png"} alt="logo" width={100} height={100} className="h-[3rem] w-[3rem] rounded-full" />
					<span>{friend?.name}</span>
					<span>{friend?.surname}</span>
					<MoreMenu reciverId={friendId as string} currentUserId={user.id}/>
				</div>
			</div>
			<ChatComponent friendId={friendId} currUser={user} uniqueKey={uniqueKey}/>
		</div>
	)
}

export default RightPart