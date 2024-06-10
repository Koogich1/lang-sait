"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

const createEmptyTeacherAvailability = async () => {
  const user = await currentUser()

  if(!user?.email){
    return
  }

  const userEmail = await getUserByEmail(user?.email)

  const teacherId = userEmail?.teacherId

  if(!teacherId){
    console.log("нет теачер")
    return
  }

  const teacherAvailability = await db.teacherAvailability.findUnique({
    where: {
      id: teacherId
    }
  })

  if (!teacherAvailability) {
    await db.teacherAvailability.create({
      data: {
        teacherId: teacherId,
        Monday: {
          set: ["",]
        },
        Tuesday: {
          set: ["",]
        },
        Wednesday: {
          set: ["",]
        },
        Thursday: {
          set: ["",]
        },
        Friday: {
          set: ["",]
        },
        Saturday: {
          set: ["",]
        },
        Sunday: {
          set: ["",]
        },
      }
    })
  }
};
export default createEmptyTeacherAvailability