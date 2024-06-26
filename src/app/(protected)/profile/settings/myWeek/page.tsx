"use client"

import Header from "../../_components/header" 
import CurrentWeek from "../../_components/TimePicker/current-week"
import TimeClock from "../../_components/TimePicker/time-clock"

import { useState } from 'react';
import FreeSlotsComponent from "../../_components/TimePicker/FreeHoursBlock"
import moment from "moment";

const myWeek = () => {
	const [freeSlots, setFreeSlots] = useState([]);
  const [nonWorkingSlots, setNonWorkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);

	const dayOfWeek = moment().day();
	moment.locale('en')
  const dayOfWeekName = moment.weekdays(dayOfWeek).toUpperCase();
	moment.locale('ru')
	const litterlyDayOfWeek = moment.weekdays(dayOfWeek).toUpperCase();

	return (
		<div>
			<Header
				header="Мое расписание"
			/>
			<div className="flex mt-10 w-full gap-5">
				<TimeClock />
				<CurrentWeek 
					handleDaySelect={dayOfWeekName}
				/>
			</div>
			<div>
				<FreeSlotsComponent dayOfWeek="MONDAY"/>
			</div>
			<div>
			</div>
		</div>
	)
}

export default myWeek