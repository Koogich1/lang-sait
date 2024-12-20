"use client"

import TimeClock from './time-clock';
import SwiperDatesBlock from './swiperDatesBlock';
import { useEffect, useState } from 'react';
import { DayOfWeek, TeacherAvailability } from '@prisma/client';
import TimeSlots from './timeSlots';

type Props = {
  freeDates: TeacherAvailability[] | null;
}

const CurrentWeek = ({ freeDates }: Props) => {
  const targetDate = new Date();
  const [choosenDate, setChoosenDate] = useState(targetDate);

  // Проверка, если freeDates не загружены
  if (!freeDates) {
    return <div>Loading...</div>;
  }

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
  const weekSchedule: string[][] = Array.from({ length: 21 }, () => []);

  // Сопоставление значений enum с индексами, возвращаемыми getDay()
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

    // Найдем правильный день, чтобы заполнить weekSchedule
    const datePosition = dateArray.findIndex(date => date.getDay() === dayIndex);

    if (datePosition !== -1) {
      weekSchedule[datePosition] = slots; // Заполняем соответствующий день
    }
  });

  // Форматируем дату для отображения
  const formatDateString = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  return (
    <div className='w-full'>
      <div className='flex w-full items-center relative justify-around bg-white rounded-lg shadow-lg'>
        <TimeClock />
        <div className='flex flex-col w-full relative'>
          <div className='flex flex-col items-center justify-center'>  
            <h1 className='font-bold text-2xl text-gray-600'>
              Длительность урока <span className='text-[#9170D3]'>1 час</span>
            </h1>
            <h1 className='text-center pt-3 opacity-60'>
              Выберите день недели, чтобы изменить промежуток, 
              <br /> можете добавить или убрать часы,
              <span> </span>
              <span className='font-bold'>
                занятые часы изменить нельзя!
              </span>
            </h1>
          </div>

          {/* Отобразим расписание для каждого дня */}
          {dateArray.map((date, index) => (
            <div key={index}>
              <div>{formatDateString(date)}:</div>
              <div>
                {weekSchedule[index].length > 0 
                  ? weekSchedule[index].join(', ')  // Если есть слоты, отображаем их
                  : 'Нет доступных слотов'}  // Если нет слотов, отображаем сообщение
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-white mt-5 rounded-lg shadow-lg p-5'>
        <h1 className='text-2xl font-semibold text-gray-500'>Мое расписание:</h1>
        <TimeSlots 
          choosenDate={choosenDate.toString()}
          //slots={weekSchedule}  // Передаем слоты в TimeSlots
        />
      </div>
    </div>
  );
}

export default CurrentWeek;
