"use server"

import { db } from "@/lib/db";
import { languageVariants, User } from "@prisma/client";
import { FaSliders } from "react-icons/fa6";

type Props = {
    user: User;     // Текущий пользователь (учитель)
    toWho: string;  // ID ученика, которого нужно добавить
    language: languageVariants | null;
}

const addUser = async({ user, toWho, language }: Props) => {
    if (!user.teacherId) return;

    try {
        const student = await db.user.findUnique({
            where: {
                id: toWho,
            },
            // Ожидаем, что мы хотим знать, какие учителя уже связаны
        });

        if (!student) {
            throw new Error("Student not found");
        }

        // Добавление нового учителя в массив TeacherS
        await db.user.update({
            where: {
                id: toWho,
            },
            data: {
                TeacherS: {
                    // Используем оператор push для добавления нового учителя
                    push: user.id // Добавляем текущего учителя
                }
            }
        });

        // Обновляем информацию о студенте в модели Teacher
        await db.teacher.update({
            where: {
                id: user.teacherId,
                userId: user.id,
            },
            data: {
                studentsList: {
                    push: toWho
                },
            }
        });

        // Обновляем информацию о языке, если она задана
        if (language) {
            const info = await db.language.findFirst({
                where: {
                    userId: toWho,
                    language: language,
                }
            });

            if (info) {
                await db.language.update({
                    where: {
                        id: info.id
                    },
                    data: {
                        teacherId: user.id
                    }
                });
            }
        }
        
        await db.userSubscriptions.create({
            data:{
                userId: toWho,
                teacherId: user.id
            }
        })

        return true;
    } catch (e) {
        console.log(e);
        return FaSliders; // Вернуть иконку или сообщение в случае ошибки
    }
}

export default addUser;
