"use server"

import { db } from "@/lib/db";

const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1); // Текущая дата

const dayToArchive = async () => {
  try {
    // Получите всех учителей и их расписания
    const teachers = await db.teacher.findMany({
      include: {
        scheduleDays: true,
        availabilities: true,
      },
    });

    // Переберите учителей и обновите их расписание
    for (const teacher of teachers) {
      // Проверьте общее количество расписаний для учителя
      const scheduleCount = teacher.scheduleDays.length;

      // Если у учителя меньше 21 записи, добавьте +1 день
      if (scheduleCount < 21) {
        for (const schedule of teacher.scheduleDays) {
          const newDate = new Date(schedule.date);
          newDate.setDate(newDate.getDate() + 1); // Добавляем +1 день

          // Обновляем расписание с новой датой
          await db.teacherScheduleDay.update({
            where: { id: schedule.id },
            data: {
              date: newDate, // Обновленная дата
            },
          });
        }
      }
    }

    // Получить устаревшие дни (меньше текущей даты)
    const outdatedDays = await db.teacherScheduleDay.findMany({
      where: {
        date: {
          lt: currentDate, // Находим только те даты, которые меньше текущей
        },
      },
    });

    console.log("Current Date:", currentDate);
    console.log("Outdated Days:", outdatedDays);

    // Перебрать устаревшие дни и архивировать их
    for (const day of outdatedDays) {
      await db.teacherArhivedScheruleDay.create({
        data: {
          teacherId: day.teacherId,
          date: day.date, // Здесь можно модифицировать дату, если нужно
          timeSlots: day.timeSlots,
          timeSlotsWorked: [] // При необходимости добавьте соответствующие данные
        },
      });

      // Удаление перенесенных дней из исходной таблицы
      await db.teacherScheduleDay.delete({
        where: {
          id: day.id,
        },
      });
    }
  } catch (error) {
    // Обработка ошибок
    console.error("Error in dayToArchive:", error);
  }
};

export default dayToArchive;
