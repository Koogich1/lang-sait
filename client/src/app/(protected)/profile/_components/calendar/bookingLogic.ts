"use server";

import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { User } from '@prisma/client';
import { use } from 'react';

type Props = {
    timeSlot: string; // Ожидается формат "HH:mm"
    teacherId: string;
    day: Date
    user: User;
}

const bookingLogic = async({ timeSlot, teacherId, day, user}: Props) => {
    try {
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

        // Получаем информацию о расписании по dayId
        //const scheduleDay = await db.teacherScheduleDay.findUnique({
        //    where: { date: day },
        //    select: {
        //        date: true, // Предположим, что у вас есть поле даты
        //    }
        // });

        //if (!scheduleDay) {
           // return { error: "Запись не найдена" };
        // }

        // Получаем текущую дату и время
        const currentTime = new Date();
        
        // Создаем объект даты для запрашиваемого временного слота
        const [hours, minutes] = timeSlot.split(':').map(Number);
        //const bookingDateTime = new Date(scheduleDay.date);
        //bookingDateTime.setHours(hours, minutes); // Установка часов и минут

        // Сравниваем даты
        //if (bookingDateTime < currentTime) {
        //    return { error: "Запись на уже прошедшее время невозможна." };
        //}

        if(!day)return

        // Создаем запись о бронировании
        {/* const data = await db.studentBooking.create({
            data: {
                studentId: user.id,
				teacherId: teacherId,
                // teacherScheduleDayId: dayId,
                //language: 
                timeSlot: timeSlot,
                status: "waitingAccess",
                date: day,
            }
        });

        await db.application.create({
            data:{
                senderId: user.id,
                receiverId: teacherId,
                bookingID: data.id,
                onDate: day,
                slotInfo: timeSlot,
                format: "dayFix",
                status: "waiting",
            }
        })
            */}

        // Проверяем подписку пользователя
        

        console.log("Успешная бронь");
    } catch (e) {
        console.log(e);
    }
}

export default bookingLogic;
