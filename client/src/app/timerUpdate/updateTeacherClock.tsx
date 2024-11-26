'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import dayToArchive from './actions/schreduleDay/dayToArchive';

const TimerTeacher = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [lastArchivedTime, setLastArchivedTime] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();
      const currentMinute = currentDate.getMinutes();

      // Проверяем, наступил ли новый час и функция еще не была вызвана в этом часу

        setShowDialog(true);
        dayToArchive(); // Ваша функция для обновления данных
        setLastArchivedTime(currentHour);
    }, 60 * 60 * 1000); // Проверяем каждую минуту

    return () => clearInterval(interval);
  }, [lastArchivedTime]);

  return (
    <>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          Дата обновлена
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimerTeacher;
