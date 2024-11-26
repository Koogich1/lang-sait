"use server"

import { db } from "@/lib/db"

const findCourses = async (rasdelId: string) => {
  const courseSets = await db.customCourseSet.findMany({
    where: {
      customRasdelId: rasdelId,
    },
    include: {
      courses: true, // Получаем связанные курсы
      // Здесь можно добавить другие поля, связанные с customCourseSet, если нужно
    }
  });

  return courseSets; // Возвращаем сами наборы курсов
}

export default findCourses;