"use server"

import { db } from "@/lib/db";
import { TimeSlotStatus } from "@prisma/client";
import { addMinutes } from "date-fns";
import cuid from "cuid"
import { start } from "repl";
import { currentUser } from "@/lib/auth";
import { getUserByEmail } from "@/data/user";

enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

const createEmptyTeacherAvailability = async () => {

  let teacherId: any = null;

  const user = await currentUser();

  if(user?.email){
    const teacher = await getUserByEmail(user.email);
    const finderId = teacher?.teacherId;

    if(finderId){
      teacherId = finderId;
    }
  }

  const daysOfWeek = Object.values(DayOfWeek);

  for (const day of daysOfWeek) {
    const timeLength = [];
    
    let startDay = 0;
    const endDay = 24;

    while (startDay < endDay){
      const formattedTime = startDay.toString().padStart(2, '0') + ':00';
      timeLength.push(formattedTime)
      startDay++
    }
    const id = cuid()

    const teacherAvailability = await db.teacherAvailability.create({
      data: {
        id,
        teacherId,
        day,
        timeSlots: {
          create: timeLength.map((slotTime) => ({
            start: slotTime,
            end: slotTime + 1,
            status: "NON_WORKING",
          })),
        },
      },
    })

    console.log(teacherAvailability)
  }
};


export default createEmptyTeacherAvailability;