"use client"

import { ExtendedUser } from '@/next-auth'
import { User } from '@prisma/client'
import CalendarMenuItems from './calendarMenuItems'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaCalendarWeek } from 'react-icons/fa6'

type Props = {
    user: User
}

const CalendarBox = ({ user }: Props) => {
    const [active, setActive] = useState<number>(0)

    const onClick = (id: number) => {
        setActive(id)
    }

    // Функция для создания массива дат
    const createDateArray = (days: number) => {
        const today = new Date();
        return Array.from({ length: days }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + index); // добавляем индексы к текущей дате
            return date.toLocaleDateString(); // возвращаем дату в нужном формате
        });
    }

    // Создаем массив из 21 дня
    const dateArray = createDateArray(21);

    return (
        <>
            <ToastContainer
                position="bottom-left"
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='mt-5 w-full bg-white min-h-[80vh] rounded-lg shadow-lg p-3'>
                <div className='flex gap-2 items-center justify-center w-full text-gray-500'>
                    <FaCalendarWeek />
                    <h1 className='text-base font-medium'>Мое расписание</h1>
                </div>
                <div className='w-full h-[1px] bg-gray-200 mt-2'/>
                {/* Отрисовываем календарь */}
                <div className='grid lg:grid-cols-7'>
                    {dateArray.map((date, index) => (
                        <div key={index} className='m-2 p-3 bg-gray-100 rounded-md shadow-sm'>
                            {date}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CalendarBox;
