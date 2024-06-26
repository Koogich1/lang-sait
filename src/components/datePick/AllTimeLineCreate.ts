"use server"

import { db } from "@/lib/db";
import cuid from "cuid"
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

    while (startDay < endDay) {
      const formattedTime = startDay.toString().padStart(2, '0') + ':00';
      // Добавляем +1 час к end
      const endHour = (startDay + 1) % 24;
      const formattedEndTime = endHour.toString().padStart(2, '0') + ':00'; 
    
      timeLength.push({
        start: formattedTime,
        end: formattedEndTime, // Добавляем formattedEndTime
        status: "NON_WORKING",
      });
    
      startDay++;
    }
    
    
    const id = cuid()


    const teacherAvailability = await db.teacherAvailability.create({
      data: {
        id,
        teacherId,
        day,
        timeSlots: {
          create: timeLength.map((slotTime) => ({
            date: "",
            start: slotTime.start,
            end: slotTime.end,
            status: "NON_WORKING",
          })),
        },
      },
    })

    console.log(teacherAvailability)
  }
};


export default createEmptyTeacherAvailability;