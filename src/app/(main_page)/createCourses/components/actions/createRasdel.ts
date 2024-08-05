"use server"

import { db } from "@/lib/db"
import { courseData } from "@prisma/client"

type Props = {
	name: string,
	aboutRasdel: string,
	photoUrl: string,
	course: courseData,
}

const createRasdel = async({name, aboutRasdel, photoUrl, course}: Props) => {
	await db.$transaction(async (prisma) => {
        const allRasdels = await db.rasdelId.findMany({
			where: { coureId: course.id },
		});

        const order = allRasdels.length + 1
    

    await prisma.rasdelId.create({
        data: {
            name: name,
            aboutRasdel: aboutRasdel,
            coureId: course.id,
            userId: course.userId,
            photoUrl: photoUrl,
            position: order,
        }
    });
	});
}

export default createRasdel