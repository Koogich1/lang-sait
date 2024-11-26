"use server"

import { db } from "@/lib/db"
import deleteLittleRasdel from "./deleteRasdel"

const deleteLessons = async(lessonId: string) => {
    try {
        // First, get all littleRasdels for the lesson
        const allRasdels = await db.littleRasdel.findMany({
            where: {
                lessonId: lessonId
            }
        });

        // Delete each littleRasdel and its dependencies
        for (const rasdel of allRasdels) {
            await deleteLittleRasdel({ rasdelId: rasdel.id, lessonId });
        }

        // Finally, delete the lesson itself
        await db.lessons.delete({
            where: {
                id: lessonId
            }
        });
    } catch (error) {
        console.error("Error deleting lesson:", error);
        throw error; // Handle the error appropriately
    }
}

export default deleteLessons
