"use server"

import { db } from "@/lib/db"

const createNewOrdering = async (testId: string) => {
    // Создаем новую опцию
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

    const order = (test.answers.length + 1) // Новый номер опции

    // Обновляем тест, добавляя новую опцию
    await db.test.update({
        where: {
            id: testId,
        },
        data: {
            answers: {
                create: [{ ...newOption, order }], // добавляем опцию с указанным порядком
            },
        },
    });
};

export default createNewOrdering;
