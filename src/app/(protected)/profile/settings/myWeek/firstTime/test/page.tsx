"use server"

import { getUserByEmail } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { DayOfWeek } from '@prisma/client';
import moment from "moment";

const getDayOfWeekEnumValue = (dayOfWeekString:any) => {
  const dayMappings: { [key: string]: DayOfWeek } = {
    "Monday": "MONDAY",
    "Tuesday": "TUESDAY",
    "Wednesday": "WEDNESDAY",
    "Thursday": "THURSDAY",
    "Friday": "FRIDAY",
    "Saturday": "SATURDAY",
    "Sunday": "SUNDAY"
  };
  return dayMappings[dayOfWeekString];
};

const page = async() => {

	const user = await currentUser()

	if(!user?.email){
		return
	}

	const userByEmail = await getUserByEmail(user?.email)

	const teacherId = userByEmail?.teacherId

	if(!teacherId){
		return('Вы не учитель')
	}

	const days = await db.teacherScheduleDay.findMany({
		where:{
			teacherId: teacherId
		}
	})


	return (
		<div>
      <ul className='grid grid-cols-3'>
        {days.map((day) => (
        <li key={day.id} className='w-[160px] bg-white p-3 m-3 flex flex-col items-center justify-center rounded-lg shadow-lg'>
					<h1>{day.dayOfWeek}</h1>
					<p>{day.date.toLocaleDateString()}</p> 
					<p>{day.archived ? "Архивный" : "Не архивный"}</p>
					{day.timeSlots.length ?
						day.timeSlots.map((slot, index) => (
							<span key={index}>{slot}</span>
						)) :
						<span>Свободных слотов нет</span>
					}
				</li>
        ))}
      </ul>
    </div>
	)
}

export default page