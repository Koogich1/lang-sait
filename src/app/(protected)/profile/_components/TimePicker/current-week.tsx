"use client"

import { Button } from '@/components/ui/button';
import moment from 'moment';
import 'moment/locale/ru';
import DayOfWeekChoose from "../modal/day-of-week-choose"
import { useState } from 'react';

moment.locale('ru');

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const CurrentWeek = () => {
  const startOfWeek = moment().startOf('isoWeek');
  const [open, setOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<moment.Moment | null>(null);; 

  const handleOpen = (day: moment.Moment) => {
    setSelectedDay(day);
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const daysOfWeek = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = moment(startOfWeek).add(i, 'days');
    const isActive = currentDate.isSame(moment(), 'day');
    const dayOfWeek = capitalizeFirstLetter(currentDate.format('dd'));

    daysOfWeek.push(
      <Button
        key={i}
        style={{ backgroundColor: isActive ? '#9170D3' : ''}}
        className={(`font-bold flex hover:bg-[#f4efff] shadow-lg hover:shadow-none flex-col relative bg-white justify-center items-center w-[90px] h-[90px] rounded-xl border border-[#9170D3] text-${isActive ? "white" : "black"}`)}
        onClick={() => handleOpen(currentDate)} // Pass current date to handleOpen
      >
        <h3 className='text-xl'>{dayOfWeek}</h3>
        <p className={(`opacity-${isActive ? "100" : "50"} text-xs font-normal absolute top-1 right-1`)}>{currentDate.format('DD.MM')}</p>
      </Button>
    );
  }

  return (
    <div className='w-[70%] flex flex-col justify-around items-center bg-white p-5 pt-[45px] text-gray-600 shadow-lg rounded-xl'>
      <h1 className='font-bold text-2xl'>
        Длительность урока <span className='text-[#9170D3]'>1 час</span>
      </h1>
      <h1 className='text-center pt-3 opacity-60'>
        Выберете день недели, чтобы изменить промежуток, 
        <br /> можете добавить или убрать часы, 
        <span className='font-bold'>
          занятые часы изменить нельзя!
        </span>
      </h1>
      <div className='flex justify-center items-center w-full h-full gap-4'>
        {daysOfWeek}
      </div>
      <DayOfWeekChoose 
			open={open} 
			day={selectedDay?.format('DD.MM')} 
			weekDay={selectedDay?.format('dddd')} 
			onClose={handleClose} />
    </div>
  );
}

export default CurrentWeek;