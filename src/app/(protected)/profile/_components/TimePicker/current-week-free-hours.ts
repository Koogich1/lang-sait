"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const CurrentWeekFreeHours = async () => {
  const user = await currentUser();

  if (!user?.email) {
    return { error: "Подключите почту" };
  }

  const userEmail = await getUserByEmail(user?.email);

  const teacherId = userEmail?.teacherId;

  if (!teacherId) {
    return;
  }

  try {
    const timeFinder = await db.teacherAvailability.findFirst({
      where: {
        Monday:{
					hasSome: ["12", "13",],
				} 
      }
    });
		console.log(timeFinder)
    return timeFinder;
  } catch (error) {
    console.error("Что-то пошло не так", error);
    return { error: "Что-то пошло не так", detailedError: error };
  }
};

export default CurrentWeekFreeHours