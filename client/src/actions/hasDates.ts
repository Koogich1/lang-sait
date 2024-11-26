// server/actions/hasDates.ts
"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const IsHasDates = async() => {
  const user = await currentUser()
  if(!user?.id){return false} // Вернуть false, если нет пользователя
  const userById = await getUserById(user?.id)

  const teacherId = userById?.teacherId
  if(!teacherId){
    return false // Вернуть false, если нет teacherId
  }
  
  const aviabilites = await db.teacherAvailability.findMany({
    where: {
      teacherId: teacherId
    }
  })

  return aviabilites.length > 0; // Возвращает true, если есть записи, иначе false
}

export default IsHasDates