"use client"

import Header from "../../_components/header" 
import CurrentWeek from "../../_components/TimePicker/current-week"
import TimeClock from "../../_components/TimePicker/time-clock"
import 'moment/locale/ru'
import Component from "../../_components/TimePicker/component"

const myWeek = () => {

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
			 {/*	<Circle />  ДОДЕЛАТЬ ОТОБРАЖЕНИЕ ВЫБРАННОГО ВРЕМЕНИ НА ЧАСАХ*/}
			</div>
			<div>
				
			</div>
		</div>
	)
}

export default myWeek