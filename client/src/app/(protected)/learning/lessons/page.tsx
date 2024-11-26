"use client"

import moment from "moment"
import CurrentWeek from "@/app/(protected)/profile/_components/TimePicker/current-week" 
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserByEmail } from "@/data/user"
import weekCreateLogic from "@/components/datePick/weekCreateLogic"
import { Button } from "@/components/ui/button"
import Header from "../components/header"
import { useEffect, useState } from "react"
import getweeksFronDb from "../../profile/_components/TimePicker/getweeksFronDb"
import { DayOfWeek } from "@prisma/client"
import FirstTimeChoosePage from "./firstTime/page"
import { ClipLoader } from "react-spinners"


interface SlotData {
  id: string;
  teacherId: string;
  date: Date;
  dayOfWeek: DayOfWeek;
  timeSlots: string[];
}


const MyWeek = () => {
	const [loading, setLoading] = useState(true)
	const [freeDates, setFreeDates] = useState<"Вы не учитель!" | SlotData[] | []>([]);
	const [notCreated, setNotCreated] = useState(false)

	const findAnything = async() => {
		const data = await getweeksFronDb()
		if(data && data.length > 0){
			setNotCreated(false)
			setFreeDates(data)
		} else {
			setNotCreated(true)
		}
	}

	useEffect(() => {
    findAnything();
		setLoading(false)
	}, []);



	const callWeekCreateLogic = async () => {
		try {
			await weekCreateLogic();
		} catch (error) {
			console.error('Error in weekCreateLogic:', error);
		}
	};

	if(loading){
		return(
			<div className="h-[100vh] flex justify-center">
				<div className="w-[150px] h-[150px] bg-white mt-[38vh] rounded-lg shadow-md flex justify-center items-center">
					<ClipLoader color="#835BD2" className="w-20 h-20"/>
				</div>
			</div>
		)
	}

	return (
		<div>
			{
				notCreated ? 
					<div>
						<FirstTimeChoosePage visov={() => {
							callWeekCreateLogic()
							findAnything()
						}}/>
					</div> 
				: 
				<div className="flex mt-5 w-full gap-5">
						<CurrentWeek freeDates={freeDates}/>
				</div>
			}
		</div>
	)
}

export default MyWeek