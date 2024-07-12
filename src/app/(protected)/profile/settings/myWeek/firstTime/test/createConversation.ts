"use server"

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';

const CreateConversation = async() => {
	const user = await currentUser()
	if(!user){
		return
	}
	const userId = "cly6y90gv00005vyv7ulu6ef5"
	try{
		const newConversation = await db.conversation.create({
			data: {
				name: "name",
				isGroup: false,
			}
		});
		
		// Теперь создадим связи с пользователями
		const connectUsers = await db.userConversation.createMany({
			data: [
				{
					userId: user.id,
					conversationId: newConversation.id
				},
				{
					userId: userId,
					conversationId: newConversation.id
				}
			]
		});
		
		// Вернем только что созданную беседу
		return newConversation;
	}catch(errors){
		console.log(errors)
	}
}

export default CreateConversation