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
	console.log(dayOfWeek)

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
		console.log(secondNum)

		const teacherAvailability = await db.teacherAvailability.findFirst({
			where: {
				teacherId: teacherId,
				day: day, // Убедитесь, что вы ищете доступность для правильного дня
			},
		});

		if (!teacherAvailability) {
			console.error(`No availability found for ${day}`);
			continue; // Пропустить следующую итерацию, если запись не найдена
		}
	
		for (let i: number = startNum; i < secondNum; i++) {
			let timeSlot = i.toString().padStart(2, "0") + ":00";
			try {
				const updateResult = await db.teacherAvailability.update({
					where: {
						id: teacherAvailability.id, // Убедитесь, что id соответствует найденной записи
						// Удалите teacherId и day из условия where, так как id уже уникален
					},
					data: {
						timeSlots: {
							updateMany: {
								where: {
									start: timeSlot,
								},
								data: {
									status: "FREE",
								},
							},
						},
					},
				});
				console.log(`Update successful for ${day} at ${timeSlot}`, updateResult);
			} catch(error) {
				console.error(`Error updating time slot for ${day} at ${timeSlot}`, error)
			}
			
      /* try {
        const updateResult = await db.teacherAvailability.update({
          where: {
            id: teacherAvailability.id,
            teacherId: teacherId,
            day: day,
          },
          data: {
            timeSlots: {
              updateMany: {
                where: {
                  start: timeSlot,
                },
                data: {
                  status: "FREE",
                },
              },
            },
          },
        });
				console.log(`Update successful for ${day} at ${timeSlot}`, updateResult);
      } catch(error) {
				console.error(`Error updating time slot for ${day} at ${timeSlot}`, error)
      }
				*/
    }
  }
};

export default FirstTimeFreeUpdate;