"use server"

import { getUserByEmail } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { DayOfWeek, TimeSlotStatus } from "@prisma/client";

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  status: TimeSlotStatus;
  studentId: string | null;
  teacherAvailabilityId: string | null;
}

interface TeacherAvailabilityWithSlots {
  id: string;
  teacherId: string;
  day: DayOfWeek;
  timeSlots: TimeSlot[]; // Now TypeScript knows that `timeSlots` is an array of TimeSlot
}

const getCurrentFreeDates = async (currentDayOfWeek: any) => {
  try {
    // Получаем текущего пользователя
    const user = await currentUser()
    if (!user?.email) {
      return { error: "Подключите почту" };
    }

    // Получаем информацию о пользователе по его email
    const userEmail = await getUserByEmail(user?.email);
    const teacherId = userEmail?.teacherId;

    if(!teacherId){
      return { error: "У пользователя нет привязанного учителя" };
    }

    // Ищем доступность учителя на текущий день недели
    const teacherAvailabilities: TeacherAvailabilityWithSlots[] = await db.teacherAvailability.findMany({
      where: {
        teacherId,
        day: currentDayOfWeek
      },
      include: {
        timeSlots: true
      }
    });

    if (!teacherAvailabilities) {
      return { error: "Доступность учителя на указанный день не найдена" };
    }

    const allTimeSlots: TimeSlot[] = [];
    teacherAvailabilities.forEach(availability => {
      allTimeSlots.push(...availability.timeSlots);
    });
    // Теперь вы можете отфильтровать слоты времени по статусу (свободные и не рабочие)

    const freeSlots = allTimeSlots.filter(slot => slot.status === TimeSlotStatus.FREE);
    const nonWorkingSlots = allTimeSlots.filter(slot => slot.status === TimeSlotStatus.NON_WORKING);

    return { freeSlots, nonWorkingSlots };
  } catch (error) {
    // Обработка ошибок, если возникли проблемы при выполнении запросов к базе данных
    console.error(error);
    return { error: "Произошла ошибка при получении свободных слотов" };
  }
};
  
  

export default getCurrentFreeDates