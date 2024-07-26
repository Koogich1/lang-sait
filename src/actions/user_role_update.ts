"use server"

import { getUserByEmail } from "@/data/user";
import { currentUser } from "@/lib/auth"; 
import { db } from "@/lib/db";

const teacherCreate = async () => {
    const user = await currentUser()

    if(!user?.email){
      return
    }

    const currentUs = await getUserByEmail(user?.email)

    if(!user) {
		return {error: "Неавторизован"}
	}
    
    const role = user.role === "TEACHER"

    if(!role){
        return {error: "Вы не учитель"}
    }

    const createdTeacher = await db.teacher.create({
        data: {
            language: ["English"],
        },
    });

    await db.user.update({
        where: { id: currentUs?.id},
        data: {
            teacherId: createdTeacher.id,
        },
    });
};

export default teacherCreate;