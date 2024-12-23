"use client"

import moment from "moment"
import CurrentWeek from "@/app/(protected)/profile/_components/TimePicker/current-week" 
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserByEmail } from "@/data/user"
//import weekCreateLogic from "@/components/datePick/weekCreateLogic"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { DayOfWeek, TeacherAvailability } from "@prisma/client"

interface SlotData {
  id: string;
  teacherId: string;
  date: Date;
  dayOfWeek: DayOfWeek;
  timeSlots: string[];
}

const MyWeek = () => {
	const[freeDates, setFreeDates] = useState<TeacherAvailability[] | null>(null)

	return (
		<div>
			<div className="flex mt-10 w-full gap-5">
				<CurrentWeek freeDates={
					freeDates
					}/>
			</div>
		</div>
	)
}

export default MyWeek