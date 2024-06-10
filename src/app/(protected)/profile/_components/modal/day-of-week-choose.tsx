'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import TimeRangePicker from "../interface/time-range-picker";

type Props = {
	open: boolean,
	day: any,
	weekDay: any,
	onClose: () => void,
}

const DayOfWeekChoose = ({open, day, weekDay, onClose} : Props) => {

	return(
		<Dialog open={open}>
			<DialogContent className="rounded-xl">
				<DialogHeader className="p-0 m-0">
					<DialogTitle className="text-xl font-bold text-[#835BD2] p-0 m-0 flex  justify-between items-end">
						Выберете свободные часы
					</DialogTitle>
				</DialogHeader>
					<div className="flex gap-2 absolute p-6 pt-[27px] right-1 a text-base text-gray-400 font-normal">
						<div>
							{day}
						</div>
						<div>
							{weekDay?.charAt(0).toUpperCase() + weekDay?.slice(1)}
						</div>
					</div>
				<TimeRangePicker />
				<div className="w-full flex justify-between gap-3">
					<Button variant='shadow2' className='w-1/2 font-semibold' onClick={onClose}>Отмена</Button>
					<Button variant='violetSelect' className="w-1/2 text-base font-semibold">Подтвердить</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DayOfWeekChoose