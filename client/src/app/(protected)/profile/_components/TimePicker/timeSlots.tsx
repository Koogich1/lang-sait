"use client"

import getweeksFronDb from './getweeksFronDb';

import { useCallback, useEffect, useState } from 'react';
import { DayOfWeek } from '@prisma/client';
import { ClipLoader } from 'react-spinners';


type Props = {
	choosenDate: string;
}

interface SlotData {
  id: string;
  teacherId: string;
  date: Date;
  dayOfWeek: DayOfWeek;
  timeSlots: string[];
  archived: boolean;
}

const daysOfWeekMap = {
  MONDAY: 'Понедельник',
  TUESDAY: 'Вторник',
  WEDNESDAY: 'Среда',
  THURSDAY: 'Четверг',
  FRIDAY: 'Пятница',
  SATURDAY: 'Суббота',
  SUNDAY: 'Воскресенье',
};

interface SlotData {
  id: string;
  teacherId: string;
  date: Date;
  dayOfWeek: DayOfWeek;
  timeSlots: string[];
  studentBookingStatus: string;
}

const TimeSlots = ({choosenDate}: Props) => {

  const [freeDates, setFreeDates] = useState<"Вы не учитель!" | SlotData[] | null>(null);
	const [chosenSlot, setChosenSlot] = useState<SlotData | null>(null);

	useEffect(() => {
    const fetchDates = async () => {
      const dates = await getweeksFronDb();
      if (!dates || dates === "Вы не учитель!") { // Проверяем на наличие "Вы не учитель!"
        setFreeDates("Вы не учитель!"); // Устанавливаем строку в состояние
      } else {
        // Здесь можно убедиться, что возвращенные данные имеют правильный тип, прежде чем устанавливать их в состояние
        setFreeDates(dates as SlotData[]); // Устанавливаем массив слотов в состояние
      }
    };
  
    fetchDates();
  }, []);

  const findChosenSlot = useCallback(() => {
    const chosenDate = new Date(choosenDate);

    if (freeDates === "Вы не учитель!" || !chosenDate) {
      return;
    }

		if(freeDates === null) {
			return;
		}

    const selectedSlot = freeDates.find((slot) => {
      const slotDate = new Date(slot.date);

      return (
        slotDate.getDate() === chosenDate.getDate() &&
        slotDate.getMonth() === chosenDate.getMonth() &&
        slotDate.getFullYear() === chosenDate.getFullYear()
      );
    });

    setChosenSlot(selectedSlot || null);
  }, [choosenDate, freeDates]);

  useEffect(() => {
    findChosenSlot();
  }, [choosenDate, freeDates, findChosenSlot]);

  if(!freeDates){
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <ClipLoader color="#835BD2" size={100}/>
        </div>
      );
  }

	const formatDate = (dateString:any) => {
		const dateObj = new Date(dateString);
		const day = dateObj.getDate();
		const monthIndex = dateObj.getMonth();
		const year = dateObj.getFullYear();
	
		const months = [
			'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
			'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
		];
	
		return `${day} ${months[monthIndex]}`;
	};

	return(
		<div className='relative mt-1'>
			<h1 className='text-xl font-semibold text-[#835BD2]'>{chosenSlot && chosenSlot.dayOfWeek && daysOfWeekMap[chosenSlot.dayOfWeek]}, {chosenSlot && formatDate(chosenSlot.date)}</h1>
      {chosenSlot ? (
        <div className='text-gray-400'>
          <ul className='mt-7'>
						{chosenSlot.timeSlots.map((slot, id) => (
							<li key={id}
								className='w-full h-[100px] border-t py-1'
							>
								<h1 className='font-semibold text-gray-400 text-lg flex gap-1 items-center'><p className=''>Начало слота:</p><p className='text-[#835BD2] font-normal'>{slot}</p></h1>
                <p className='text-xs'>Статус: </p>
							</li>
						))}
					</ul>
        </div>
      ) : (
        <p>Данные для выбранной даты не найдены.</p>
      )}
    </div>
	)

    
}

export default TimeSlots;