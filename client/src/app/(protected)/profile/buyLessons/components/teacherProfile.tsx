"use client"

import getTeacherById from "@/app/(main_page)/teacher/components/findTeacherByID";
import Image from "next/image";
import { useEffect, useState } from "react"
import getTeacherByUserId from "./getTeacherByUserID";
import getTeacherSubs from "@/app/(main_page)/teacher/components/week/getTeacherSubs";
import { Language, User, UserSubscriptions } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import findUserLanguages from "../../settings/components/languages/findUserLanguages";
import findLanguage from "./findLanguage";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Teacher = {
  id: string;
  teacherId: string;
  videoSrc: string; // Добавлено поле videoSrc
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
		images: string[];
    languages: {
      language: string; // Убедитесь, что тут у вас правильный тип
      level: string;
      prefers: string; // Или используйте ваш enum
    }[];
    lessonPrise: number;
  };
};

type Props = {
	teacherId: string
}
const TeacherProfile = ({teacherId}: Props) => {
	const [teacher, setTeacher] = useState<Teacher | null>(null)
	const [userSubs, setUserSubs] = useState<UserSubscriptions | null>(null)
	const [languages, setLanguages] = useState<Language | null>(null)
	const rounter = useRouter()

	useEffect(() => {
		const fetchInfo = async() => {
			const data = await getTeacherByUserId(teacherId)
			if(data){
				setTeacher(data)
				const user = await currentUser()
				if(user){
					const handleData = async() => {
						const subsData = await getTeacherSubs({teacherId: data.id, user: user.id})
						if(subsData){
							setUserSubs(subsData)
						}
					}
					handleData()
					const getUserLanguages = async() => {
						const info = await findLanguage({userid: user.id, teacherId: data.id})
						if(info){
							setLanguages(info)
						}
					}
					getUserLanguages()
				}	
			}
		} 
		fetchInfo()
	}, [teacherId])

	return (
		<div className="w-1/2 h-[40vh] bg-white shadow-lg rounded-lg flex flex-col gap-3 items-center justify-around px-2 py-4">
			<div className="flex items-center justify-center gap-2 flex-col">
				<Image src={teacher?.userInfo.image ? teacher.userInfo.image : ""} alt="teacherImage" height={135} width={135} className="rounded-full"/>
				<h1 className="text-xl font-medium text-blue-400">{teacher?.userInfo.name + " " + teacher?.userInfo.surname} </h1>
			</div>
			<div className="w-full flex flex-col gap-1">
			<div className="w-full">
												{languages?.language === "China" ? 
													<div className={`bg-[#f20520] p-2 w-full overflow-hidden hover:opacity-100 hover:scale-105 cursor-pointer transition-all relative max-h-[60px] flex flex-col justify-between rounded-xl shadow-lg`}>
														<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
														<h1 className="text-[#f7e627] text-lg z-50 text-center" style={{fontFamily: "Belepotan"}}>
															Китайский
														</h1>
													</div> 
													: ""}
													{languages?.language === "English" ?
													<div className={`relative hover:opacity-100 hover:scale-105 cursor-pointer transition-all`}>
														<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
															<div className="bg-[#4865d8] p-2 overflow-hidden relative max-h-[60px] flex flex-col justify-between rounded-xl shadow-lg">
																<h1 className="text-white text-lg z-50" style={{fontFamily: "Corean"}}>
																	Английский
																</h1>
														</div>
													</div>
													: ""}
													{languages?.language === "German" ? 
													<div className={`bg-amber-500 w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[60px] flex flex-col justify-between rounded-xl shadow-lg`}>
														<h1 className="text-amber-900 text-lg text-center z-50 font-semibold">
															НЕМЕЦКИЙ
														</h1>
													</div>
													: ""}
													{languages?.language === "Korean" ? 
													<div className={`bg-[#ffe2ef] w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[60px] flex flex-col justify-between rounded-xl`}>
														<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
														<h1 className="text-[#b82761] text-lg text-center z-50" style={{fontFamily: "Belepotan"}}>
															КОРЕЙСКИЙ
														</h1>
												</div>
													: ""}
				</div>
				<div className="border border-gray-100 text-sm rounded-lg w-full h-10 flex items-center px-2 text-gray-400 font-medium">
					Количество уроков куплено: {userSubs ? userSubs.LessonsPayd : "0"}
				</div>
				<div className="border border-gray-100 text-sm rounded-lg w-full h-10 flex items-center px-2 text-gray-400 font-medium">
					Количество уроков проведено: {}
				</div>
			</div>
				<Button 
					variant={"violetSelect"} 
					className="bg-green-500 hover:bg-green-600 font-medium w-full hover:scale-[103%] transition-all"
					onClick={() => {
						rounter.push(`/profile/buyLessons/${teacherId}`)
					}}
				>
					Купить уроки
				</Button>
		</div>
	)
}

export default TeacherProfile