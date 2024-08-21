"use server"

import { db } from "@/lib/db";

const deleteAnswerOptionCorrect = async (position: number, testId: string) => {
    // Найти ответ по позиции
    const answer = await db.answer.findFirst({
        where: {
						testId: testId,
            order: position
        }
    });

    if (!answer) {
        throw new Error('Answer not found');
    }

		console.log(answer)
		

    // Найти правильный ответ, связанный с найденным ответом
    const correctAnswer = await db.correctAnswer.findFirst({
        where: {
						testId: testId,
            answerId: answer.id
        }
    });

    if (!correctAnswer) {
        throw new Error('Correct answer not found');
    }

    // Найти опцию, связанную с правильным ответом
    const option = await db.option.findFirst({
        where: {
						testId: testId,
            id: correctAnswer.optionId
        }
    });

    if (!option) {
        throw new Error('Option not found');
    }

    // Удаление правильного ответа
    await db.correctAnswer.delete({
        where: {
            id: correctAnswer.id
        }
    });

    // Удаление опции
    await db.option.delete({
        where: {
            id: option.id
        }
    });

    // Удаление ответа
    await db.answer.delete({
        where: {
            id: answer.id
        }
    });
		const remainingAnswers = await db.answer.findMany({
			where: {
					testId: testId
			},
			orderBy: {
					order: 'asc'
			}
		});

		for (let i = 0; i < remainingAnswers.length; i++) {
				await db.answer.update({
						where: {
								id: remainingAnswers[i].id
						},
						data: {
								order: i + 1 // Устанавливаем новый порядок начиная с 1
						}
				});
		}
		const remainingOption = await db.option.findMany({
			where: {
					testId: testId
			},
			orderBy: {
					order: 'asc'
			}
	});

	for (let i = 0; i < remainingOption.length; i++) {
			await db.option.update({
					where: {
							id: remainingOption[i].id
					},
					data: {
							order: i + 1 // Устанавливаем новый порядок начиная с 1
					}
			});
	}
};

export default deleteAnswerOptionCorrect;
