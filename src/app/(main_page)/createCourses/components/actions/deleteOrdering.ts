"use server"

import { db } from "@/lib/db"

const deleteOrdering = async (answerId: string) => {
  // Получаем тест, к которому принадлежит удаляемый ответ
  const answerToDelete = await db.answer.findUnique({
    where: { id: answerId },
    select: { testId: true }
  });

  if (!answerToDelete) {
    throw new Error("Answer not found");
  }

  const testId = answerToDelete.testId;

  // Удаляем ответ
  await db.answer.delete({
    where: {
      id: answerId
    }
  });

  // Пересчитываем позиции оставшихся ответов
  const remainingAnswers = await db.answer.findMany({
    where: { testId },
    orderBy: { order: 'asc' } // Предполагаем, что порядок уже установлен
  });

  // Обновляем позиции оставшихся ответов
  await Promise.all(
    remainingAnswers.map((answer, index) => {
      return db.answer.update({
        where: { id: answer.id },
        data: { order: index + 1 } // Нумерация с 1
      });
    })
  );

  return { success: true };
}

export default deleteOrdering;
