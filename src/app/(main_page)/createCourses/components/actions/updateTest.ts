"use server";

import { db } from "@/lib/db";

type Props = {
  testId: string;
  name?: string;
  options?: { id: string; text: string; isCorrect: boolean }[]; // Массив объектов для обновления опций
  answers?: { id: string; text: string; order?: number }[]; // Массив объектов для обновления ответов
  fileUrl?: string;
  audioName?: string;
};

const updateTest = async ({
  name,
  options,
  answers,
  testId,
  audioName,
}: Props) => {

  const updatedTest = await db.test.update({
    where: { id: testId },
    data: {
      question: name,
      audioHeader: audioName,
      options: {
        // Если options не переданы, можно не обновлять их
        ...(options && {
          update: options.map(({ id, text, isCorrect }) => ({
            where: { id },
            data: { text, isCorrect }
          })),
        }),
      },
      answers: {
        ...(answers && {
          update: answers.map(({ id, text, order }) => ({
            where: { id },
            data: { text, order }
          })),
        }),
      },
    },
  });



  return updatedTest;
};

export default updateTest;
