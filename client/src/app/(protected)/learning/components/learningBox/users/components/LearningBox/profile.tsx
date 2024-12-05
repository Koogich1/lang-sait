"use client"

import { Button } from "@/components/ui/button"
import { BookedLesson, Language, UserSubscriptions } from "@prisma/client"
import Image from "next/image"
import { ClipLoader } from "react-spinners"
import Languages from "./boxes/language"
import NearLesson from "./boxes/nearLesson"

type Props = {
	lessons: UserSubscriptions | null,
	language: Language | null,
	lessonsBooked: BookedLesson[] | null,
}

const Profile = ({lessons, language, lessonsBooked}: Props) => {
	if(!lessons || !lessonsBooked)return(
		<div className="w-full flex items-center justify-center relative">
			<ClipLoader color="#835BD2" size={80} className="absolute mt-[40%]"/>
		</div>
	)
	return (
		<div className="w-full gap-1 flex flex-col border-l border-gray-100 min-h-[50vh] px-3">
			<h1 className="font-medium text-lg pb-5 text-[#835BD2]">Общая информация</h1>
			<div className="w-full flex gap-2 text-sm items-center">
				<p className="font-medium text-gray-400 w-[140px]">
					Ближайший урок: 
				</p>
				<NearLesson nearLesson={lessonsBooked[0]}/>
			</div>
			<div className="w-full flex gap-2 text-sm items-center mt-1">
				<p className="font-medium text-gray-400 w-[140px]">
					Преподаю язык: 
				</p>
				<Languages language={language}/>
			</div>
			<div className="w-full flex gap-2 mt-2 text-sm items-center">
				<p className="font-medium text-gray-400 w-[140px]">
					Уровень ученика:
				</p>
				<div>
					{language?.language === "China" && 
					(<div className="bg-[#f20520] text-[#f7e627] px-2 py-1 rounded-lg shadow-sm hover:scale-[105%] transition-all cursor-pointer">
						{language?.level}
					</div>)
					}
					{language?.language === "Korean" && 
					(<div className="bg-[#ffe2ef] text-[#b82761] px-2 py-1 rounded-lg shadow-sm hover:scale-[105%] transition-all cursor-pointer">
						{language?.level}
					</div>)
					}
					{language?.language === "German" && 
					(<div className="bg-amber-500 text-amber-900 px-2 py-1 rounded-lg shadow-sm hover:scale-[105%] transition-all cursor-pointer">
						{language?.level}
					</div>)
					}
					{language?.language === "English" && 
					(<div className="bg-[#4865d8] text-white px-2 py-1 rounded-lg shadow-sm hover:scale-[105%] transition-all cursor-pointer">
						{language?.level}
					</div>)
					}
				</div>
			</div>
			<div className="flex gap-3 mt-5">
				<div className="w-[16.5%] h-[6rem] shadow-md rounded-lg border-2 border-green-600 flex flex-col justify-between p-1">
					<p className="text-xs text-green-700 font-semibold">Уроков проведено:</p>
					<div className="flex items-center justify-center">
						<div className="text-3xl text-green-700 h-9 px-2 flex items-center justify-center border border-green-600 bg-white rounded-lg shadow-md">{lessons.lessonsSuccess}</div>
					</div>
					<Button className="p-0 h-5 text-xs font-medium bg-green-600 hover:bg-green-700" variant={"violetSelect"}>Предложить запись</Button>
				</div>
				<div className="w-[16.5%] h-[6rem] shadow-md rounded-lg border-2 border-orange-600 flex flex-col justify-between p-1">
					<p className="text-xs text-orange-700 font-semibold">Уроков пропущено:</p>
					<div className="flex items-center justify-center">
						<div className="text-3xl text-orange-700 h-9 px-2 flex items-center justify-center border border-orange-600 bg-white rounded-lg shadow-md">{lessons.lessonsErors}</div>
					</div>
					<Button className="p-0 h-5 text-xs font-medium bg-orange-600 hover:bg-orange-700" variant={"violetSelect"}>Просмотреть</Button>
				</div>
			</div>
		</div>
	)
}

export default Profile