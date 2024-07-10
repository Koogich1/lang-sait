"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { DayOfWeek } from '@prisma/client';

const FirstTimeFreeUpdate = async (
  dayOfWeek: DayOfWeek[],
  firstTime: string,
  secondTime: string,
) => {
  // Get current user
  const user = await currentUser();

  if (!user?.email) {
    throw new Error("Unauthorized: Please log in to update availability");
  }

  const teacher = await getUserByEmail(user.email);
  const teacherId = teacher?.teacherId;

  if (!teacherId) {
    throw new Error("Teacher not found");
  }

	for (const day of dayOfWeek) {
		let startNum = Number(firstTime.split('').slice(0,2).join(''))
		let secondNum = Number(secondTime.split('').slice(0,2).join(''))

		const teacherAvailability = await db.teacherAvailability.findFirst({
			where: {
				teacherId: teacherId,
				day: day, 
			},
		});

		if (!teacherAvailability) {
			console.error(`No availability found for ${day}`);
			continue; 
		}

		let timeslots = []
    
		for (let i: number = startNum; i < secondNum; i++) {
			let timeSlot = i.toString().padStart(2, "0") + ":00";
			timeslots.push(timeSlot)
    }

		try {
      await db.teacherAvailability.update({
        where: {
          id: teacherAvailability.id,
        },
        data: {
          timeSlots: {
            set: timeslots,
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export default FirstTimeFreeUpdate;