"use client"

import React, { useState, useEffect } from 'react';
import getCurrentFreeDates from './current-week-free-hours';
import { TimeSlotStatus } from '@prisma/client';
import moment from "moment";
import { Button } from '@/components/ui/button';
import { ClipLoader } from 'react-spinners';
import { HiPlus } from 'react-icons/hi2';

type TimeSlot = {
  id: string;
  start: string;
  end: string;
  status: TimeSlotStatus;
  date: string; // Добавьте поле date
  studentId: string | null;
  teacherAvailabilityId: string | null;
};


type Result = {
  error: string | undefined;
  freeSlots: TimeSlot[] | undefined;
  nonWorkingSlots: TimeSlot[] | undefined;
};

type Props = {
	dayOfWeek: string,
}

const FreeSlotsComponent: React.FC<Props> = ({dayOfWeek}: Props) => {
  const [freeSlots, setFreeSlots] = useState<TimeSlot[]>([]);
  const [nonWorkingSlots, setNonWorkingSlots] = useState<TimeSlot[]>([]);
  const [occupiedSlots, setOccupiedSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(true);

  const x = [1, 2, 3, 4, 5]

  useEffect(() => {
    const fetchFreeSlots = async () => {
      try {
        const result = await getCurrentFreeDates(dayOfWeek);
        if (result.error) {
          console.error(result.error);
        } else {
          if (result.freeSlots) {
            setFreeSlots(result.freeSlots as unknown as TimeSlot[]); 
          }
          if (result.nonWorkingSlots) {
            setNonWorkingSlots(result.nonWorkingSlots as unknown as TimeSlot[]);
          }
          if (result.occupiedSlots){
            setOccupiedSlots(result.occupiedSlots as unknown as TimeSlot[])
          }
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchFreeSlots();
  }, []);

  if (loading) {
    return( 
      <div className="w-full mt-20 flex items-center justify-center">
        <ClipLoader color="#835BD2" size={100}/>
      </div>
    )
    ;
  }
  freeSlots.sort((slot1, slot2) => (slot1.start > slot2.start ? 1 : -1));
  nonWorkingSlots.sort((slot1, slot2) => (slot1.start > slot2.start ? 1 : -1));
  occupiedSlots.sort((slot1, slot2) => (slot1.start > slot2.start ? 1 : -1))


  if (freeSlots.length === 0 && nonWorkingSlots.length === 0) {
    return (
      <div>
        Сегодня нет свободных часов
      </div>
    )
  }

  return (
    <div>
      <div className='w-full h-[200px] bg-white p-5 my-5 relative shadow-lg rounded-xl flex items-center justify-center text-2xl text-gray-600 font-bold'>
        <h1>
         Свободные часы в {/*ТУТ ДЕНЬ НЕДЕЛИ ВСТАВИТЬ*/dayOfWeek}
        </h1>
        <div>
          <Button variant='violetSelect' className='font-semibold text-lg absolute right-5 top-5'>
            Изменить расписание
          </Button>
        </div>
      </div>
      <ul className='grid grid-cols-2 lg:grid-cols-3 gap-3 text-gray-600'>
        {freeSlots.map((slot) => (
          <li key={slot.id} className='w-full flex justify-between items-start min-h-[190px] bg-white shadow-lg p-5 rounded-xl'>
            <div className='flex items-center justify-start text-xl font-semibold'>
              <h1>
                {slot.start}
              </h1> 
              - 
              <h1>
                {slot.end}
              </h1>
            </div>
            <div className='flex flex-col justify-between h-full'>
              {slot.status === "FREE" && (
                <div className='text-base font-semibold text-green-400 border-[2px] bg-green-100 border-green-400 rounded-sm p-2'>
                  Свободный
                </div>
              )}
              {slot.status === "FREE" && (
                <Button className='text-base font-semibold' variant='violetSelect'>
                  Записать
                </Button>
              )}
              {slot.status === "OCCUPIED" && (
                <Button className='text-base font-semibold' variant='violetSelect'>
                  Записать
                </Button>
              )}
            </div>
          </li>
        ))}
        <Button className='w-full flex justify-between items-star relative min-h-[190px] flex-col border-[3px] border-white bg-gray-200 shadow-lg p-5 rounded-xl' variant='shadow2'>
          <h1 className='w-full text-center text-xl font-bold text-gray-600 absolute top-5'>
            Добавить слот
          </h1>
          <div className='absolute w-full h-full flex justify-center items-center top-0'>
            <div className='text-4xl bg-white rounded-full p-2 text-gray-300'>
              <HiPlus />
            </div>
          </div>
        </Button>
      </ul>
      <div className='w-full h-[200px] bg-white p-5 my-5 relative shadow-lg rounded-xl flex items-center justify-center text-2xl text-gray-600 font-bold'>
        <h1>
          Занятые слоты в {/*ТУТ ДЕНЬ НЕДЕЛИ ВСТАВИТЬ*/dayOfWeek}
        </h1>
        <div>
          <Button variant='violetSelect' className='font-semibold text-lg absolute right-5 top-5'>
            Изменить расписание
          </Button>
        </div>
      </div>
      <ul className='grid grid-cols-2 lg:grid-cols-3 gap-3 text-gray-600'>
        {occupiedSlots.map((slot) => (
          <li key={slot.id} className='w-full flex justify-between items-start min-h-[190px] bg-white shadow-lg p-5 rounded-xl'>
          <div className='flex items-center justify-start text-xl font-semibold'>
            <h1>
              {slot.start}
            </h1> 
            - 
            <h1>
              {slot.end}
            </h1>
          </div>
          <div className='flex flex-col justify-between h-full'>
            <div className='text-base text-center font-semibold text-red-400 border-[2px] bg-red-100 border-red-400 rounded-sm p-2'>
              Занятый
            </div>
            <Button className='text-base font-semibold' variant='violetSelect'>
              Отменить
            </Button>
          </div>
        </li>
        ))}
        <Button className='w-full flex justify-between items-star relative min-h-[190px] flex-col border-[3px] border-white bg-gray-200 shadow-lg p-5 rounded-xl' variant='shadow2'>
          <h1 className='w-full text-center text-xl font-bold text-gray-600 absolute top-5'>
            Добавить слот
          </h1>
          <div className='absolute w-full h-full flex justify-center items-center top-0'>
            <div className='text-4xl bg-white rounded-full p-2 text-gray-300'>
              <HiPlus />
            </div>
          </div>
        </Button>
      </ul>
      <h2>Non-working Slots</h2>
      <ul>
        {nonWorkingSlots.map((slot) => (
          <li key={slot.id}>
            {slot.start} - {slot.end}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreeSlotsComponent;