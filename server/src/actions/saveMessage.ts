"use server"

import prisma from "../prismadb"

const saveMessage = async(senderId: string, receivedId: string, content: string) => {
	console.log("начинаю")
	const data  = await prisma.directMessage.create({
		data:{
			receivedId: receivedId,
			senderId: senderId,
			content: content
		}
	})
	return data
}

export default saveMessage