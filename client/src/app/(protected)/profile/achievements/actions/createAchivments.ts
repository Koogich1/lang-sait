"use server"

import { db } from "@/lib/db"
import { AchivmentTypes } from "@prisma/client";

const createAchivments = async(userId: string) => {
	const achievementsData = Object.values(AchivmentTypes).map(type => ({
    userId: userId,
    type: type
  }));

	await db.achievement.createMany({
    data: achievementsData
  });
}

export default createAchivments