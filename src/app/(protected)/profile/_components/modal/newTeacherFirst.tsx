"use client"

import getTeacherAvailability from "@/actions/get-teacher-Availability"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import createEmptyTeacherAvailability from "@/actions/create-Empty-Teacher-Aviability";

type Props = {
	user: any,
}

const ModalNewTeacher = ({user}: Props) => {
	const [hasDates, setHasDates] = useState(false);
	const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dates = await getTeacherAvailability(user?.id ?? "");
      setHasDates(dates);
    };
    
    if (user?.role === "TEACHER" && hasDates === false) {
      fetchData();
      setOpen(true);
    }
  }, [user, hasDates]);
	
	const handleClose = () => {
		setOpen(false)
	}
	const handleOpen = () => {
		createEmptyTeacherAvailability()
	}

	return(
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-[#835BD2]">Добро пожаловать!</DialogTitle>
					<DialogDescription className="text-base text-gray-500 pt-3">
						Для начала работы на нашей платформе вам необходимо указать дни недели, в которые вы доступны для проведения занятий.
					</DialogDescription>
				</DialogHeader>
				<div className="flex w-full gap-3">
					<Button 
					variant='shadow2' 
					className='w-1/2 font-semibold h-[50px]' 
					onClick={handleClose}>
						Настроить позже
					</Button>
					<Link
					className="w-1/2"
					href={'settings/myWeek'}>
						<Button variant='violetSelect' 
						className="w-full text-base h-[50px]"
						onClick={handleOpen}
						>
							Перейти!
						</Button>
					</Link>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default ModalNewTeacher