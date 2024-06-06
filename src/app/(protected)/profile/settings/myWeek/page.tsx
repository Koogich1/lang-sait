import { currentUser } from "@/lib/auth"
import Header from "../../_components/header" 
import CurrentWeek from "../../_components/TimePicker/current-week"
import TimeClock from "../../_components/TimePicker/time-clock"

const myWeek = async () => {
	const user = await currentUser()
	return (
		<div>
			<Header
				header="Мое расписание"
			/>
			<div className="flex mt-10">
				<TimeClock />
				<CurrentWeek />
			</div>
		</div>
	)
}

export default myWeek