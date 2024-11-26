"use server"

import { db } from "@/lib/db";

export async function updateOptions(testId: string, options: { id: string; text: string; isCorrect: boolean }[]) {
  try {
    for (const option of options) {
      await db.option.update({
        where: { id: option.id },
        data: {
          text: option.text,
          isCorrect: option.isCorrect,
        },
      });
    }
    console.log('Options updated successfully');
  } catch (error) {
    console.error('Error updating options:', error);
    throw new Error('Unable to update options');
  }
}
