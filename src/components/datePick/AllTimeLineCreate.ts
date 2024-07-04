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
    
    const id = cuid()

    const teacherAvailability = await db.teacherAvailability.create({
      data: {
        id,
        teacherId,
        day,
        timeSlots: [],
      },
    })

    console.log(teacherAvailability)
  }
};


export default createEmptyTeacherAvailability;