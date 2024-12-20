"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaRegTrashCan } from "react-icons/fa6";
import saveTeacherAvailability from "../AllTimeLineCreate";
import { FaRegCalendarCheck } from "react-icons/fa";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ClipLoader } from "react-spinners";


const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

type TimeSlot = [string, string];
type TimeSlotsData = {
  pn: TimeSlot[];
  vt: TimeSlot[];
  sr: TimeSlot[];
  ct: TimeSlot[];
  pt: TimeSlot[];
  sb: TimeSlot[];
  vs: TimeSlot[];
};

type Props = {
  visov: () => void
}


export const FirstTimeInputForm = ({visov}: Props) => {
  const [active, setActive] = useState<string>("pn");
  const [timeSlots, setTimeSlots] = useState<{ [key: string]: TimeSlot[] }>({
    pn: [],
    vt: [],
    sr: [],
    ct: [],
    pt: [],
    sb: [],
    vs: [],
  });
  const [wiew, setWiew] = useState(false);
  
  const [isWeekend, setIsWeekend] = useState<{ [key: string]: boolean }>({
    pn: false,
    vt: false,
    sr: false,
    ct: false,
    pt: false,
    sb: false,
    vs: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [redact, setRedact] = useState(false);
  const [loading, setLoading] = useState(false)

  const addTimeSlot = (day: string, startTime: string, endTime: string) => {
    const newSlots:any = [];
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = timeToMinutes(endTime);

    // Create hourly slots from startTime to endTime
    for (let time = startMinutes; time < endMinutes; time += 60) {
      const slotStart = `${String(Math.floor(time / 60)).padStart(2, '0')}:${String(time % 60).padStart(2, '0')}`;
      const slotEnd = `${String(Math.floor((time + 60) / 60)).padStart(2, '0')}:${String((time + 60) % 60).padStart(2, '0')}`;
      newSlots.push([slotStart, slotEnd]);
    }

    setTimeSlots((prev) => ({
      ...prev,
      [day]: [...prev[day], ...newSlots],
    }));
  };

  const handleTimeChange = (day: string, index: number, timeIndex: number, value: string) => {
    const updatedSlots = [...timeSlots[day]];
    updatedSlots[index][timeIndex] = value;
    setTimeSlots((prev) => ({
      ...prev,
      [day]: updatedSlots,
    }));
  };

  const removeTimeSlot = (day: string, index: number) => {
    const updatedSlots = timeSlots[day].filter((_, i) => i !== index);
    setTimeSlots((prev) => ({
      ...prev,
      [day]: updatedSlots,
    }));
  };

  const validateTimeSlots = (day: string) => {
    const slots = timeSlots[day];
    let hasError = false;
    setError(null);
  
    const occupiedSlots = slots.map(slot => ({
      start: slot[0],
      end: slot[1],
    }));
  
    for (const slot of occupiedSlots) {
      if (slot.start === slot.end) {
        hasError = true;
        setError("Промежутки времени не могут быть равными.");
        break;
      }
      
      if (timeToMinutes(slot.start) >= timeToMinutes(slot.end)) {
        hasError = true;
        setError("Время окончания должно быть позже времени начала.");
        break;
      }
    }
  
    for (let i = 0; i < occupiedSlots.length; i++) {
      const currentSlot = occupiedSlots[i];
      for (let j = i + 1; j < occupiedSlots.length; j++) {
        const compareSlot = occupiedSlots[j];
        if (
          timeToMinutes(currentSlot.start) < timeToMinutes(compareSlot.end) && 
          timeToMinutes(currentSlot.end) > timeToMinutes(compareSlot.start)
        ) {
          hasError = true;
          setError("Промежутки времени перекрываются.");
          break;
        }
      }
      if (hasError) break;
    }
  
    return !hasError;
  };

  const handleNextDay = () => {
    if (!isWeekend[active] && timeSlots[active].length === 0) {
      setError("Вы не можете перейти к следующему дню без временных слотов, если день не выходной.");
      return;
    }
    
    if (validateTimeSlots(active)) {
      const nextDayIndex = ["pn", "vt", "sr", "ct", "pt", "sb", "vs"].indexOf(active) + 1;
      if (nextDayIndex < 7) {
        setActive(["pn", "vt", "sr", "ct", "pt", "sb", "vs"][nextDayIndex]);
      }
    }
  };

  const handlePreviousDay = () => {
    if (validateTimeSlots(active)) {
      const prevDayIndex = ["pn", "vt", "sr", "ct", "pt", "sb", "vs"].indexOf(active) - 1;
      if (prevDayIndex >= 0) {
        setActive(["pn", "vt", "sr", "ct", "pt", "sb", "vs"][prevDayIndex]);
      }
    }
  };

  const toggleWeekend = () => {
    setIsWeekend((prev) => ({
      ...prev,
      [active]: !prev[active],
    }));
  };

  const submit = async () => {
    const formattedTimeSlots: TimeSlotsData = {
      pn: timeSlots.pn as TimeSlot[],
      vt: timeSlots.vt as TimeSlot[],
      sr: timeSlots.sr as TimeSlot[],
      ct: timeSlots.ct as TimeSlot[],
      pt: timeSlots.pt as TimeSlot[],
      sb: timeSlots.sb as TimeSlot[],
      vs: timeSlots.vs as TimeSlot[],
    };

    await saveTeacherAvailability(formattedTimeSlots);
  };

  if(loading){
    return(
      <Dialog open={loading}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Загрузка данных в базу данных...</DialogTitle>
            <DialogDescription>
              <ClipLoader />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <div className="flex flex-col justify-between">
      {wiew ? 
      <div>
        <h1 className="text-3xl text-[#835BD2] font-light">Расписание на неделю</h1>
        <div className="grid grid-cols-4 gap-3 mt-5">
          {Object.entries(timeSlots).map(([day, slots]) => (
            <div key={day} className="flex justify-between flex-col gap-2 border border-gray-200 rounded-xl p-2">
              <h2 className="text-lg font-semibold text-[#835BD2]">
                {
                  day === "pn" ? "Понедельник" :
                  day === "vt" ? "Вторник" :
                  day === "sr" ? "Среда" :
                  day === "ct" ? "Четверг" :
                  day === "pt" ? "Пятница" :
                  day === "sb" ? "Суббота" :
                  day === "vs" ? "Воскресенье" : ""
                }
              </h2>
              {slots.length === 0 ? (
                <div className="pb-3">
                  <p className="text-[#4B7564] text-lg font-light">Выходной</p>
                  <p className="text-3xl">🎉</p>
                </div>
              ) : (
                <ul className="w-full flex flex-col items-center my-2 gap-1 justify-center text-sm">
                  {slots.map((slot, index) => (
                    <li key={index}>
                      <div className="flex gap-1 items-center text-[#4B7564]">
                        <div className="bg-[#c5eadc] w-[60px] py-[0.125rem] border border-[#4B7564] rounded-lg">
                          {slot[0]}
                        </div> 
                        до 
                        <div className="bg-[#c5eadc] w-[60px] py-[0.125rem] border border-[#4B7564] rounded-lg">
                          {slot[1]}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Button 
                className="font-medium" 
                variant={"shadow2"}
                onClick={() => {
                    setRedact(true);
                    setActive(day);
                    setWiew(false);
                }}
              >
                Изменить
              </Button>
            </div>
          ))}
          <div className="flex flex-col gap-1 items-center justify-between border border-gray-200 p-1 rounded-xl">
            <div className="w-full h-full flex items-center justify-center">
              <FaRegCalendarCheck className="w-12 h-12" />
            </div>
            <div className="flex flex-col gap-1">
              <Button 
                variant={"shadow2"}
                onClick={() => setWiew(false)}
                className="w-full"
              >
                Назад к редактированию
              </Button>
              <Button 
                onClick={() => {
                  setLoading(true)
                  submit();
                  //weekCreateLogic()
                  visov()
                  setLoading(false)
                }}
                className="w-full"
                variant={"violetSelect"}
              >
                подтвердить
              </Button>
            </div>
          </div>
        </div>
      </div>
      :
      <>
        <div className="flex gap-1 justify-between">
          {["pn", "vt", "sr", "ct", "pt", "sb", "vs"].map((day) => (
            <Button
              key={day}
              className={`px-3 md:px-7`}
              variant={active === day ? "violetSelect" : "shadow2"}
              onClick={() => setActive(day)}
              disabled={active !== day}
            >
              {day === "pn" ? "Пн" : day === "vt" ? "Вт" : day === "sr" ? "Ср" : day === "ct" ? "Чт" : day === "pt" ? "Пт" : day === "sb" ? "Сб" : "Вс"}
            </Button>
          ))}
        </div>
        <div className="mt-2">
          {active && (
            <div>
              <div className="flex justify-between items-center">
                <h1 className="text-xl text-[#835BD2] font-medium">
                  {active === "pn" && "Понедельник"}
                  {active === "vt" && "Вторник"}
                  {active === "sr" && "Среда"}
                  {active === "ct" && "Четверг"}
                  {active === "pt" && "Пятница"}
                  {active === "sb" && "Суббота"}
                  {active === "vs" && "Воскресенье"}
                </h1>
                {isWeekend[active] || timeSlots[active].length === 0 ? 
                  ""
                  :
                  <Button 
                    variant={"shadow2"} 
                    onClick={() => setTimeSlots((prev) => ({ ...prev, [active]: [] }))}
                  >
                    Очистить
                  </Button>
                }
                
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="py-3 border text-base mt-2 border-gray-50 rounded-xl">
                {timeSlots[active].map((slot, index) => (
                  <div key={index} className="flex gap-2 items-center mt-2">
                    <Select
                      value={slot[0]}
                      onValueChange={(value) => 
                        {
                          handleTimeChange(active, index, 0, value);
                          setError(null);
                        }
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время начала" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span>до</span>
                    <Select
                      value={slot[1]}
                      onValueChange={(value) => 
                        {
                          handleTimeChange(active, index, 1, value);
                          setError(null);
                        }
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите время окончания" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={() => removeTimeSlot(active, index)} variant={"violetSelect"} className="text-white font-medium bg-red-500 hover:bg-red-600 gap-3 flex">
                      <p>Удалить</p>
                      <FaRegTrashCan />
                    </Button>
                  </div>
                ))}
                {
                  isWeekend[active] ? 
                    <div className="my-2">
                      <p className="text-[#835BD2] text-3xl font-light">Выходной</p>
                      <p className="text-5xl py-4">🎉</p>
                      <Button 
                        variant={"violetSelect"} 
                        className="font-medium" 
                        onClick={toggleWeekend}
                      >
                        Сделать рабочим
                      </Button>
                    </div>
                  :
                    <div className="flex gap-1 mt-3 mb-2">
                      <Button 
                        variant={"shadow2"} 
                        onClick={() => 
                        {
                          // Запросить начальное и конечное время
                          const startTime = "14:00"; // Здесь следует получить значение от пользователя
                          const endTime = "17:00";   // Здесь следует получить значение от пользователя
                          addTimeSlot(active, startTime, endTime);
                          setError(null);
                        }}
                        className={`${timeSlots[active].length === 0 ? "w-[60%]" : "w-full"} border-[3px] border-[#835BD2] bg-purple-100 text-[#835BD2] border-dashed hover:bg-[#835BD2] hover:text-white`}
                      >
                        Добавить временной промежуток
                      </Button>
                      <Button 
                        variant={"violetSelect"} 
                        className={`font-medium ${timeSlots[active].length === 0 ? "w-[40%]" : "hidden"}`} 
                        onClick={() => {
                          toggleWeekend();
                          setError(null);
                        }}
                      >
                        Сделать выходным 🎉
                      </Button>
                    </div>
                }
              </div>
              {redact ? 
              <Button 
                variant={"violetSelect"} 
                className="font-medium w-full" 
                onClick={() => {
                  if(validateTimeSlots(active)){
                    setWiew(true); 
                    setRedact(false);
                  }
                }}
              >
                Вернуться
              </Button>
              :
              <div className="flex justify-between">
                <Button 
                  onClick={handlePreviousDay} 
                  className="mt-2" 
                  variant={"shadow2"}
                >
                  Назад
                </Button>
                {active === "vs" ? 
                  <Button 
                    className="mt-2 font-medium"
                    variant={"violetSelect"}
                    onClick={() => 
                      {
                        if (validateTimeSlots(active)){
                          setWiew(true);
                        }
                      }
                    }
                  >
                    Просмотреть неделю и подтвердить
                  </Button>
                  :
                  <Button 
                    onClick={handleNextDay}
                    className="mt-2 font-medium" 
                    variant={"violetSelect"}
                  >
                    Перейти к следующему дню
                  </Button>
                }
              </div>
              }
            </div>
          )}
        </div>
      </>
      }
    </div>
  );
};
