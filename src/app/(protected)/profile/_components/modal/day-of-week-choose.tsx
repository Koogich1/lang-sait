'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type Props = {
	open: boolean,
	day: any,
	weekDay: any,
	onClose: () => void,
}

const DayOfWeekChoose = ({open, day, weekDay, onClose} : Props) => {

	return(
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-[#835BD2]">Выберете свободные часы</DialogTitle>
					<DialogDescription className="text-base text-gray-500 pt-3">
						{day}
						<div>
							{weekDay}
						</div>
					</DialogDescription>
				</DialogHeader>
				<div className="w-full flex justify-between gap-3">
					<Button variant='shadow2' className='w-1/2' onClick={onClose}>Отмена</Button>
					<Button variant='violetSelect' className="w-1/2">Подтвердить</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default DayOfWeekChoose