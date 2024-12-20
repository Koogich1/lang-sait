"use client"

import Header from "../_components/header"
import { useCallback, useEffect, useState } from "react"
import { currentUser } from "@/lib/auth"
import { Achievement, Language, languageVariants, User } from "@prisma/client"
import { ClipLoader } from "react-spinners"
import ObychenieBox from "./components/obychenieBox"
import { Button } from "@/components/ui/button"
import { IoReload } from "react-icons/io5"
import getAllAchivments from "./actions/getAllAchivments"
import createAchivments from "./actions/createAchivments"
import findUserLanguages from "../settings/components/languages/findUserLanguages"

const SettingsPage = () => {
	const [user, setUser] = useState<User | null>(null)
	const [achivments, setAchivments] = useState<Achievement[] | null>(null)
	const [languages, setLanguages] = useState<Language[] | null>(null)

	const fetchUser = useCallback(async () => {
		const currentUserData = await currentUser()
		if (currentUserData) {
			const achievementsData = await getAllAchivments(currentUserData.id)
			if (currentUserData) {
        const fetch = await findUserLanguages(currentUserData.id);
        console.log('Fetched Languages:', fetch); // Для проверки наличия данных
        if (fetch) {
          // Сортируем языки по алфавиту
          const sortedLanguages = fetch.sort((a, b) => 
            a.language.localeCompare(b.language)
          );
          setLanguages(sortedLanguages);
        }
      } else {
        console.log("пользователя нет");
      }
			setUser(currentUserData)
			setAchivments(achievementsData) // Сохраняем достижения в состояние
		}
	}, [])

	useEffect(() => {
		fetchUser()
	}, [fetchUser]) // Добавляем зависимость от fetchUser

	if (!user) {
		return (
			<div className="w-full h-[100vh] flex items-center justify-center">
				<ClipLoader color="#835BD2" size={100}/>
			</div>
		)
	}

	return (
		<div className="w-full">
			<Header
				user={user}
				header="Достижения"
			/>
			<div className="w-full flex justify-center">
				{achivments && achivments?.length > 0 ?
					<div className="bg-white p-2 py-4 mt-5 rounded-xl shadow-lg relative w-full">
						<h1 className="text-2xl font-semibold text-green-600">Обучение</h1>
						<ObychenieBox visov={fetchUser} user={user} emailVerified={user.emailVerified ? true : false} achivments={achivments} languages={languages}/>
						<Button onClick={() => fetchUser()} variant={"violetSelect"} className="p-0 h-8 w-8 my-4 mx-2 rounded-xl absolute top-0 right-0"> 
							<IoReload />
						</Button>
					</div>
				:
				<div className="flex flex-col gap-3 max-w-[450px] p-4 shadow-lg bg-white mt-[20vh] rounded-lg">
					<h1 className="text-xl text-[#835BD2] text-center">Добро пожаловать на наш сайт!</h1>
					<p className="text-lg text-gray-500 text-center">Для начала работы нужно заполнить свой профиль, пройдите мини обучение и мы проведем вас до первого урока!</p>
					<Button 
						variant={"violetSelect"}
						onClick={() => {
							createAchivments(user.id)
							fetchUser()
						}}
					>
						Начать!
					</Button>
				</div>
				}
			</div>
		</div>
	)
}

export default SettingsPage
