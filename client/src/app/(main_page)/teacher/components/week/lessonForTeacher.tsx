'use client'

import { useEffect, useState } from "react";
import { StudentBooking, User, UserSubscriptions } from "@prisma/client";
import { motion, useAnimation } from "framer-motion"; 
import { FaArrowRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

type Teacher = {
  id: string;
  teacherId: string;
  videoSrc: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
    images: string[];
    languages: {
      language: string;
      level: string;
      prefers: string;
    }[];
    lessonPrise: number;
  };
};

type Props = {
  Teacher: Teacher;
  user: User | null;
  userSubs: UserSubscriptions | undefined;
  booking: StudentBooking[] | null;
};

const formatDateToFullMonth = (dateString: any) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  const monthIndex = date.getMonth();
  const month = months[monthIndex];

  return `${day} ${month}`;
};

const LessonForTeacher = ({ Teacher, user, userSubs, booking }: Props) => {
  const [currentBookingIndex, setCurrentBookingIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (booking && booking.length > 0) {
      controls.start({ opacity: 1 });
    }
  }, [booking, controls]);

  if (!user || !booking || booking.length === 0) {
    return null;
  }

  const formatTimeSlot = (timeSlot: string) => {
    const [startTime, endTime] = timeSlot.split('-');
    return (
      <div className="flex gap-2 items-center text-lg font-medium text-gray-400">
        <div className="text-white flex items-center justify-center py-1 px-3 cursor-pointer bg-blue-400 hover:bg-blue-500 transition-all rounded-lg">{startTime}</div>
          <FaArrowRight />
        <div className="text-white flex cursor-pointer items-center justify-center py-1 px-3 bg-blue-400 hover:bg-blue-500 transition-all rounded-lg">{endTime}</div>
      </div>
    );
  };

  const handleNext = () => {
    controls.start({ opacity: 0, transition: { duration: 0.3 } }).then(() => {
      setCurrentBookingIndex((prevIndex) => (prevIndex + 1) % booking.length);
      controls.start({ opacity: 1, transition: { duration: 0.3 } });
    });
  };

  const handlePrevious = () => {
    controls.start({ opacity: 0, transition: { duration: 0.3 } }).then(() => {
      setCurrentBookingIndex((prevIndex) => (prevIndex - 1 + booking.length) % booking.length);
      controls.start({ opacity: 1, transition: { duration: 0.3 } });
    });
  };

  const currentBooking = booking[currentBookingIndex];

  return (
    <div className="px-2 py-3 flex flex-col justify-between h-[165px]">
      <div className="text-xl flex justify-between text-[#835BD2] font-semibold">
        <h1>{currentBookingIndex === 0 ? "Ближайшее занятие:" : "Следующее занятие:"}</h1>
        <div className="flex gap-2 items-center">
          <div className="px-3 py-1 bg-[#835BD2] text-base rounded-lg cursor-pointer transition-all hover:bg-[#704eb5] text-white font-medium">
            Сегодня:{" " + formatDateToFullMonth(new Date())}
          </div>
        </div>
      </div>
      <motion.div animate={controls} initial={{ opacity: 0 }} className="flex items-center justify-center">
        <div className="flex gap-2 items-center border border-gray-100 shadow-md py-3 px-4 rounded-lg justify-center w-1/2">
          {currentBooking && (
            <>
              <div className="px-3 py-1 bg-[#835BD2] text-xl rounded-lg cursor-pointer transition-all hover:bg-[#704eb5] text-white font-medium">
                {formatDateToFullMonth(currentBooking.date.toJSON())}
              </div>
              <div>
                {formatTimeSlot(currentBooking.timeSlot)}
              </div>
            </>
          )}
        </div>
      </motion.div>
      {booking.length > 1 && (
        <div className="flex justify-between mt-2">
          <Button className="px-3 py-1 bg-blue-400 hover:bg-blue-500" onClick={handlePrevious} variant={"violetSelect"}
            disabled={currentBookingIndex === 0}
          >
            Предыдущеe
          </Button>
          <Button className="px-3 py-1 bg-blue-400 hover:bg-blue-500" onClick={handleNext} variant={"violetSelect"}
            disabled={currentBookingIndex === booking.length - 1}
          >
            Следующее
          </Button>
        </div>
      )}
    </div>
  );
};

export default LessonForTeacher;
