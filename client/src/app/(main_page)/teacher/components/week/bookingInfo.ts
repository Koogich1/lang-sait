'use server'

import { db } from "@/lib/db"

type Props = {
	teacherId: string, 
	userId: string,
}

const bookingInfo = async ({teacherId, userId}: Props) => {
	const bookings = await db.studentBooking.findMany({
		where: {
			teacherId: teacherId,
			studentId: userId,
		},
		orderBy: [
			{
				date: 'asc', // Сортировка по дате в возрастающем порядке
			},
			{
				timeSlot: 'asc', // После сортировки по дате, сортировка по времени
			},
		],
	});

	return bookings;
};

export default bookingInfo