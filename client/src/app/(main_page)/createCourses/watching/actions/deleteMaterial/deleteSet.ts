"use server"

import { db } from "@/lib/db"

const deleteSet = async (setId: string) => {
    // Получаем удаляемый элемент
    try{
        const deletedMaterial = await db.customCourseSet.findUnique({
            where: { id: setId }
        });

        console.log(deletedMaterial)
    
        if (deletedMaterial) {
            // Запоминаем позицию удаляемого элемента
            const deletedPosition = deletedMaterial.position;
    
            // Удаляем элемент
            await db.customCourseSet.delete({
                where: { id: setId }
            });
    
            // Обновляем позиции оставшихся элементов
            await db.customCourseSet.updateMany({
                where: {
                    position: {
                        gt: deletedPosition // Обновляем только те позиции, которые больше или равны удаленной
                    }
                },
                data: {
                    position: {
                        decrement: 1 // Снижаем позицию на 1
                    }
                }
            });
        }
    }catch(e){
        console.log(e)
    }
}

export default deleteSet;
