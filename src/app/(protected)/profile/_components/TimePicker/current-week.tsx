"use client"

import TimeClock from './time-clock';
import SwiperDatesBlock from './swiperDatesBlock';
import getweeksFronDb from './getweeksFronDb';

import { useEffect, useState } from 'react';
import { DayOfWeek } from '@prisma/client';
import { ClipLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import TimeSlots from './timeSlots';

type Props = {
	week1: any,
	week2: any,
	week3: any,
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
  MONDAY: 'пн',
  TUESDAY: 'вт',
  WEDNESDAY: 'ср',
  THURSDAY: 'чт',
  FRIDAY: 'пт',
  SATURDAY: 'сб',
  SUNDAY: 'вс',
};

const CurrentWeek = () => {

  const [freeDates, setFreeDates] = useState<"Вы не учитель!" | SlotData[] | null>(null);
  const targetDate = new Date()
  const [choosenDate, setChoosenDate] = useState(targetDate)

  useEffect(() => {
    const fetchDates = async() => {
      const dates = await getweeksFronDb()
      if(!dates){
        return
      }
      if(dates)(
        setFreeDates(dates)
      )
    }
    fetchDates()
  }, []);

  if(!freeDates){
    return (
        <div className="w-full h-[100vh] flex items-center justify-center">
            <ClipLoader color="#835BD2" size={100}/>
        </div>
      );
  }

  const formatDateString = (date: any) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

    if(typeof freeDates === 'string'){
        return <div>{freeDates}</div>;
    }

    const week1 = freeDates.slice(0, 7);
    console.log(week1)
    const week2 = freeDates.slice(7, 14);
    const week3 = freeDates.slice(14, 21);

    const days = week1.map((slot, id) => {
      const slotDate = new Date(slot.date);
      const isTargetDate = slotDate.getFullYear() === targetDate.getFullYear()
        && slotDate.getMonth() === targetDate.getMonth()
        && slotDate.getDate() === targetDate.getDate();
  
      return (
        <Button
          onClick={() => setChoosenDate(slot.date)}
          key={id}
          className={`w-[75px] h-[75px] bg-white border border-[#835BD2] rounded-lg flex items-center justify-center relative cursor-pointer transition-all
          ${
            isTargetDate ? 'bg-[#835BD2] text-white hover:bg-[#7552bc]' : 'hover:bg-gray-100'
          }
          ${
            slotDate.toDateString() === choosenDate.toDateString() ? "bg-[#c8affe]": ""
          }
          `}
        >
          <p className={`font-semibold text-sm opacity-20 absolute left-2 top-0 ${isTargetDate ? "text-white opacity-80" : "text-black"}
          `}>{daysOfWeekMap[slot.dayOfWeek] || slot.dayOfWeek}</p>
          <h1 className={`text-[#835BD2] text-lg ${isTargetDate ? "text-white" : ""}`}>{formatDateString(slot.date)}</h1>
        </Button>
      );
    });
    const days2 = week2.map((slot, id) => {
      const slotDate = new Date(slot.date);

      return(
        <Button key={id} 
          onClick={() => setChoosenDate(slot.date)}
          className={`w-[75px] bg-white h-[75px] border border-[#835BD2] rounded-lg flex items-center justify-center relative cursor-pointer transition-all hover:bg-gray-100
            ${
              slotDate.toDateString() === choosenDate.toDateString() ? "bg-[#c8affe]": ""
            }
          `}
        >
         <p className='font-semibold text-black text-sm opacity-20 absolute left-2 top-0'>{daysOfWeekMap[slot.dayOfWeek] || slot.dayOfWeek}</p>
         <h1 className='font-normal text-[#835BD2] text-lg'>{formatDateString(slot.date)}</h1>
      </Button>
      )
    });
    const days3 = week3.map((slot, id) => {
      const slotDate = new Date(slot.date);

      return(
        <Button key={id} 
          onClick={() => setChoosenDate(slot.date)}
          className={`w-[75px] bg-white h-[75px] border border-[#835BD2] rounded-lg flex items-center justify-center relative cursor-pointer transition-all hover:bg-gray-100
            ${
              slotDate.toDateString() === choosenDate.toDateString() ? "bg-[#c8affe]": ""
            }
          `}
        >
         <p className='font-semibold text-black text-sm opacity-20 absolute left-2 top-0'>{daysOfWeekMap[slot.dayOfWeek] || slot.dayOfWeek}</p>
         <h1 className='font-normal text-[#835BD2] text-lg'>{formatDateString(slot.date)}</h1>
      </Button>
      )
    });

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
              Выберете день недели, чтобы изменить промежуток, 
              <br /> можете добавить или убрать часы, 
              <span className='font-bold'>
                занятые часы изменить нельзя!
              </span>
            </h1>
          </div>
          <SwiperDatesBlock 
            week1={days}
            week2={days2}
            week3={days3}
          />
        </div>
      </div>
      <div className='bg-white mt-5 rounded-lg shadow-lg p-5'>
        <h1 className='text-2xl font-semibold text-gray-600'>Мое расписание:</h1>
        <TimeSlots 
        choosenDate={choosenDate.toString()}
        />
      </div>
    </div>
  );
}

export default CurrentWeek;