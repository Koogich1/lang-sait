"use server"

import { currentUser } from "@/lib/auth"; 
import { db } from "@/lib/db";

const teacherCreate = async () => {
    const user = await currentUser()

    if(!user) {
		return {error: "Неавторизован"}
	}
    
    const role = user.role === "TEACHER"

    if(!role){
        return {error: "Вы не учитель"}
    }

    await db.teacher.create({
        data:{
            id: user.id,
            language: "English",
        }
    })
};

export default teacherCreate;