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

	return(
		<Dialog open={open}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-[#835BD2]">Добро пожаловать!</DialogTitle>
					<DialogDescription className="text-base text-gray-500 pt-3">
						Для начала работы на нашей платформе вам необходимо указать дни недели, в которые вы доступны для проведения занятий.
					</DialogDescription>
				</DialogHeader>
				<Link
				className="w-full"
				href={'settings/myWeek'}>
					<Button variant='violetSelect' className="w-full text-base h-[50px] mt-3">
						Перейти!
					</Button>
				</Link>
			</DialogContent>
		</Dialog>
	)
}

export default ModalNewTeacher