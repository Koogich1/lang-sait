"use server"

import { db } from "@/lib/db";

const getTeacherById = async (teacherId: string) => {
    if (!teacherId) {
        console.error("teacherId is required but is undefined or null");
        return null; // Exit if teacherId is invalid
    }
    
    const teacher = await db.teacher.findUnique({
        where: { id: teacherId },
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

    // Proceed to find the user associated with the teacher
    const user = await db.user.findUnique({
        where: {
            id: teacher.userId
        }
    });

    if (!user) {
        return null; // Return null if user not found
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

export default getTeacherById;
