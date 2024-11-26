"use server"

import { db } from "@/lib/db"

const createNewOrdering = async (testId: string) => {
    const newOption = {
        text: "опция", // текст новой опции
    };
    
    // Получаем текущие опции теста
    const test = await db.test.findUnique({
        where: {
            id: testId,
        },
        select: {
            answers: true, // Получаем только опции
        },
    });

    if (!test) {
        throw new Error("Test not found");
    }

    const order = test.answers.length + 1; // Новый номер опции

    // Обновляем тест, добавляя новую опцию
    const createdOption = await db.test.update({
        where: {
            id: testId,
        },
        data: {
            answers: {
                create: [{ ...newOption, order }], // добавляем опцию с указанным порядком
            },
        },
        select: {
            answers: true, // Получаем актуальные опции после обновления
        }
    });

    // Возвращаем последнюю созданную опцию
    return createdOption.answers[createdOption.answers.length - 1]; 
};

export default createNewOrdering;
