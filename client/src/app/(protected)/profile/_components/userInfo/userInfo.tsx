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
import { ClipLoader, HashLoader } from "react-spinners"

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
		<div className="bg-white p-3 py-4 rounded-3xl shadow-lg w-full text-gray-500">
			<div className="flex flex-col justify-center items-center w-full text-lg">
				<div className="w-full">
					<div className="flex justify-center">
						<div className="lg:w-[8rem] lg:h-[8rem] w-[8rem] h-[8rem] rounded-full">
							{user.image ? 
								<Image width={1000} height={1000} className="w-full h-full rounded-full object-cover" src={`${user.image}`} alt="" /> 
								: 
								<Skeleton className="w-full h-[8rem] rounded-full p-2 gap-3 flex items-center justify-center text-center text-gray-400 flex-col">
								 		<FaUser className="text-5xl"/>
										<h1 className="text-sm">
											Загрузите изображение, перейдите в раздел настройки.
										</h1>
								 </Skeleton>
							}
						</div>
							</div>
							<div className="flex w-full justify-center text-lg font-semibold pt-3 gap-2 lg:text-xl items-center">
								<FaUser className="w-6 h-6 p-1 text-white bg-gray-500 rounded-md"/>
								<div className="flex gap-1">
									<span>{user.name}</span>
									<span>{user?.surname}</span>
								</div>
							</div>
							<div className="w-full h-[1px] bg-gray-200 mt-2"/>
							<div className="w-full flex gap-3 text-base items-center mt-3">
								<p>Возраст:</p>
								<p className="p-0 w-7 h-7 bg-blue-400 hover:bg-blue-500 flex items-center justify-center text-white rounded-sm transition-all cursor-pointer">{user.age}</p>
							</div>
							<div className="mt-3 w-full flex flex-col gap-1 text-base items-start">
								<p>{languages.length > 1 ? "Языки:" : "Язык:"}</p>
								<div className="grid grid-cols-3 gap-1">
								{!languages || languages.length == 0 ?
										<Link href={"/profile/settings"}>
											<Button className="w-full h-8 text-sm" variant={"violetSelect"}>
												Добавьте языки
											</Button>
										</Link>
										:
										languages.map((data) => (
											<div 
												onClick={() => {setActiveLanguage(data)}}
												key={data.id}
												className=""
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
							<div className="flex gap-2 items-center mt-3">
								<p className="text-base">Уровень знаний:</p>
								<Button className="p-0 h-8 px-3 bg-blue-400 hover:bg-blue-500" variant={"violetSelect"}>{activeLanguage?.level ? activeLanguage.level : <div><HashLoader size={12} className="text-white" color="#ffffff"/></div>}</Button>
							</div>
						</div>
						<div className="w-full h-[1px] bg-gray-200 mt-4"/>
						<div className="pt-3 w-full text-base lg:text-lg">
						<div className="font-semibold">
							{user.TeacherS.length > 0 ?
							<div>
								<div>
									<p className="font-normal text-base">
										{user.TeacherS.length === 1 && "Преподаватель:"} {user.TeacherS.length > 1 && "Преподаватели:"}
									</p>
								</div>
								<div className="mt-1">
									{user.TeacherS.map((data, index) => (
										<div key={index}>
											<TeacherInfo teacherID={data}/>
										</div>
									))}
								</div>
							</div>
							:
							<div>
								<div className="font-normal text-base flex gap-2 items-center pb-3">
									<p>Преподаватель...</p>
									<ClipLoader size={20} color="#6b7280" className="text-gray-500"/>
								</div>
								<Link className="mt-3 w-full" href={"/teachers"}>
									<Button className="w-full h-12 font-bold" variant={"violetSelect"}>
										Найти преподавателя
									</Button>
								</Link>
							</div>
							}
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserInfo