"use client";

import getTeacherAviabillityByTeacherID from "@/actions/getTeacherAviabillityByTeacherID";
import ModalBooking from "@/app/(protected)/learning/components/modal/ModalBooking";
import { bookedEtaps, DayOfWeek, User, UserSubscriptions } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { date } from "zod";

type AllSchedule = {
    id: string; 
    teacherId: string;
    date: Date; 
    dayOfWeek: DayOfWeek; 
    timeSlots: { 
        time: string; 
        status: bookedEtaps; 
    }[]; 
    studentBookings: { 
        id: string; 
        studentId: string; 
        teacherScheduleDayId: string; 
        timeSlot: string; 
        status: bookedEtaps; 
    }[];
}


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

const formatDate = (date: Date) => {
    const formattedDate = `${addLeadingZero(date.getDate())}:${addLeadingZero(date.getMonth() + 1)}`;
    return formattedDate;
};

const getDayOfWeek = (day: number) => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[day];
};

const addLeadingZero = (num: number) => {
    return num < 10 ? `0${num}` : num;
};

const WeekBlocks = ({ Teacher, userSubs, user, isTeacherAdded, visov}: Props) => {
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState<AllSchedule[] | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 7; // Показывать по 7 дней за раз
    const [isTransitioning, setIsTransitioning] = useState(false);

    const currentTime = new Date();
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

    const fetchDays = useCallback(async () => {
        const days = await getTeacherAviabillityByTeacherID(Teacher.teacherId);
        if (days) {
            setDays(days);
            setLoading(false);
        }
    }, [Teacher.teacherId]); // Добавляем зависимость

    const updateDays = () => {
        setLoading(true)
        fetchDays();
        visov()
        setLoading(false)
    }

    useEffect(() => {
        fetchDays();
    }, [fetchDays]);


    const isToday = (date: Date) => {
        const today = new Date();
        return date.getFullYear() === today.getFullYear() && 
               date.getMonth() === today.getMonth() && 
               date.getDate() === today.getDate();
    };

    const filterAvailableTimeSlots = (timeSlots: { time: string; status: bookedEtaps; }[], dayDate: Date) => {
        // Если это сегодняшний день, фильтруем по текущему времени
        if (isToday(dayDate)) {
            return timeSlots.filter(slot => {
                const [hour, minute] = slot.time.split(':').map(Number);
                // Скрывать слоты, которые меньше текущего времени
                return !(hour < currentHours || (hour === currentHours && minute <= currentMinutes));
            });
        }
        // Если это не текущий день, возвращаем все слоты как есть
        return timeSlots;
    };
    

    const isSlotDisabled = (slotTime: string, dayDate: Date) => {
        if (isToday(dayDate)) {
            const [slotHour, slotMinute] = slotTime.split(':').map(Number);
    
            // Получаем текущее время
            const currentTime = new Date();
            
            // Устанавливаем текущее время в минутах (в миллисекундах)
            const currentTimeInMs = currentTime.getTime();
            const slotTimeInMs = new Date(dayDate);
            slotTimeInMs.setHours(slotHour, slotMinute, 0, 0);
    
            // Добавляем 2 часа (2 * 60 * 60 * 1000) к текущему времени
            const twoHoursLater = new Date(currentTimeInMs + 2 * 60 * 60 * 1000);
    
            return slotTimeInMs.getTime() < twoHoursLater.getTime();
        }
        // Если это не сегодняшний день, слот доступен
        return false;
    };


    const handleNext = () => {
        if (currentPage < Math.ceil(days!.length / itemsPerPage) - 1) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsTransitioning(false);
            }, 300); // Длительность анимации
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentPage(currentPage - 1);
                setIsTransitioning(false);
            }, 300); // Длительность анимации
        }
    };


    if (!days) {
        return null;
    }

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] bg-white shadow-lg rounded-lg items-center justify-center">
                <ClipLoader color="#835BD2" size={100} />
            </div>
        )
    }

    const totalPages = Math.ceil(days.length / itemsPerPage); // Всегда будет 3
    const paginatedDays = days.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const getStatusColor = (status: any) => {
			switch (status) {
					case "free":
							return "bg-green-50 text-green-500 border-green-400";
					case "waitingAccess":
							return "bg-orange-50 text-orange-300 border-orange-300";
					case "booked":
							return "bg-red-100 text-red-700 border-red-700";
					default:
							return "";
			}
	};

    return (
        <div className="py-4 px-2">  
           <div className="flex flex-col gap-3">
                <h1 className="text-xl font-semibold text-[#835BD2]">
                    Выберите свободные часы и запишитесь!
                </h1>
                <p className="font-medium text-gray-400">Запись доступна минимум за 2 часа до занятия! </p>
                <h1 className="flex flex-col">
                    <span className="flex items-center gap-2 font-medium text-base text-gray-400">
                        Свободные часы: <div className="w-5 h-5 bg-green-200 rounded-md"></div>
                    </span>
                    <span className="flex items-center gap-2 font-medium text-base text-gray-400">
                        Ожидают подтверждения: <div className="w-5 h-5 bg-orange-200 rounded-md"></div>
                    </span>
                    <span className="flex items-center gap-2 font-medium text-base text-gray-400">
                        Занятые часы: <div className="w-5 h-5 bg-red-200 rounded-md"></div>
                    </span>
                    <span className="flex items-center gap-2 font-medium text-base text-gray-400">
                        Недоступные часы: <div className="w-5 h-5 bg-gray-200 rounded-md"></div>
                    </span>
                </h1>
           </div>
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                <div className="mt-5 flex flex-col gap-1">
                    {paginatedDays.map((day, index) => (
                        <div className="w-full border border-gray-100 rounded-lg flex" key={index}>
                            <div className="relative w-20 h-20 bg-[#835BD2] flex justify-center items-center rounded-lg select-none">
                                <div className="absolute top-0 right-0 text-sm text-white m-1">
                                    {getDayOfWeek(day.date.getDay())}
                                </div>
                                <div className="text-base font-bold text-white">
                                    {formatDate(day.date)}
                                </div>
                            </div>
                            <ScrollArea className="w-full h-20 whitespace-nowrap flex items-center pt-3 mx-3">
                                <div className="flex gap-3 items-center">
                                {filterAvailableTimeSlots(day.timeSlots, day.date).map((hour, id) => (
                                    <div
                                        key={id}
                                        className={`h-[55px] relative w-[110px] flex items-center cursor-pointer justify-center text-[#835BD2] font-base border border-[#835BD2] rounded-lg hover:bg-green-600 hover:border-green-600 hover:text-white transition-all ${getStatusColor(hour.status)}`}
                                    >
                                        <h1>{hour.time}</h1>
                                        <ModalBooking 
                                        day={day.date} 
                                        hour={hour.time} 
                                        dayId={day.id} 
                                        status={hour.status} 
                                        Teacher={Teacher} 
                                        lessons={userSubs ? userSubs.LessonsPayd : 0} 
                                        updateDays={updateDays}
                                        user={user}
                                        isTeacherAdded={isTeacherAdded}
                                        />
                                        </div>
                                    ))}
                                </div> 
                                <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-between mt-4">
                <Button 
                    onClick={handlePrevious} 
                    disabled={currentPage === 0} 
                    className="px-4 py-2 rounded disabled:opacity-50 transition"
                    variant={"violetSelect"}
                >
                    Назад
                </Button>
                <Button 
                    onClick={handleNext} 
                    disabled={currentPage === totalPages - 1} 
                    variant={"violetSelect"}
                    className="px-4 py-2 rounded disabled:opacity-50 transition"
                >
                    Вперед
                </Button>
            </div>
        </div>
    );
}

export default WeekBlocks;