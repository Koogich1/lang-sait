'use client'

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Language, User } from "@prisma/client"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { FaUser } from "react-icons/fa6"
import findUserLanguages from "../../settings/components/languages/findUserLanguages"
import { IoSettingsOutline } from "react-icons/io5"
import Image from "next/image"
import TeacherInfo from "./components/teacherInfo"

type Props = {
	user: User
}

const UserInfo = ({user}: Props) => {
	const [languages, setLanguages] = useState<Language[]>([])
	const [activeLanguage, setActiveLanguage] = useState<Language>()

	const getUserLanguages = useCallback(
		async() => {
			const data = await findUserLanguages(user.id)
			if(data){
				setActiveLanguage(data[0])
				setLanguages(data)
			}
		}, [user.id]
	)

	useEffect(() => {
		getUserLanguages()
	},[getUserLanguages])

	return (
		<div className="md:w-[330px] h-[475px] lg:h-[510px] lg:w-[360px] xl:w-[380] 2xl:w-[400px] bg-white p-6 rounded-3xl shadow-lg w-full mt-10 text-gray-500">
			<div className="flex flex-col justify-center items-center w-full text-lg">
				<div className="w-full">
					<div className="flex justify-center">
						<div className="lg:w-[12rem] lg:h-[12rem] w-[10rem] h-[10rem] rounded-full">
							{user.image ? 
								<Image width={1000} height={1000} className="w-full h-full rounded-full object-cover" src={`${user.image}`} alt="" /> 
								: 
								<Skeleton className="w-full h-[12rem] rounded-full p-2 gap-3 flex items-center justify-center text-center text-gray-400 flex-col">
								 		<FaUser className="text-5xl"/>
										<h1 className="text-sm">
											Загрузите изображение, перейдите в раздел настройки.
										</h1>
								 </Skeleton>
							}
						</div>
							</div>
							<div className="flex w-full justify-center text-lg font-semibold pt-3 gap-1 lg:text-xl">
								<a>{user.name}</a>
								<a>{user?.surname}</a>
							</div>
						</div>
						<div className="pt-3 w-full text-base lg:text-lg">
						<div className="font-semibold">
							<div className="flex gap-3 items-center justify-between">
								<p className="text-nowrap">
									Изучаю языки:
								</p>
								<div className="flex gap-2">
									{!languages || languages.length == 0 ?
										<Link href={"/profile/settings"}>
											<Button className="w-full h-8" variant={"violetSelect"}>
												Добавьте языки
											</Button>
										</Link>
										:
										languages.map((data) => (
											<div 
												onClick={() => {setActiveLanguage(data)}}
												key={data.id}
											>
												{data.language === "China" ? 
													<div className={`bg-[#f20520] p-2 overflow-hidden hover:opacity-100 hover:scale-105 cursor-pointer transition-all relative max-h-[40px] w-full flex flex-col justify-between rounded-xl shadow-lg ${activeLanguage?.language === data.language ? "opacity-100" : "opacity-30"}`}>
														<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
														<h1 className="text-[#f7e627] text-sm z-50 text-center" style={{fontFamily: "Belepotan"}}>
															Китайский
														</h1>
													</div> 
													: ""}
													{data.language === "English" ?
													<div className={`relative hover:opacity-100 hover:scale-105 cursor-pointer transition-all ${activeLanguage?.language === data.language ? "opacity-100" : "opacity-30"}`}>
														<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
															<div className="bg-[#4865d8] p-2 overflow-hidden relative max-h-[40px] flex flex-col justify-between rounded-xl shadow-lg">
																<h1 className="text-white text-sm z-50" style={{fontFamily: "Corean"}}>
																	Английский
																</h1>
														</div>
													</div>
													: ""}
													{data.language === "German" ? 
													<div className={`bg-amber-500 w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-xl shadow-lg ${activeLanguage?.language === data.language ? "opacity-100" : "opacity-30"}`}>
														<h1 className="text-amber-900 text-sm text-center z-50 font-semibold">
															НЕМЕЦКИЙ
														</h1>
													</div>
													: ""}
													{data.language === "Korean" ? 
													<div className={`bg-[#ffe2ef] w-full p-2 overflow-hidden transition-all hover:opacity-100 hover:scale-105 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-xl ${activeLanguage?.language === data.language ? "opacity-100" : "opacity-30"}`}>
														<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
														<h1 className="text-[#b82761] text-sm text-center z-50" style={{fontFamily: "Belepotan"}}>
															КОРЕЙСКИЙ
														</h1>
												</div>
													: ""}
											</div>
										))
									}
								</div>
							</div>
							<ul className="w-full pt-3">
								<li className="flex justify-between items-center font-normal">
									<p>- Уровень владения: </p>
									<Button className="bg-[#699BD8] font-bold rounded-xl shadow-md hover:bg-[#527aab]">
										{activeLanguage?.level.toUpperCase()}
									</Button>
								</li>
							</ul>
							<div>
								<p className="font-normal">- Преподаватель:</p>
							</div>
							<div className="mt-3">
								{user.TeacherS.map((data, key) => (
									<TeacherInfo key={key} teacherID={data} activeLanguage={activeLanguage ? activeLanguage : null}/>
								))}
							</div>
							<div className="pt-1 flex items-center justify-between w-full lg:text-lg mt-3 gap-3">
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserInfo