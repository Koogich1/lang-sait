"use server"


import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const getTeacherById = async () => {

  const user = await currentUser()

  if (!user || !user.teacherId) {
    return null;
  }

  const teacher = await db.teacher.findUnique({
    where: {
      id: user.teacherId,
    },
  });

  if (!teacher) {
    return null;
  }

  return teacher
};

export default getTeacherById