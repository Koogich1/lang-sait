"use server"

import { db } from "@/lib/db"

const createHomeWorkRasdel = async(lessonId:string) => {

	const existingRasdels = await db.littleRasdel.findMany({
    where: {
      lessonId: lessonId,
    },
    orderBy: {
      position: 'asc' // Убедитесь, что field name matches
    }
  });

	const sectionNumber = existingRasdels.length + 1;
  const littleRasdelName = `Домашняя работа`;
  

	await db.littleRasdel.create({
		data: {
      name: littleRasdelName,
      lessonId: lessonId,
      position: sectionNumber,
    }
	})
}

export default createHomeWorkRasdel