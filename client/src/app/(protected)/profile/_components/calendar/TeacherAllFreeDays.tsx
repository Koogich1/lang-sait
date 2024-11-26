"use client"


import getTeacherAviabillityByTeacherID from "@/actions/getTeacherAviabillityByTeacherID";
import ModalBooking from "@/app/(protected)/learning/components/modal/ModalBooking";
import { bookedEtaps, DayOfWeek, TeacherScheduleDay } from "@prisma/client";
import { useEffect, useState } from "react";
import { ClipLoader, PacmanLoader } from "react-spinners";

type Props = {
    teacherId: string;
		lessons: number;
		updateAll: () => void;
};

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

type AllSchedule = {
	id: string; 
    teacherId: string;
    date: Date; 
    dayOfWeek: DayOfWeek; 
    timeSlots: { 
        time: string; 
        status: bookedEtaps; 
    }[]; 
    studentBookings: { 
        id: string; 
        studentId: string; 
        teacherScheduleDayId: string; 
        timeSlot: string; 
        status: bookedEtaps; 
    }[];
}

const TeacherAllFreeDays = ({ teacherId, lessons, updateAll}: Props) => {
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState<AllSchedule[] | null>(null);

		const fetchDays = async () => {
			const days = await getTeacherAviabillityByTeacherID(teacherId);
				if (days) {
						setDays(days);
						setLoading(false);
				}
		};

		const updateDays = () => {
			fetchDays()
			updateAll()
		}

		useEffect(() => {
			fetchDays()
		},[])

    if (!days) {
        return null;
    }

    if (days.length < 3) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center flex-col">
                <h1 className="text-xl font-semibold text-gray-400 text-center">У учителя нет свободных дней, выберете другого или просмотрите позже</h1>
                <PacmanLoader color="#9ca3af" className="mt-5" />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] items-center justify-center">
                <ClipLoader color="#835BD2" size={100} />
            </div>
        )
    }

		const getStatusColor = (status:any) => {
			switch (status) {
					case "free":
							return "bg-green-100 text-green-700 border-green-700";
					case "waitingAccess":
							return "bg-orange-200 text-orange-700 border-orange-700";
					case "bookedEtaps":
							return "bg-red-100 text-red-700 border-red-700";
					default:
							return "";
			}
	};

    return (
			<>
				<h1 className="flex flex-col mt-5 ">
					<span className="flex items-center gap-2  font-semibold text-base text-gray-400">
						Свободные часы: <div className="w-5 h-5 bg-green-200 rounded-md"></div>
					</span>
					<span className="flex items-center gap-2 font-semibold text-base text-gray-400">
						Ожидают подтверждения: <div className="w-5 h-5 bg-orange-200 rounded-md"></div>
					</span>
					<span className="flex items-center gap-2 font-semibold text-base text-gray-400">
						Занятые часы: <div className="w-5 h-5 bg-red-200 rounded-md"></div>
					</span>
				</h1>
				<div className="mt-5 grid grid-cols-2 gap-3">
							{days.map((day, index) => (
									<div className="w-full border border-gray-100 rounded-lg flex" key={index}>
										<div className="relative w-20 h-20 bg-[#835BD2] flex justify-center items-center rounded-lg select-none">
												<div className="absolute top-0 right-0 text-sm text-white m-1">
														{getDayOfWeek(day.date.getDay())}
												</div>
												<div className="text-base font-bold text-white">
														{formatDate(day.date)}
												</div>
										</div>
										
											{day.timeSlots.length > 0 ? 
											<div className="flex gap-3 items-center justify-center px-5">
											{day.timeSlots.map((hour, id) => (
												<div 
													key={id} 
													className={`h-2/3 relative w-[55px] flex items-center cursor-pointer justify-center text-[#835BD2] font-base border border-[#835BD2] rounded-lg hover:bg-[#835BD2] hover:text-white transition-all ${getStatusColor(hour.status)}`}
												>
													<h1>{hour.time}</h1>
													<ModalBooking day={day.date} hour={hour.time} dayId={day.id} status={hour.status} teacherId={teacherId} lessons={lessons} updateDays={updateDays}/>
												</div>
											))} 
											</div>
											: 
											<h1 className="px-5 flex items-center justify-center font-semibold text-gray-400">Выходной</h1>}
									</div>
							))}
				</div>
			</>
    )
};

export default TeacherAllFreeDays;
