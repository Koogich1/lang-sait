"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayOfWeek } from "@prisma/client";
import moment from "moment";

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


const weekCreateLogic = async () => {
  const user = await currentUser()

  if (!user?.email) {
    return { error: "Добавьте актуальную почту" };
  }

	const userByEmail = await getUserByEmail(user?.email)

	const teacherId = userByEmail?.teacherId

  if (!teacherId) {
    throw new Error("Вы не учитель");
  }

  const today = moment();
	const endDay = moment().add(20, 'days');

  console.log(endDay)

	for (let currentDay = today.clone(); currentDay.isSameOrBefore(endDay); currentDay.add(1, 'days')) {
    const dayOfWeekString = currentDay.format("dddd");
    const dayOfWeekEnumValue = getDayOfWeekEnumValue(dayOfWeekString);
    console.log(dayOfWeekString)
    const availability = await db.teacherAvailability.findFirst({
      where: {
        teacherId: teacherId,
        day: dayOfWeekEnumValue
      }
    });

    console.log(availability)

    if (!availability) {
      return
    }

    const timeSlots = availability.timeSlots;

    try{
      await db.teacherScheduleDay.create({
        data: {
          date: currentDay.toISOString(),
          dayOfWeek: dayOfWeekEnumValue,
          timeSlots: timeSlots,
          teacher: {
            connect: {
              id: teacherId,
            },
          },
        }
      });
      console.log(currentDay)
    } catch(e){
      console.log(e)
    }
  }
};

export default weekCreateLogic;