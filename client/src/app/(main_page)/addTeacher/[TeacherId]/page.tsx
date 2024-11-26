"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import getTeacherById from "../../teacher/components/findTeacherByID";
import Image from "next/image";
import { FaAngleDown, FaPlay } from "react-icons/fa6";
import VideoTeacher from "../modal/videoTeacher";
import { Button } from "@/components/ui/button";
import { FaDollarSign } from "react-icons/fa";
import PriseList from "../modal/priseList";
import HeaderTeacher from "../../teacher/header";
import createApplicationAdding from "../actions/createApplication";
import WaitAccess from "../modal/waitAccess";
import findIsTeacherAdded from "../actions/findIsTeacherAdded";
import { languageVariants } from "@prisma/client";

const truncateText = (text: string, maxLength: number) => {
	if (text.length <= maxLength) {
		return text;
	}
	return text.substring(0, maxLength) + '...';
};

interface Teacher {
	id: string;
	teacherId: string;
	videoSrc: string;
	userInfo: {
			image: string | null;
			name: string | null;
			surname: string | null;
	};
	teacherInfo: {
			aboutMe: string;
			languages: {
					language: string;  // поменяйте $Enums.languageVariants на string
					level: string;
					prefers: string;   // поменяйте $Enums.languagePrefers | null на string
			}[];
			lessonPrise: number;
	};
}

const Page = () => {
	const { TeacherId } = useParams()
	const [user, setUser] = useState<Teacher | null>(null)
	const [isTeacherAdded, setIsTeacherAdded] = useState<boolean>()
	const [open, setOpen] = useState<boolean>(false)
	const [openPrise, setOpenPrise] = useState(false)
	const [full, setFull] = useState<boolean>(false)
	const [access, setAccess] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)
	const router = useRouter()

	const [activeLanguage, setActiveLanguage] = useState<languageVariants>()

	
	useEffect(() => {
    const fetchUser = async () => {
        const data = await getTeacherById(TeacherId as string);
        if (data) {
            const isaAdded = await findIsTeacherAdded(data?.teacherId);
            setIsTeacherAdded(isaAdded);
            setUser(data);
        }
    };
    
    fetchUser();
}, [TeacherId]);  // Добавляем TeacherId



	if (!user) {
		return <div>загрузка... </div>
	}

	const fetchAdded = async() => {
		const isaAdded = await findIsTeacherAdded(user?.teacherId)
				if(isaAdded){
					setIsTeacherAdded(true)
				} else{
					setIsTeacherAdded(false)
				}
	}

	const sendApplication = async () => {
    setLoading(true); // Устанавливаем состояние загрузки в true
		if(activeLanguage){
			const result = await createApplicationAdding(user.teacherId, activeLanguage); // Ждем результат отправки заявки
			// Здесь мы подождем 1,5 секунды, прежде чем обновить состояние access
			setTimeout(() => {
				if(result){
					setAccess(result);
				}
    }, 2000); // Задержка на 1.5 секунды
		}
	}

	return (
		<>
			<HeaderTeacher />
			<div className="flex justify-center items-center w-full h-[75vh]">
				<div className="bg-white w-[90%] sm:w-[4/5] md:w-2/3 min-h-[350px] max-w-[750px] rounded-xl shadow-lg p-5 flex justify-between">
					<div className="flex flex-col items-center justify-center min-h-[310px] relative w-1/3 border border-gray-200 rounded-lg">
						<Image
							src={user?.userInfo.image ? user?.userInfo.image : ""}
							alt="Avatar"
							width={150}
							height={150}
							className="rounded-full shadow-sm object-cover"
						/>
						<p className="font-semibold text-[#835BD2] py-2">
							{user?.userInfo.name + " " + user?.userInfo.surname}
						</p>
						<div
							className="absolute w-7 h-7 rounded-sm bg-red-100 text-red-400 hover:bg-red-200 hover:text-red-500 top-1 right-1 transition-all flex items-center justify-center cursor-pointer"
							onClick={() => { setOpen(true) }}
						>
							<FaPlay />
						</div>
						<div
							className="absolute w-7 h-7 rounded-sm bg-green-100 text-green-500 hover:bg-green-200 hover:text-green-600 top-1 left-1 transition-all flex items-center justify-center cursor-pointer"
							onClick={() => { setOpenPrise(true) }}
						>
							<FaDollarSign />
						</div>
						<Button
							className="absolute w-[96%] h-10 rounded-sm bottom-0 m-1 shadow-none font-medium transition-all flex items-center justify-center cursor-pointer"
							variant={"violetSelect"}
							onClick={() => { router.push(`/teacher/${user.teacherId}`) }}
						>
							Перейти в профиль
						</Button>
					</div>
					<div className="w-2/3 pl-4 flex flex-col justify-between">
						<div className="w-full text-center font-medium text-[#835BD2] text-lg">Информация о учителе</div>
						<div
							className="hover:bg-gray-100 rounded-xl p-2 text-center cursor-pointer w-full transition-all"
							onClick={() => { setFull(!full) }}
						>
							<div
								className={`overflow-hidden transition-all duration-300 ease-in-out ${
									full ? "max-h-screen" : "max-h-[150px]"
								}`}
							>
								<p className={`text-sm select-none text-gray-400`}>
									{full ? user.teacherInfo.aboutMe : truncateText(user.teacherInfo.aboutMe, 300)}
								</p>
							</div>
							<p className={`text-2xl w-full text-gray-400 flex justify-center transition-transform duration-300 ease-in-out ${full ? "rotate-180" : "block"}`}>
								<FaAngleDown />
							</p>
						</div>
						<div className="flex flex-col gap-3 mt-2">
							<h1 className="text-sm text-[#835BD2] text-center font-medium">Выберите язык, который вы хотите изучать</h1>
						<div className="grid grid-cols-2 gap-2">
						{user.teacherInfo.languages.map((data) => (
								<div 
									onClick={() => {setActiveLanguage(data.language as languageVariants)}}
									key={data.language}
								>
								{data.language === "China" ? 
									<div className={`bg-[#f20520] p-2 overflow-hidden hover:opacity-100 cursor-pointer transition-all relative max-h-[40px] w-full flex flex-col justify-between rounded-xl shadow-lg ${activeLanguage === data.language as languageVariants ? "scale-105" : "opacity-30"}`}>
										<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
										<h1 className="text-[#f7e627] text-sm z-50 text-center" style={{fontFamily: "Belepotan"}}>
											Китайский
										</h1>
									</div> 
									: ""}
									{data.language === "English" ?
									<div className={`relative hover:opacity-100 cursor-pointer transition-all ${activeLanguage === data.language as languageVariants ? "scale-105" : "opacity-30"}`}>
										<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
											<div className="bg-[#4865d8] p-2 overflow-hidden relative max-h-[40px] flex flex-col justify-between rounded-xl shadow-lg">
												<h1 className="text-white text-sm z-50" style={{fontFamily: "Corean"}}>
													Английский
												</h1>
										</div>
									</div>
									: ""}
									{data.language === "German" ? 
									<div className={`bg-amber-500 w-full p-2 overflow-hidden transition-all hover:opacity-100 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-xl shadow-lg ${activeLanguage === data.language as languageVariants ? "scale-105" : "opacity-30"}`}>
										<h1 className="text-amber-900 text-sm text-center z-50 font-semibold">
											НЕМЕЦКИЙ
										</h1>
									</div>
									: ""}
									{data.language === "Korean" ? 
									<div className={`bg-[#ffe2ef] w-full p-2 overflow-hidden transition-all hover:opacity-100 cursor-pointer relative max-h-[40px] flex flex-col justify-between rounded-xl ${activeLanguage === data.language as languageVariants ? "scale-105" : "opacity-30"}`}>
										<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
										<h1 className="text-[#b82761] text-sm text-center z-50" style={{fontFamily: "Belepotan"}}>
											КОРЕЙСКИЙ
										</h1>
								</div>
									: ""}
							</div>
							))}
						</div>
							<div className="flex gap-2">
							<Button 
								className="w-1/2" 
								variant={"shadow2"}
								onClick={() => {router.back()}}
							>
								Вернуться
							</Button>
							<Button 
								className={`w-1/2 ${isTeacherAdded ? "bg-green-400 text-green-700 hover:bg-green-500 hover:text-green-800" : ""}`}
								variant={"violetSelect"}
								disabled={!activeLanguage}
								onClick={() => {
									{isTeacherAdded ? 
										console.log('пупупу')
										:
										sendApplication()
									}
								}}
							>
								{isTeacherAdded ? "Записаться на урок" : "Отправить заявку"}
							</Button>
							</div>
						</div>
					</div>
				</div>
				<VideoTeacher openModal={open} setOpenModal={setOpen} videoSrc={user?.videoSrc ? user.videoSrc : ""} />
				<PriseList openModal={openPrise} setOpenModal={setOpenPrise} teacher={user} />
				<WaitAccess openModal={loading} setOpenModal={setLoading} access={access} visov={() => {fetchAdded()}}/>
			</div>
		</>
	)
}

export default Page;