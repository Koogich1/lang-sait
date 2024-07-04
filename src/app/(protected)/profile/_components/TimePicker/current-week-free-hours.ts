"use server"

import { getUserByEmail } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { DayOfWeek } from "@prisma/client";


interface TeacherAvailabilityWithSlots {
  id: string;
  teacherId: string;
  day: DayOfWeek;
  timeSlots: string[];
}

const getCurrentFreeDates = async (currentDayOfWeek: any) => {
  try {
    const user = await currentUser()
    if (!user?.email) {
      return { error: "Подключите почту" };
    }

    const userEmail = await getUserByEmail(user?.email);
    const teacherId = userEmail?.teacherId;

    if(!teacherId){
      return { error: "У пользователя нет привязанного учителя" };
    }
    const teacherAvailabilities: TeacherAvailabilityWithSlots[] = await db.teacherAvailability.findMany({
      where: {
        teacherId,
        day: currentDayOfWeek,
      },
    });

    if (!teacherAvailabilities) {
      return { error: "Доступность учителя на указанный день не найдена" };
    }

    const allTimeSlots: TimeSlot[] = [];
    teacherAvailabilities.forEach(availability => {
      allTimeSlots.push(...availability.timeSlots);
    });

    const freeSlots = allTimeSlots.filter(slot => slot.status === TimeSlotStatus.FREE);
    const nonWorkingSlots = allTimeSlots.filter(slot => slot.status === TimeSlotStatus.NON_WORKING);
    const occupiedSlots = allTimeSlots.filter(slot => slot.status === TimeSlotStatus.OCCUPIED)

    return { freeSlots, nonWorkingSlots, occupiedSlots};
  } catch (error) {
    console.error(error);
    return { error: "Произошла ошибка при получении свободных слотов" };
  }
};
  
  

export default getCurrentFreeDates