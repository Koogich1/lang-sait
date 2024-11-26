"use client"

import { UserSubscriptions } from "@prisma/client"
import { useEffect, useState } from "react"
import GetTeacherById from "../../_components/actions/getTeacherByid"

type Props = {
	subs: UserSubscriptions,
}

type User = {
	user: {
		id: string;
		name: string | null;
		surname: string | null;
		mail: string | null;
		favourites: string[];
		image: string | null;
		lessons: number | undefined;
};
}

const HeaderTeacherBox = ({subs}: Props) => {
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
	

	return (
			<div className="w-full h-[50px] bg-white flex justify-between p-1 rounded-xl hover:bg-gray-100 gap-5" key={subs.id}>
				<div className="flex flex-col text-sm font-semibold text-gray-400 justify-center">
					<h1 className="flex gap-1"><span>{teacher?.user.name}</span><span>{Surname}.</span></h1>
					<h1 className="font-normal">Кол-во уроков: {teacher?.user.lessons}</h1>
				</div>
				<img src={`${teacher?.user.image}`} alt="" className="rounded-lg w-[45px] h-[45px] object-cover"/>
			</div>
	)
	
}

export default HeaderTeacherBox