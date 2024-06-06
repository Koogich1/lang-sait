"use server"

import { db } from "@/lib/db";

type Props = {
  teacherId: string;
};

export const getTeacherAvailability = async ({teacherId}: Props) => {
  const existingAvailability = await db.availability.findFirst({
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