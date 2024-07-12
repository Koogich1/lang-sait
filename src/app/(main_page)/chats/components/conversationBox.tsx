"use client"

import { useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Conversation, Message, User } from "@prisma/client"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import clsx from "clsx"
import useOtherUser from "@/actions/getOtherUser"

interface ConversationBoxProps{
	data: any;
	selected?: boolean;
}

const ConversationBox : React.FC<ConversationBoxProps> = ({data, selected}) => {
	const otherUser = useOtherUser(data)
	const session = useSession()
	const router = useRouter()
	
	const handleClick = useCallback(() => {
		router.push(`/chats/conversations/${data.id}`)
	}, [data.id, router])

	const lastMessage = useMemo(() => {
		const messages = data.messages || [];

		return messages[messages.lendth - 1];
	}, [data.messages]);

	const userEmail = useMemo(() => {
		return session.data?.user.email
	},[session.data?.user.email])

	const hasSeen = useMemo(() => {
		if(!lastMessage){
			return false
		}
		const seenArray = lastMessage.seen || []

		if(!userEmail){
			return false
		}

		return seenArray.filter((user:any) => user.email === userEmail).lendth !== 0
	},[userEmail, lastMessage])

	const lastMessageText = useMemo(() => {
		if(lastMessage?.image){
			return "отправил фото"
		}
		if(lastMessage?.body){
			return lastMessage.body
		}
		
		return "Начать диалог"
	}, [lastMessage])
	return (
		<div 
			onClick={handleClick}
			className={clsx(`
				w-full relative flex items-center spase-x-3 hover:bg-gray-300 rounded-lg transition cursor-pointer`,
				selected ? "bg-gray-300" : "bg-gray-100"
				
			)}
		>
			text
			<img src={otherUser?.surname} alt="" />
		</div>
	)
}

export default ConversationBox