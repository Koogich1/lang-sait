"use server";

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { use } from 'react';

type Props = {
    dayId: string;
    timeSlot: string; // Ожидается формат "HH:mm"
    teacherId: string;
    day: Date
}

const bookingLogic = async({ dayId, timeSlot, teacherId, day}: Props) => {
    const user = await currentUser();
    if (!user) {
        return;
    }

    try {
        // Получаем информацию о расписании по dayId
        const scheduleDay = await db.teacherScheduleDay.findUnique({
            where: { id: dayId },
            select: {
                date: true, // Предположим, что у вас есть поле даты
            }
        });

        if (!scheduleDay) {
            return { error: "Запись не найдена" };
        }

        // Получаем текущую дату и время
        const currentTime = new Date();
        
        // Создаем объект даты для запрашиваемого временного слота
        const [hours, minutes] = timeSlot.split(':').map(Number);
        const bookingDateTime = new Date(scheduleDay.date);
        bookingDateTime.setHours(hours, minutes); // Установка часов и минут

        // Сравниваем даты
        if (bookingDateTime < currentTime) {
            return { error: "Запись на уже прошедшее время невозможна." };
        }

        if(!day)return

        // Создаем запись о бронировании
        await db.studentBooking.create({
            data: {
                studentId: user.id,
				teacherId: teacherId,
                teacherScheduleDayId: dayId,
                timeSlot: timeSlot,
                status: "waitingAccess",
                date: day,
            }
        });

        // Проверяем подписку пользователя
        const userSubscription = await db.userSubscriptions.findFirst({
            where: {
                userId: user.id,
                teacherId: teacherId,
            }
        });

        if (!userSubscription) {
            return;
        }

        if (userSubscription.LessonsPayd <= 0) {
            return { error: "Пополните баланс" };
        }


        await db.userSubscriptions.update({
            where: {
                id: userSubscription.id
            },
            data: {
                LessonsPayd: userSubscription.LessonsPayd - 1
            }
        });

        console.log("Успешная бронь");
    } catch (e) {
        console.log(e);
    }
}

export default bookingLogic;
