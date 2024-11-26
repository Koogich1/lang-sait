"use server"

import { db } from "@/lib/db"

const deleteMaterial = async(materialId: string, lessonId: string) => {
    // Удаляем материал
    await db.materials.delete({
        where: {
            id: materialId,
        }
    });

    // После удаления, нужно обновить позиции оставшихся материалов
    const remainingMaterials = await db.materials.findMany({
        where: {
            lessonId: lessonId,  // Убедитесь, что lessonId доступен здесь
        },
        orderBy: {
            position: 'asc'
        }
    });

    // Обновляем позиции оставшихся материалов
    for (let index = 0; index < remainingMaterials.length; index++) {
        await db.materials.update({
            where: { id: remainingMaterials[index].id },
            data: { position: index + 1 }
        });
    }
}

export default deleteMaterial;
