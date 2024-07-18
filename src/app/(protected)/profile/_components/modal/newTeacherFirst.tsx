"use client"

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
// import createEmptyTeacherAvailability from "@/actions/create-Empty-Teacher-Aviability";

type Props = {
	user: any,
}

const ModalNewTeacher = ({user}: Props) => {

	return(
		<div className="w-full h-full absolute flex items-center justify-center">
			<div className="w-[600px] h-[300px] bg-purple-200 shadow-xl p-8 rounded-lg flex flex-col justify-between">
				<div>
					<h1 className="text-2xl font-bold text-[#835BD2]">Добро пожаловать!</h1>
					<h3 className="text-base text-[#835BD2] pt-10">
						Для начала работы на нашей платформе вам необходимо указать дни недели, в которые вы доступны для проведения занятий.
					</h3>
					</div>
					<div className="flex w-full gap-3">
					<Link
					className="w-1/2"
					href={'settings/myWeek/firstTime'}>
						<Button variant='violetSelect' 
						className="w-full text-base h-[50px]"
						>
							Перейти!
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ModalNewTeacher