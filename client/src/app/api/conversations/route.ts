import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";


export async function POST(
	request: 
	Request) 
{
	try{
		const user = await currentUser();
		const body = await request.json();
		const {
			userId,
			isGroup,
			members,
			name,
		} = body

		if(!user?.id || !user.email){
			return new NextResponse("Unauthorized", {status: 401});
		}
		
		if(isGroup && (!members || members.length < 2)){
			return new NextResponse("Invalid data", {status: 400})
		}

		console.log(name, members, isGroup, userId)

		if(isGroup){
			const newConversation = await db.conversation.create({
				data: {
					name,
					isGroup,
					users: {
						connect: [
							// Добавление текущего пользователя в чат
							{
								id: userId, // Используйте id, а не userId
							},
							// Добавление других участников, если это групповой чат
							...(isGroup
								? members.map((memberId: any) => ({
										id: memberId, // Используйте id, а не userId
									}))
								: []),
						],
					},
				},
				include:{
					users: true
				}
			});	
			return NextResponse.json(newConversation)
		}
		
		const existingConversations = await db.conversation.findMany({
			where: {
				users: {
					every: {
						userId: {
							in: [user.id, userId], // Используем 'in' для поиска по нескольким значениям
						},
					},
				},
			},
		});

		const singleConversation = existingConversations[0]

		if(singleConversation){
			return NextResponse.json(singleConversation)
		}

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
			}); // Возвращаем всех участников
			return NextResponse.json(newConversation)
		}catch(errors){
			console.log(errors)
		}

	} catch(error: any){
		return new NextResponse("Interal Error", {status: 500})
	}
}
