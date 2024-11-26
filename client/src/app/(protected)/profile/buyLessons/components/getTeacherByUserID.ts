"use server"

import { db } from "@/lib/db";

const getTeacherByUserId = async (userId: string) => {
    if (!userId) {
        console.error("teacherId is required but is undefined or null");
        return null; // Exit if teacherId is invalid
    }

    // Proceed to find the user associated with the teacher
    const user = await db.user.findUnique({
        where: {
            id: userId
        }
    });

    if (!user || user.teacherId == null) {
        return null; // Return null if user not found
    }

		const teacher = await db.teacher.findUnique({
			where: { id: user.teacherId },
			include: {
					languages: {
							select: {
									language: true,
									level: true,
									prefers: true
							}
					}
			}
	});

	if (!teacher) {
		return null; // Return null if teacher not found
	}

    // Construct the response
    const languages = teacher.languages.map(lang => ({
        language: lang.language,
        level: lang.level,
        prefers: lang.prefers || '' 
    }));

		

    return {
        id: user.id,
        teacherId: teacher.id,
        videoSrc: teacher.videoSrc || '',
        userInfo: {
            image: user.image,
            name: user.name,
            surname: user.surname,
        },
        teacherInfo: {
            images: teacher.images,
            aboutMe: teacher.aboutMe,
            languages: languages,
            lessonPrise: teacher.lessonPrise
        },
    };
};

export default getTeacherByUserId;
