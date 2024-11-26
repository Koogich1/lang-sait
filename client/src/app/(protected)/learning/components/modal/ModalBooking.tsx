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
import { bookedEtaps, User } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { IoCloseOutline } from "react-icons/io5"
import { toast } from "react-toastify"

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
    day: Date,
    hour: string,
    dayId: string,
    status: bookedEtaps,
    Teacher: Teacher,
    lessons: number,
    updateDays: () => void,
    user: User | null,
    isTeacherAdded: boolean,
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

const ModalBooking = ({ day, hour, dayId, status, Teacher, lessons, updateDays, user, isTeacherAdded }: Props) => {
    const [disable, setDisable] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = useState(false);
    
    const logikDisable = () => {
        if (status === "waitingAccess" || status === "booked" || lessons <= 0) {
            setDisable(true);
        } 
    }

    const onClick = () => {
        setOpen(true);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="absolute w-full h-full bg-none"
                onClick={() => {
                    logikDisable();
                    onClick();
                }}
            />
            <DialogContent className="p-5">
                <div 
                    className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
                    onClick={() => { setOpen(false); }}
                >
                    <IoCloseOutline className="text-2xl text-white"/>
                </div>
                <h1 className="text-2xl font-semibold text-[#835BD2]">Запись на занятие</h1>
                {user?.TeacherS.includes(Teacher.id) ? (
                    <>
                        {status === "waitingAccess" && 
                            <div className="text-gray-400 font-medium">
                                <h1>На данную дату уже отправили заявку, вы можете записаться на другую дату!</h1>
                                <div></div>
                            </div>
                        }
                        {status === "booked" && <div>100% занято</div>}
                        {status === "free"  &&
                            (<>
                            <DialogHeader>
                                <DialogTitle className="text-lg w-full flex items-center flex-col gap-5 text-gray-500 font-medium pb-4 mt-2">
                                    <div className="flex gap-2 items-center">Подтвердите <FaPencilAlt color="#835BD2"/> запись на: </div>
                                    <div className="flex gap-2 items-center"><span className=" font-bold py-2 border px-3 bg-[#835BD2] text-white rounded-lg">{formatDate(day)}</span> в <span className="font-bold bg-green-100 px-3 py-2 rounded-lg text-green-600 border border-green-500">{hour}</span></div>
                                </DialogTitle>
                                <DialogDescription>
                                </DialogDescription>
                            </DialogHeader>
    
                            {lessons <= 0 && 
                                <div className="flex justify-between items-center">
                                    <h1 className="font-medium text-gray-400">Доступное количество уроков: {lessons}</h1>
                                    <Link href={"/profile/lessonsBuy"}>
                                        <Button variant="violetSelect">Купить уроки!</Button>
                                    </Link>
                                </div>
                            }
    
                            {lessons > 0 && (
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
                                </div>
                                
                            )}
                            <Button 
                                variant='violetSelect'
                                className="font-medium mt-3"
                                onClick={() => {
                                    bookingLogic({ 
                                        dayId: dayId, 
                                        timeSlot: hour, 
                                        teacherId: Teacher.id, 
                                        day: day// Убедитесь, что 'day' - это валидная дата
                                    });
                                    updateDays();
                                    setOpen(false);
                                }}
                                disabled={disable || !isChecked}
                            >
                                {lessons <= 0 ? `Недостаточное количество уроков: ${lessons}` : "Подтвердить запись!"}
                            </Button>
                            </>)
                        }
                    </>
                ) : (
                    <div>
                        <h1 className="font-medium text-lg text-[#835BD2] min-h-[8rem] pb-5 flex items-center justify-center">
                            {!isTeacherAdded ? <p>Дождитесь принятия заявки</p> : <p className="px-5 text-center">Добавьте учителя, прежде чем записаться к нему на занятия!</p>}
                        </h1>
                        <div className="flex gap-2">
                            <Button 
                                className="w-1/2"
                                variant={"shadow2"}
                            >
                                Отменить
                            </Button>
                            {!isTeacherAdded ? 
                                <Button
                                    className="font-medium w-1/2"
                                    variant={"violetSelect"}
                                >
                                    Перейти в профиль
                                </Button>
                            :
                                <Link 
                                    href={`/addTeacher/${Teacher.teacherId}`}
                                    className="w-1/2"
                                >
                                    <Button
                                        className="font-medium w-full bg-green-500 hover:bg-green-600"
                                        variant={"violetSelect"}
                                    >
                                        Добавить учителя
                                    </Button>
                                </Link>
                            }
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default ModalBooking;