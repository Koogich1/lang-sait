"use server"

import { getUserByEmail } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { DayOfWeek } from '@prisma/client'
import moment from 'moment'

const getDayOfWeekEnumValue = (dayOfWeekString:any) => {
  const dayMappings: { [key: string]: DayOfWeek } = {
    "Monday": "MONDAY",
    "Tuesday": "TUESDAY",
    "Wednesday": "WEDNESDAY",
    "Thursday": "THURSDAY",
    "Friday": "FRIDAY",
    "Saturday": "SATURDAY",
    "Sunday": "SUNDAY"
  };
  return dayMappings[dayOfWeekString];
};

const updateDatesForTeachers = async() => {
	const user = await currentUser()

	if(!user?.email){
		return
	}

	const userByEmail = await getUserByEmail(user?.email)

	const teacherId = userByEmail?.teacherId

	if(!teacherId){
		return('Вы не учитель')
	}

	const now = new Date()

	const expiredDays = await db.teacherScheduleDay.findFirst({
		where:{
			teacherId: teacherId,
			date: {lt: now}
		}
	})

	if(!expiredDays?.date){
		return
	}

	const endDay = moment().add(21, 'days');

	if (expiredDays) {
    await db.teacherScheduleDay.updateMany({
				where: {
					teacherId: teacherId,
					id: expiredDays.id
				},
				data: {
					archived: true,
				},
			})
		}

		const dayOfWeekString = endDay.format("dddd");
    const dayOfWeekEnumValue = getDayOfWeekEnumValue(dayOfWeekString);

		const availability = await db.teacherAvailability.findFirst({
      where: {
        teacherId: teacherId,
        day: dayOfWeekEnumValue
      }
    });

    if (!availability) {
      return
    }
		
		const timeSlots = availability.timeSlots;

		await db.teacherScheduleDay.create({
			data: {
				date: endDay.toISOString(),
				dayOfWeek: dayOfWeekEnumValue,
				timeSlots: timeSlots,
				teacher: {
					connect: {
						id: teacherId,
					},
				},
			}
		})

		return (
			console.log("все выполнено")
		)
}

export default updateDatesForTeachers