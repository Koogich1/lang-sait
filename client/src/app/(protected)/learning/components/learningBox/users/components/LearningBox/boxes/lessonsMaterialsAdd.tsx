"use client"

import { BookedLesson } from "@prisma/client";
import { ClipLoader, HashLoader } from "react-spinners";
import ChooseMaterial from "./chooseMaterial";
import { useState } from "react";
import updateLesson from "../../actions/lesson/updateLesson";
import MaterialInfo from "./materiallnfo";
import Link from "next/link";

type Props = {
	lesson: BookedLesson;
}

type pages = "added" | "homework" | "settings";

const LessonsMaterialsAdd = ({lesson}: Props) => {
	const [lessonInfo, setLessonInfo] = useState<BookedLesson>(lesson)
	const [active, setActive] = useState<pages>("added")
	const updateLessonInfo = async() => {
		const data = await updateLesson(lesson.id)
		if(data){
			setLessonInfo(data)
		}
	}
	
	if(!lesson){return}
	return (
		<div className="flex flex-col gap-3 w-full">
			<h1 className="text-lg font-medium text-[#835BD2]">Настройки материала</h1>
			<div className="w-full hidden gap-2 lg:flex border-t border-gray-200 min-h-[45vh]">
				<div className="w-1/2 border-r border-gray-200 pt-2 pr-1">
					<h1 className="font-light text-[#835BD2]">Мои материалы</h1>
					<div className="mt-3 flex gap-1 border-b border-gray-100">
						<div 
							className={`py-1 px-3 cursor-pointer rounded-t-lg hover:bg-purple-100 transition-all ${active === "added" ? "text-[#835BD2] border-b-2 border-[#835BD2] hover:border-purple-100" : "border-b-2 border-white hover:border-purple-100 text-gray-400"}`}
							onClick={() => {setActive("added")}}
						>
							Добавленные
						</div>
						<div 
							className={`py-1 px-3 cursor-pointer rounded-t-lg hover:bg-purple-100 transition-all ${active === "homework" ? "text-[#835BD2] border-b-2 border-[#835BD2] hover:border-purple-100" : "border-b-2 border-white hover:border-purple-100 text-gray-400"}`}
							onClick={() => {setActive("homework")}}
						>
							Домашняя работа
						</div>
						<div 
							className={`py-1 px-3 cursor-pointer rounded-t-lg hover:bg-purple-100 transition-all ${active === "settings" ? "text-[#835BD2] border-b-2 border-[#835BD2] hover:border-purple-100" : "border-b-2 border-white hover:border-purple-100 text-gray-400"}`}
							onClick={() => {setActive("settings")}}
						>
							Настройки
						</div>
					</div>
					<div className="w-full min-h-[40vh] mt-4">
					{
						active === "added" &&
						(
							lessonInfo.Materials && lessonInfo.Materials.length > 0 ? 
							<div className="grid grid-cols-3 gap-5">
								{lessonInfo.Materials.map((info) => (
									<Link href={`/learning/materials/${info}`} key={info}>
										<MaterialInfo data={info} />
									</Link>
								))}
							</div>
							:
						<div className="h-full min-h-[50vh] flex items-center justify-center">
							<div className="flex gap-2 items-center flex-col justify-center text-[#835BD2]">
								<p className="text-center leading-5 font-light">Добавьте материалы <br /> из правого блока!</p>
								<ClipLoader color="#835BD2" size={30}/>
							</div>
						</div>
						)
					}
					{
						active === "settings" &&
						<div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] text-gray-400">
							<HashLoader color="#9ca3af"/>
							<p className="font-medium">В разработке</p>
						</div>
					}
					{
						active === "homework" &&
						<div className="flex flex-col gap-2 items-center justify-center min-h-[50vh] text-gray-400">
							<HashLoader color="#9ca3af"/>
							<p className="font-medium">В разработке</p>
						</div>
					}
					</div>
				</div>
				<div className="w-1/2 pt-2">
					<h1 className="font-light text-[#835BD2] text-end">Выбор мателиала</h1>
					<ChooseMaterial lesson={lesson} visov={updateLessonInfo}/>
				</div>
			</div>
		</div>
	)
}

export default LessonsMaterialsAdd