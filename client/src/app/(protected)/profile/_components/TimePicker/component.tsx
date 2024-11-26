"use server"

import moment from "moment"
import CurrentDayLessons from "./current-day-lessons"

const Component = async() => {
	const now = moment()

  const dayOfWeekName = now.format('dddd')
	return (
		
		<CurrentDayLessons
      currWeek={dayOfWeekName}
    />
	)
}

export default Component