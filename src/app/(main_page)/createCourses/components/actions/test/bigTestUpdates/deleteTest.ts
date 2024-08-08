"use server"

import { db } from "@/lib/db"

const deleteTest = async(testId: string) => {
  // Начинаем транзакцию
  await db.$transaction(async (prisma) => {
    // Удаляем все текстовые блоки, связанные с testId
    await prisma.textBlock.deleteMany({
      where: {
        testId: testId
      }
    })

    // Удаляем сам тест
    await prisma.test.delete({
      where: {
        id: testId
      }
    })
  })
}

export default deleteTest
