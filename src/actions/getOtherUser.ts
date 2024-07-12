"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import{ useSession } from "next-auth/react"
import { useMemo } from "react"

const useOtherUser = async(conversation: any) => {
	const session = await currentUser()
	if(!session){return}
	const otherUser = await db.userConversation.findFirst({
		where: {
			conversationId: conversation.id,
			userId: { not: session.id }
		},
		include: {
			user: true
		}
	});

	return otherUser
}

export default useOtherUser