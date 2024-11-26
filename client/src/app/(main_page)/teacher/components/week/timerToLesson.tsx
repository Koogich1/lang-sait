"use client";

import React from 'react';
import { StudentBooking } from "@prisma/client";
import Countdown from 'react-countdown';

type Props = {
    booking: StudentBooking[] | null;
}

const TimerToLesson = ({ booking }: Props) => {
    if (!booking || booking.length === 0) return null;

    const ToWhatBooking = booking[0];

    // Извлекаем дату урока
    const lessonDate = new Date(ToWhatBooking.date);
    // Устанавливаем время на 22:00
    lessonDate.setHours(22, 0, 0, 0); // Устанавливаем часы, минуты, секунды и миллисекунды

    // Кастомный рендерер
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            return <span>Урок начался или уже прошёл!</span>;
        } else {
            const parts: string[] = [];
            if (days > 0) {
                parts.push(`${days} дн.`);
            }
            if (hours > 0) {
                parts.push(`${hours} ч.`);
            }
            if (minutes > 0) {
                parts.push(`${minutes} м.`);
            }
            if (seconds > 0) {
                parts.push(`${seconds} с.`);
            }
            return(
							<div className='flex justify-center w-full pt-3'>
								<span className='text-4xl font-bold text-center text-[#835BD2] opacity-50'>{parts.join(' ')}</span>;
							</div>
						)
        }
    };

    return (
        <div className='h-[170px] py-4 justify-between flex flex-col'>
            <h3 className='text-xl font-semibold text-[#835BD2] text-center'>Время до ближайшего урока:</h3>
            <Countdown date={lessonDate} renderer={renderer} className=''/>
        </div>
    );
}

export default TimerToLesson;
