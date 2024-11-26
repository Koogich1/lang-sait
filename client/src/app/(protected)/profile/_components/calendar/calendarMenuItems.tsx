"use client"

import { useEffect, useState } from "react";
import GetTeacherById from "../actions/getTeacherByid";


type Props = {
	teacherId: string,
	lessons: number,
	active: boolean,
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

const CalendarMenuItems = ({teacherId, lessons, active}: Props) => {


	const[teacher, setTeacher] = useState<User | null>(null)

	useEffect(() => {
		const fetchTeacher = async() => {
			const TeacherInf = await GetTeacherById(teacherId)
			if(TeacherInf){
				setTeacher(TeacherInf)
			}
		}
		fetchTeacher()
	},[])

	const Surname = teacher?.user.surname ? teacher.user.surname.charAt(0).toUpperCase() : "";

	return (
		<div className={`flex gap-2 border border-b-0 rounded-t-xl border-gray-100 p-2 hover:bg-gray-100 transition-all cursor-pointer items-center justify-center ${active ? 'bg-blue-200' : ''}`}>
			<h1 className="text-lg font-semibold text-gray-500">{teacher?.user.name} {Surname}.</h1>
			<div className="w-6 h-6 rounded-sm shadow-sm bg-green-100 border border-green-600 flex items-center justify-center text-xs font-bold text-green-600 hover:bg-green-600 hover:text-white transition-all">
				{lessons}
			</div>
		</div>
	)
}

export default CalendarMenuItems