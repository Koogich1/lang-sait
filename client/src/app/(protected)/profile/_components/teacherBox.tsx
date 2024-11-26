"use client"

import { UserSubscriptions } from "@prisma/client"
import { useEffect, useState } from "react"
import GetTeacherById from "./actions/getTeacherByid" 
import Image from "next/image"

type Props = {
	subs: UserSubscriptions,
}

type User = {
	user: {
		id: string;
		name: string | null;
		surname: string | null;
		language: string | string[];
		mail: string | null;
		favourites: string[];
		image: string | null;
		lessons: number | undefined;
	};
}
type LanguageTranslation = {
  [key: string]: string;
};

const englishToRussian: LanguageTranslation = {
  English: 'Английский',
  China: 'Китайский',
  Korean: 'Корейский',
  // Добавьте другие языки по необходимости
};

const TeacherBox = ({subs}: Props) => {
	const[teacher, setTeacher] = useState<User | null>(null)

	useEffect(() => {
		const fetchTeacher = async() => {
			const TeacherInf = await GetTeacherById(subs.teacherId)
			if(TeacherInf){
			{	
			//	setTeacher(TeacherInf)
			}
			}
		}
		fetchTeacher()
	},[subs.teacherId])

	const Surname = teacher?.user.surname ? teacher.user.surname.charAt(0).toUpperCase() : "";
	
	const translateLanguage = (language: string | string[]) => {
		if (Array.isArray(language)) {
			// Если передан массив языков, преобразуйте их все
			return language.map(lang => englishToRussian[lang] || lang).join(', ');
		} else {
			// Если передан один язык
			return englishToRussian[language] || language;
		}
	};

	if(!teacher?.user.language){
		return
	}

	return (
			<div className="w-full h-[50px] bg-white flex justify-between p-1 rounded-xl hover:bg-gray-100">
				<div className="flex flex-col text-sm font-semibold text-gray-400 justify-center">
					<h1 className="flex gap-1"><span>{teacher?.user.name}</span><span>{Surname}.</span></h1>
					<h1 className="font-normal">{translateLanguage(teacher?.user.language)}</h1>
				</div>
				<Image width={1000} height={1000} src={`${teacher?.user.image}`} alt="" className="rounded-full w-[45px] h-[45px] object-cover"/>
			</div>
	)
	
}

export default TeacherBox