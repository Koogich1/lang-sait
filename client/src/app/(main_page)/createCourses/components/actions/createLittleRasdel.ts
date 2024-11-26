"use server"

import { db } from "@/lib/db"

const createLittleRasdel = async(lessonId:string) => {

	const existingRasdels = await db.littleRasdel.findMany({
    where: {
      lessonId: lessonId,
    },
    orderBy: {
      position: 'asc' // Убедитесь, что field name matches
    }
  });

	const sectionNumber = existingRasdels.length + 1;
  const littleRasdelName = `Раздел ${sectionNumber}`;
  

	await db.littleRasdel.create({
		data: {
      name: littleRasdelName,
      lessonId: lessonId,
      position: sectionNumber,
    }
	})
}

export default createLittleRasdel