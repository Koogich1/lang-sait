"use client";

import getTeacherAviabillityByTeacherID from "@/actions/getTeacherAviabillityByTeacherID";
import ModalBooking from "@/app/(protected)/learning/components/modal/ModalBooking";
import { bookedEtaps, DayOfWeek, TeacherAvailability, User, UserSubscriptions } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { date } from "zod";
import { FaClock } from "react-icons/fa6";
import { FaCalendar } from "react-icons/fa";
import { IoMdClock } from "react-icons/io";



type Teacher = {
    id: string;
    teacherId: string;
    videoSrc: string; // Добавлено поле videoSrc
    userInfo: {
      image: string | null;
      name: string | null;
      surname: string | null;
    };
    teacherInfo: {
      aboutMe: string;
          images: string[];
      languages: {
        language: string; // Убедитесь, что тут у вас правильный тип
        level: string;
        prefers: string; // Или используйте ваш enum
      }[];
      lessonPrise: number;
    };
  };

type Props = {
    Teacher: Teacher
    user: User | null
    userSubs: UserSubscriptions | undefined
    isTeacherAdded: boolean
    visov: () => void
}

type ChoosenDate = {
    userId: string,
    teacherId: string,
    choosenDate: Date | undefined,
    choosenBron: string,
}


const WeekBlocks = ({ Teacher, userSubs, user, isTeacherAdded, visov}: Props) => {
    const [freeDates, setFreeDates] = useState<TeacherAvailability[]>([]);
    const [choosenBron, setChoosenBron] = useState<ChoosenDate>()

    const fetchTeacherAvailability = useCallback(async () => {
        const data = await getTeacherAviabillityByTeacherID(Teacher.teacherId);
        if (data) {
            console.log(data);
            setFreeDates(data);
        }
    }, [Teacher.teacherId]);

    useEffect(() => {
        fetchTeacherAvailability();
    }, [fetchTeacherAvailability]);

    // Функция для создания массива дат
    const createDateArray = (days: number) => {
        const today = new Date();
        return Array.from({ length: days }, (_, index) => {
            const date = new Date(today);
            date.setDate(today.getDate() + index);
            return date;
        });
    };

    // Создание массива из 21 дня
    const dateArray = createDateArray(21);
  
    // Массив для хранения слотов расписания по дням недели
    const weekSchedule: { [key: number]: string[] } = {};

    const dayOfWeekMapping: { [key in DayOfWeek]: number } = {
        [DayOfWeek.MONDAY]: 1,
        [DayOfWeek.TUESDAY]: 2,
        [DayOfWeek.WEDNESDAY]: 3,
        [DayOfWeek.THURSDAY]: 4,
        [DayOfWeek.FRIDAY]: 5,
        [DayOfWeek.SATURDAY]: 6,
        [DayOfWeek.SUNDAY]: 0,
    };

    // Заполнение слотов для каждого дня
    freeDates.forEach((availability: TeacherAvailability) => {
        const dayIndex = dayOfWeekMapping[availability.day];
        const slots: string[] = availability.timeSlots || [];
        
        // Заполнение weekSchedule
        const datePosition = availability.day === DayOfWeek.SUNDAY 
            ? 6 // В случае, если Sunday (воскресенье) соответствует нулевому индексу.
            : dayIndex - 1; // Приводим к индексу массива

        for (let i = 0; i < 21; i++) {
            const currentDay = new Date(dateArray[i]).getDay();
            if (currentDay === dayIndex) {
                weekSchedule[i] = [...(weekSchedule[i] || []), ...slots]; // Добавляем слоты
            }
        }
    });

    // Форматируем дату для отображения
    const formatDateString = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        return `${day}.${month}`;
    };

    if(!user){
        return
    }

    return (
        <div className="py-4 px-2">  
           <div className="flex flex-col gap-3">
                <div className="text-base font-semibold text-gray-500 flex gap-2 items-center w-full justify-center">
                    <FaClock className="h-6 w-6 p-1 bg-gray-500 text-white rounded-md"/>
                    Выберите свободные часы и запишитесь!
                </div>
                <div className="w-full h-[1px] bg-gray-200"/>
                <p className="font-medium text-gray-400 text-sm">Заявка доступна минимум за 2 часа до занятия! </p>
                <h1 className="flex flex-col text-sm">
                    <span className="flex items-center gap-2 font-medium text-gray-400">
                        Свободные часы: <div className="w-5 h-5 bg-green-200 rounded-md"></div>
                    </span>
                    <span className="flex items-center gap-2 font-medium text-gray-400">
                        Ожидают подтверждения: <div className="w-5 h-5 bg-orange-200 rounded-md"></div>
                    </span>
                    <span className="flex items-center gap-2 font-medium text-gray-400">
                        Недоступные часы: <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
                    </span>
                </h1>
           </div>
           <div className={`transition-opacity duration-300`}>
                <div className="mt-5 grid md:grid-cols-2 gap-2">
                    {dateArray.map((date, index) => (
                        <div key={index} className="flex items-center">
                            <div className="w-[4rem] h-[4rem] relative bg-blue-400 text-white rounded-l-md flex flex-col items-center justify-center text-sm font-light">
                                <FaCalendar  className="absolute top-[0.15rem] left-[0.15rem] text-xs"/>
                                {formatDateString(date)}
                            </div>
                            <ScrollArea className="flex gap-3 w-full h-[4rem] border border-blue-400 rounded-r-md overflow-x-auto">
                                <div className="flex w-max h-[3.7rem] items-center whitespace-nowrap gap-2 pl-2 pr-2">
                                    {weekSchedule[index]?.length > 0 
                                        ? weekSchedule[index].map((data) => (
                                            <Button 
                                                key={data} 
                                                className="flex text-sm font-normal items-center justify-center py-2 px-3 bg-green-50 border border-green-700 hover:bg-green-700 hover:text-white text-green-700 rounded-md relative"
                                                onClick={() => {
                                                    setChoosenBron({
                                                        choosenDate:date,
                                                        choosenBron: data,
                                                        userId: user && user?.id,
                                                        teacherId: Teacher.teacherId
                                                    })
                                                }}
                                            >
                                                <FaClock className="absolute top-0 left-0 text-xs m-[0.075rem] text-green-600 opacity-25"/>
                                                {data}
                                            </Button>
                                        ))
                                        : 
                                        <div className="text-gray-300 text-sm font-light flex items-center">
                                            Нет доступных слотов
                                        </div>
                                    }
                                </div>
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    ))}
                </div>
            </div>
            <ModalBooking 
                day={choosenBron?.choosenDate}
                hour={choosenBron?.choosenBron}
                Teacher={Teacher}
                isTeacherAdded={isTeacherAdded}
                user={user}
                updateDays={visov}
                lessons={userSubs?.LessonsPayd}
            />
        </div>
    );
}

export default WeekBlocks;