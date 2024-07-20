"use client"

import moment from "moment"
import CurrentWeek from "@/app/(protected)/profile/_components/TimePicker/current-week" 
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserByEmail } from "@/data/user"
import weekCreateLogic from "@/components/datePick/weekCreateLogic"
import { Button } from "@/components/ui/button"
import Header from "../components/header"

const myWeek = () => {

	const callWeekCreateLogic = async () => {
		try {
			await weekCreateLogic();
		} catch (error) {
			console.error('Error in weekCreateLogic:', error);
		}
	};

	return (
		<div>
			<div className="flex mt-10 w-full gap-5">
				<CurrentWeek />
			</div>
			<div>
			</div>
			<Button onClick={callWeekCreateLogic}>
				Ура Ура Ура
			</Button>
			<div>
			</div>
		</div>
	)
}

export default myWeek