"use client"

import moment from "moment"
import Header from "../../_components/header" 
import CurrentWeek from "../../_components/TimePicker/current-week"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { getUserByEmail } from "@/data/user"
import weekCreateLogic from "@/components/datePick/weekCreateLogic"
import { Button } from "@/components/ui/button"

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
			<Header
				header="Мое расписание"
			/>
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