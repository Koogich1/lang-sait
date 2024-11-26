"use server"

import { db } from "@/lib/db"

const findRasdels = async (rasdelId: string) => {
  const courseSets = await db.customCourseSet.findMany({
    where: {
      customRasdelId: rasdelId,
    },
    include: {
      rasdels: true, // Получаем связанные разделы
    } 
  });

  // Фильтруем наборы курсов, у которых нет связанных разделов
  const filteredCourseSets = courseSets.filter(courseSet => courseSet.rasdels.length > 0);

  return filteredCourseSets; // Возвращаем только те наборы курсов, которые имеют разделы
}	

export default findRasdels;
