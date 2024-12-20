{
  /* "use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayOfWeek } from "@prisma/client";
import moment from "moment";

// Определяем допустимые дни недели
type DayOfWeekString = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

const getDayOfWeekEnumValue = (dayOfWeekString: DayOfWeekString): DayOfWeek => {
  const dayMappings: Record<DayOfWeekString, DayOfWeek> = {
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
  const user = await currentUser();

  if (!user?.email) {
    return { error: "Добавьте актуальную почту" };
  }

  const userByEmail = await getUserByEmail(user?.email);
  const teacherId = userByEmail?.teacherId;

  if (!teacherId) {
    throw new Error("Вы не учитель");
  }

  const today = moment();
  const endDay = moment().add(20, 'days');

  const scheduleData = []; // Массив для хранения данных расписания

  for (let currentDay = today.clone(); currentDay.isSameOrBefore(endDay); currentDay.add(1, 'days')) {
    const dayOfWeekString = currentDay.format("dddd") as DayOfWeekString; // Указываем тип
    const dayOfWeekEnumValue = getDayOfWeekEnumValue(dayOfWeekString);

    const availability = await db.teacherAvailability.findFirst({
      where: {
        teacherId: teacherId,
        day: dayOfWeekEnumValue
      }
    });

    if (!availability) {
      continue; // Пропустить, если доступность отсутствует
    }

    const timeSlots = availability.timeSlots;

    scheduleData.push({
      date: currentDay.toISOString(),
      dayOfWeek: dayOfWeekEnumValue,
      timeSlots: timeSlots,
      teacherId: teacherId,
    });
  }

  // Используем createMany для создания множественных записей в базе данных
  if (scheduleData.length > 0) {
    try {
      await db.teacherScheduleDay.createMany({
        data: scheduleData,
      });
      console.log("Расписание успешно создано:", scheduleData);
    } catch (e) {
      console.error("Ошибка при создании расписания:", e);
    }
  } else {
    console.log("Нет доступных временных слотов для добавления в расписание.");
  }
};

export default weekCreateLogic;
*/
}
