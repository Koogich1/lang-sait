"use server"

import { db } from "@/lib/db";


// завтра доделаем эту штуку, тут нужно создать базу пользователей, честно говоря, пока хз, мб уведомления сразу продумать
// на 3+ лица или пока такое, двухстороннее, ну, посмотрим) ввобщем я безумно собой горжусь, Но надо работать больше
// и лучше

//Пока сделал на 2 лица уведомление, т е учителю при добавлении времени и записи к нему ученика, т е дальше надо подтверждать и пр
type Props = {
	head: string;
	message: string;
	user1id: string;
	user2id: string;
}

const createNotification = async({head, message, user1id, user2id}: Props) => {
	const user = await db.user.findUnique({
		where:{
			id: user1id
		}
	})
	const user2 = await db.user.findUnique({
		where:{
			id: user2id
		}
	})
	if(user && user2){
		try{
			await db.notification.create({
				data:{
					userId: user.id,
					user2Id: user2.id,
					head: head,
					message: message,
					type: "BOOKING",
				}
			})
		} catch(e){
			console.log(e)
		}
	}
}

export default createNotification