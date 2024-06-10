"use server"

import { db } from "@/lib/db";

type Props = {
  teacherId: string;
};

export const getTeacherAvailability = async (teacherId: string) => {
  const existingAvailability = await db.teacherAvailability.findFirst({
    where: {
      teacherId: teacherId,
    },
  });

  if (!existingAvailability) {
    return false; 
  }

  return true; 
};

export default getTeacherAvailability;