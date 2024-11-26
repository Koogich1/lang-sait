"use server"

import { db } from "@/lib/db"

const getTeacherAviabillityByTeacherID = async (teacherId: string) => {
	const teacherWorkDays = await db.teacherScheduleDay.findMany({
			where: {
					teacherId: teacherId
			},
			include: {
					studentBookings: true,
			}
	});

	return teacherWorkDays.map((day) => {
			const dayWithStatus = {
					...day,
					timeSlots: day.timeSlots.map((hour) => {
							const booking = day.studentBookings.find((booking) => booking.timeSlot === hour);
							return {
									time: hour,
									status: booking ? booking.status : "free",
							};
					}),
			};
			return dayWithStatus;
	});
}

export default getTeacherAviabillityByTeacherID