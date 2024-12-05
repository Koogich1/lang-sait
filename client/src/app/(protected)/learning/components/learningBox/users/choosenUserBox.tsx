"use client"

import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { BookedLesson, Language, Lessons, Teacher, User, UserSubscriptions } from "@prisma/client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Profile from "./components/LearningBox/profile";
import LessonsInfo from "./components/LearningBox/lessons";
import Notes from "./components/LearningBox/notes";
import { IoArrowBack } from "react-icons/io5";
import { each } from "lodash";
import getBookingInfo from "./components/actions/profile/getBookingInfo";
import findUserLanguages from "@/app/(protected)/profile/settings/components/languages/findUserLanguages";
import getTeacherUserLanguage from "./components/actions/profile/getTeacherUserLanguage";
import getUserLessons from "./components/actions/profile/getUserLessons";

type Props = {
	userId: string;
	setChoosen: any;
	TeacherUser: User
	teacher: Teacher | null,
}

type Blocks = "Profile" | "lessons" | "HomeWork" | "notes";

const ChoosenUserBox = ({userId, setChoosen, TeacherUser, teacher}: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [activeBlock, setActiveBlock] = useState<Blocks>("Profile")
	const [profile, setProfileInfo] = useState<UserSubscriptions| null>(null)
	const [language, setLanguage] = useState<Language | null>(null)
	const [lessons, setLessons] = useState<BookedLesson[] | null>(null)

	const fetchUser = useCallback(async () => {
		try {
			const data = await getUserById(userId);
			if (data) {
				if(!TeacherUser || TeacherUser.teacherId == null)return
				setUser(data);
				setChoosen(data); // Обновляем выбранного пользователя
				const BookingInfo = await getBookingInfo({userId: userId, teacherId: TeacherUser.id})
				if(BookingInfo){
					setProfileInfo(BookingInfo)
				}
				const languagefind = await getTeacherUserLanguage(userId, TeacherUser.id)
				if(languagefind){
					setLanguage(languagefind)
				}
				const lessonsInfo = await getUserLessons({teacherId: TeacherUser.teacherId, userId: userId})
				if(lessonsInfo){
					setLessons(lessonsInfo)
				}
			}
		} catch (error) {
			console.error("Ошибка при получении пользователя:", error);
		}
	}, [userId, setChoosen]); 


	useEffect(() => {
		fetchUser();
	}, [fetchUser]);

	if(!user){
		return(
			<div>
				загрузка
			</div>
		)
	}

	return (
		<div className="w-full">
			<div className="flex mt-3 gap-3">
				<div className="flex flex-col gap-1 justify-start">
					<h1 className="text-lg font-medium text-[#835BD2]">Мой ученик:</h1>
					<div className="flex gap-2 py-1 px-2 border border-gray-100 rounded-lg">
						<div className="w-[3.5rem] h-[3.5rem] border border-gray-100 rounded-lg overflow-hidden">
							<Image src={user.image ? user.image : ""} alt="userImage" width={100} height={100} className="w-full h-full object-cover rounder" />
						</div>
						<h1 className="flex flex-col text-base font-medium text-[#835BD2] justify-center">
							<span>{user.name}</span>
							<span>{user.surname}</span>
						</h1>
					</div>
					<div className="mt-3">
						<ul className="flex flex-col gap-1">
							<li>
								<Button
									variant={activeBlock === "Profile" ? "violetSelect" : "shadow2"}
									onClick={() => {setActiveBlock("Profile")}}
									className="h-8 font-normal text-xs w-full "
								>
									Общая информация
								</Button>
							</li>
							<li>
								<Button
									variant={activeBlock === "lessons" ? "violetSelect" : "shadow2"}
									onClick={() => {setActiveBlock("lessons")}}
									className="h-8 font-normal text-xs w-full"
								>
									Уроки
								</Button>
							</li>
							<li>
								<Button
									variant={activeBlock === "notes" ? "violetSelect" : "shadow2"}
									onClick={() => {setActiveBlock("notes")}}
									className="h-8 font-normal text-xs w-full"
								>
									Заметки
								</Button>
							</li>
						</ul>
					</div>
					<div>
						<Button variant={"shadow2"} className="text-xs p-0 h-6 px-1 absolute bottom-0 bg-white">
							Удалить ученика?
						</Button>
						<Button 
							variant={"shadow2"} 
							className="text-sm h-7 absolute right-3 top-0 gap-1 px-2 z-40"
							onClick={() => {setChoosen(null)}}
						>
							<IoArrowBack />
							<p>Вернуться</p>
						</Button>
					</div>
				</div>
				<div className="w-full">
					{activeBlock === "Profile" &&
					<div className="w-full">
						<Profile lessons={profile} language={language} lessonsBooked={lessons}/>
					</div>
					}
					{activeBlock === "lessons" &&
					<div>
						<LessonsInfo lessonsBooked={lessons}/>
					</div>
					}
					{
						activeBlock==="notes"&&
						<div>
							<Notes />
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default ChoosenUserBox