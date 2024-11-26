"use server"

import { db } from "@/lib/db"

const deleteAnswer = async(answerId: string, testId: string) => {
    // Step 1: Delete the answer
    await db.answer.delete({
        where: {
            id: answerId
        }
    });

    // Step 2: Fetch the remaining answers
    const remainingAnswers = await db.answer.findMany({
        where: {
            // Define how to filter the answers, e.g., by the same testId
            testId: testId // Make sure to get the testId from your context
        },
        orderBy: { order: 'asc' } // Fetch remaining answers sorted by order
    });

    // Step 3: Update their order
    for (let index = 0; index < remainingAnswers.length; index++) {
        const answer = remainingAnswers[index];
        await db.answer.update({
            where: { id: answer.id },
            data: { order: index + 1 } // Setting new order
        });
    }
};

export default deleteAnswer;