"use client"

import { UserSubscriptions } from "@prisma/client"
import { useEffect, useState } from "react"
import GetTeacherById from "../../_components/actions/getTeacherByid"
import { Button } from "@/components/ui/button"
import BuyModal from "./modal/BuyModal"

type Props = {
	subs: UserSubscriptions,
}

type User = {
	user: {
		id: string;
		currUser: string | undefined;
		teacherId: string;
		name: string | null;
		surname: string | null;
		language: string[];
		mail: string | null;
		favourites: string[];
		image: string | null;
		lessons: number | undefined;
		lessonPrise: number | undefined;
	};
}
const TeacherSub = ({subs}: Props) => {
	const[teacher, setTeacher] = useState<User | null>(null)

	useEffect(() => {
		const fetchTeacher = async() => {
			const TeacherInf = await GetTeacherById(subs.teacherId)
			if(TeacherInf){
				setTeacher(TeacherInf)
			}
		}
		fetchTeacher()
	},[])

	const Surname = teacher?.user.surname ? teacher.user.surname.charAt(0).toUpperCase() : "";

	const lessons = 0
	//ОБЯЗАТЕЛЬНО ДОБВИТЬ КОЛИЧЕСТВО УРОКОВ С ЭТИМ УЧИТЕЛЕМ

	return (
		<div className="bg-white flex justify-between p-2 rounded-xl flex-col xl:flex-row xl:h-[180px] items-center">
			<img src={`${teacher?.user.image}`} alt="" className="rounded-lg h-full max-w-[165px] object-cover block xl:hidden"/>
			<div className="flex flex-col justify-between h-full gap-2 xl:gap-0">
				<h1 className="flex gap-1 text-xl font-semibold text-gray-400"><span>{teacher?.user.name}</span><span>{Surname}.</span></h1>
				<div className="flex flex-col">
					<h1 className="flex gap-1 text-base font-medium text-gray-400">- Кол-во уроков: {teacher?.user.lessons}</h1>
					<h1 className="flex gap-1 text-base font-medium text-gray-400">- Проведено: {lessons}</h1> 
				</div>
				<BuyModal teacherId={teacher?.user.teacherId} userId={teacher?.user.currUser} lessons={teacher?.user.lessons} name={teacher?.user.name} surname={teacher?.user.surname} prise={teacher?.user.lessonPrise}/>
			</div>
			<img src={`${teacher?.user.image}`} alt="" className="rounded-lg h-full max-w-[165px] object-cover hidden xl:block"/>
		</div>
	)
}

export default TeacherSub