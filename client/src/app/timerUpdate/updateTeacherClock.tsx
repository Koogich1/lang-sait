'use client';

import React, { useState, useEffect } from 'react';
import dayToArchive from './actions/schreduleDay/dayToArchive';

const TimerTeacher = () => {
  const [lastArchivedHour, setLastArchivedHour] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      // Проверяем, если текущая минута - 1 и час изменился
      if (currentMinute === 1 && currentHour !== lastArchivedHour) {
        dayToArchive(); // Вызов функции архивации
        setLastArchivedHour(currentHour); // Обновляем последний обработанный час
      }
    }, 60 * 1000); // Проверяем каждую минуту

    return () => clearInterval(interval); // Очищаем интервал при размонтировании компонента
  }, [lastArchivedHour]);

  return (
    <>
      {/* Содержимое компонента (если нужно) */}
    </>
  );
};

export default TimerTeacher;
