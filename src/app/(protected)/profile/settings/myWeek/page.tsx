"use client"

import Header from "../../_components/header" 
import CurrentWeek from "../../_components/TimePicker/current-week"
import TimeClock from "../../_components/TimePicker/time-clock"
import 'moment/locale/ru'

import getCurrentFreeDates from "../../_components/TimePicker/current-week-free-hours"
import { useState, useEffect } from 'react';

const myWeek = () => {
	const [freeSlots, setFreeSlots] = useState([]);
  const [nonWorkingSlots, setNonWorkingSlots] = useState([]);
  const [loading, setLoading] = useState(true);

	return (
		<div>
			<Header
				header="Мое расписание"
			/>
			<div className="flex mt-10 w-full gap-5">
				<TimeClock />
				<CurrentWeek 
					handleDaySelect={''}
				/>
			</div>
			<div>
			</div>
		</div>
	)
}

export default myWeek