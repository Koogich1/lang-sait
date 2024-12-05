"use server"

import { db } from "@/lib/db";
import { languageVariants, User } from "@prisma/client";
import { FaSliders } from "react-icons/fa6";

type Props = {
    user: User;     // Текущий пользователь (учитель)
    toWho: string;  // ID ученика, которого нужно добавить
    bookingId: string;
		date: Date;
		slotTime: string,
}

const acceptDayCreateLesson = async({ user, toWho, bookingId, date, slotTime }: Props) => {

		console.log("начинаю")

    if (!user.teacherId) return;

    try {
			const data = await db.studentBooking.update({
				where:{
					id: bookingId
				},
				data:{
					status: "booked"
				}
			})

			console.log(data)

			console.log(user.teacherId)

			const bookedLesson = await db.bookedLesson.create({
				data:{
					teacherId: user.teacherId,
					userId: toWho,
					startAt: date,
					slotTime: slotTime,
				}
			})
			console.log(bookedLesson)

			await db.user.update({
				where: {
						id: toWho
				},
				data: {
						bookedLesson: {
							connect: { id: bookedLesson.id }  // Связываем нового урока с пользователем
					}
				}
			});
        return true;
    } catch (e) {
        console.log(e);
    }
}

export default acceptDayCreateLesson;
