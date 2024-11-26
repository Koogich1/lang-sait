"use client"

import bookingLogic from "@/app/(protected)/profile/_components/calendar/bookingLogic"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

type Props = {
    day: Date,
    hour: string,
	dayId: string,
    status: string,
    teacherId: string,
    lessons: number,
    updateDays: () => void,
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

const ModalBooking = ({ day, hour, dayId, status, teacherId, lessons, updateDays}: Props) => {
    const router = useRouter();
    const [disable, setDisable] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = useState(false)
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    
    const logikDisable = () => {
        if(status === "waitingAccess" || status === "booked" || lessons <= 0){
            setDisable(true)
        } 
    }

    const onClick = () => {
        setOpen(true)
    }

    return (
        <Dialog open={open}>
            <DialogTrigger className="absolute w-full h-full bg-none"
                onClick={() => {
                    logikDisable()
                    onClick()
                }}
            />
            <DialogContent className="p-5">
                    <div 
					    className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
						onClick={() => {setOpen(false)}}
						>
						<IoCloseOutline  className="text-2xl text-white"/>
					</div>
                <DialogHeader>
                    <DialogTitle className="text-lg text-gray-500 font-medium pb-2">Подтвердите выбор времени урока <span className="font-bold text-gray-600">{formatDate(day)}</span> в <span className="font-bold text-gray-600">{hour}</span></DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                        {lessons <= 0 && 
                        <div className="flex justify-between items-center">
                            <h1 className="font-medium text-gray-400">Доступное количество уроков: {lessons}</h1>
                            <Link href={"/profile/lessonsBuy"} className="">
                                <Button variant="violetSelect" className="" >
                                    Купить уроки!
                                </Button>
                            </Link>
                        </div>
                        }
                </DialogHeader>
                {lessons <= 0 ? "" : 
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" checked={isChecked} onClick={() => setIsChecked(!isChecked)} />
                    <div className="grid gap-1.5 leading-none items-center">
                        <label
                            htmlFor="terms1"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Подтверждаю запись на выбранное время
                        </label>
                  </div>
                </div>}
                <Button 
                    variant='violetSelect'
                    className="font-medium mt-3"
                    onClick={() => {
                        bookingLogic({ dayId: dayId, timeSlot: hour, teacherId: teacherId, day: day})
                        const notify = () => toast(
                            <p className="flex flex-col">
                                <span>Занятие {formatDate(day)} в {hour} успешно добавлено!</span>
                                <span>Теущий баланс уроков у учителя {lessons-1}</span>
                            </p>
                          );
                        notify()
                        updateDays()
                        setOpen(false)
                    }}
                    disabled={disable || !isChecked}
                >
                    {lessons <= 0 ? `Недостаточное количество уроков: ${lessons}` :"Подтвердить запись!"}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default ModalBooking
