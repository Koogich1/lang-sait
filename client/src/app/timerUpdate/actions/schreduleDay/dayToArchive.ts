"use server"

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);

const dayToArchive = async() => {
	
	try {
    const outdatedDays = await db.teacherScheduleDay.findMany({
      where: {
        date: {
          lt: currentDate
        }
      }
    });

    console.log("Current Date:", currentDate);
    console.log("Outdated Days:", outdatedDays);

    for (const day of outdatedDays) {
      await db.teacherArhivedScheruleDay.create({
        data: {
          teacherId: day.teacherId,
          date: day.date,
          timeSlots: day.timeSlots,
          timeSlotsWorked: [] // При необходимости добавьте соответствующие данные
        }
      });

      // Удаление перенесенных дней из исходной таблицы
      await db.teacherScheduleDay.delete({
        where: {
          id: day.id
        }
      });
    }
  } catch (error) {
    // Обработка ошибок
    console.error(error);
  }
}

export default dayToArchive