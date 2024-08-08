"use server"

import { db } from '@/lib/db'

const deleteSimpleTest = async({ testId, littleRasdelId }: { testId: string, littleRasdelId: string }) => {
    // Сначала получаем тест по его идентификатору
    const testToDelete = await db.test.findUnique({
        where: { id: testId },
        select: { position: true }, // Запоминаем позицию теста
    });

    if (testToDelete) {
        // Удаляем тест
        await db.answer.deleteMany({
            where: {
                testId: testId
            }
        });

        await db.option.deleteMany({
            where: {
                testId: testId
            }
        });

        await db.textBlock.deleteMany({
            where:{
                testId: testId
            }
        })

        await db.test.delete({
            where: {
                id: testId
            }
        });

        // Обновляем позиции оставшихся тестов
        const remainingTests = await db.test.findMany({
            where: {
                littleRasdelId: littleRasdelId,
            },
            orderBy: {
                position: 'asc'
            }
        });

        for (let index = 0; index < remainingTests.length; index++) {
            await db.test.update({
                where: { id: remainingTests[index].id },
                data: { position: index + 1 }
            });
        }
    }
}

export default deleteSimpleTest;
