"use client"

import { currentUser } from "@/lib/auth"
import { Application, User } from "@prisma/client"
import { useEffect, useState } from "react"
import getAllAplication from "../../actions/getAllAplication"
import UserInfo from "./components/userInfo"
import { TbSend } from "react-icons/tb";
import { Button } from "@/components/ui/button"
import { FaBoxArchive, FaFilter, FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6"
import { HiArrowNarrowRight, HiCheck } from "react-icons/hi"
import accept from "./actions/accept"
import { FaTimesCircle } from "react-icons/fa"
import reject from "./actions/reject"
import cansel from "./actions/cansel"
import addUser from "./actions/addUser"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {
	user: User,
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	
	// Определение склонения месяцев
	const months = [
			"января", "февраля", "марта", "апреля", "мая", "июня",
			"июля", "августа", "сентября", "октября", "ноября", "декабря"
	];
	
	// Форматируем дату
	const day = date.getDate();
	const month = months[date.getMonth()];
	const hours = String(date.getHours()).padStart(2, '0'); // Форматируем часы
	const minutes = String(date.getMinutes()).padStart(2, '0'); // Форматируем минуты
	
	return `${day} ${month} в ${hours}:${minutes}`;
};


const languageTranslation: Record<string, string> = {
	China: "Китайский",
	Korean: "Корейский",
	English: "Английский",
	German: "Немецкий",
};

const Applications = ({ user }: { user: User }) => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [currAclication, setCurrAplication] = useState<Application[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const fetchApplications = async () => {
    const data = await getAllAplication(user.teacherId);
    if (data) {
      setApplications(data);
      filterApplication("all", data);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user.teacherId]);

  const filterApplication = (type: string, applicationsData: Application[]) => {
    setIsTransitioning(true);
    setTimeout(() => {
      let filteredApplications;

      if (type === "all") {
        filteredApplications = applicationsData.filter(data => !data.isArchive);
      } else if (type === "adding") {
        filteredApplications = applicationsData.filter(data => data.format === "addTeacher" && !data.isArchive);
      } else if (type === "accept") {
        filteredApplications = applicationsData.filter(data => data.format === "dayFix" && !data.isArchive);
      } else if (type === "none") {
        filteredApplications = applicationsData.filter(data => data.id === "1" && !data.isArchive);
      } else if (type === "archive") {
        filteredApplications = applicationsData.filter(data => data.isArchive);
      } else {
				filteredApplications = applications
			}

      setCurrAplication(filteredApplications);
      setIsTransitioning(false);
    }, 300); // Match this timeout to transition duration
  };

	return (
		<>
			<ToastContainer
        position="bottom-left"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
			<div className="w-full flex lg:flex-col gap-3 mt-3">
				<h1 className="text-lg font-ligth text-gray-400 flex items-center gap-1">
					<FaFilter />
					<span>Фильтры</span>
				</h1>
				<DropdownMenu>
					<DropdownMenuTrigger className="lg:hidden">Open</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Profile</DropdownMenuItem>
						<DropdownMenuItem>Billing</DropdownMenuItem>
						<DropdownMenuItem>Team</DropdownMenuItem>
						<DropdownMenuItem>Subscription</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="w-full gap-2 hidden lg:flex">
          <div
            className="bg-purple-500 hover:bg-purple-600 text-white gap-1 rounded-lg px-3 py-1 hover:scale-[1.04] transition-all cursor-pointer flex items-center"
            onClick={() => filterApplication("all", applications)}
          >
            Все
          </div>
          <div
            className="bg-blue-400 text-white gap-1 px-3 hover:bg-blue-500 py-1 rounded-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center"
            onClick={() => filterApplication("adding", applications)}
          >
            <TbSend className="" />
            <p>Заявки на обучение</p>
          </div>
          <div
            className="bg-green-600 text-white gap-1 px-3 py-1 hover:bg-green-700 rounded-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center"
            onClick={() => filterApplication("accept", applications)}
          >
            <HiCheck className="text-xl" />
            <p>Подтверждение занятия</p>
          </div>
          <div
            className="bg-teal-500 hover:bg-teal-600 text-white gap-1 px-3 py-1 rounded-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center"
            onClick={() => filterApplication("none", applications)}
          >
            <HiArrowNarrowRight />
            <p>Предложение о переносе</p>
          </div>
          <div
            className="bg-gray-400 hover:bg-gray-500 text-white gap-1 px-3 py-1 rounded-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center"
            onClick={() => filterApplication("archive", applications)}
          >
            <FaBoxArchive />
            <p>Архив</p>
          </div>
        </div>
				<div className="w-full h-[1px] bg-gray-200 hidden lg:block" />
			</div>
			{currAclication.length > 0 ? 
				<div className={`mt-5 grid grid-cols-1 lg:grid-cols-2 gap-3 transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
					{currAclication.map((data) => (
						<div className="w-full h-[8rem] relative border border-gray-200 rounded-xl p-2" key={data.id}>
							 <p className=" absolute top-[-0.52rem] px-1 left-[0.3rem] bg-white text-xs h-4 text-gray-400 font-ligth">{formatDate(data.date.toJSON())}</p>
								<div className="text-gray-400 flex justify-between">
										<div className="flex flex-col justify-between h-[7rem]">
												<div className={`
													text-${data.isArchive ? "gray-400" : data.format === "addTeacher" ? "blue-400" : data.format === "dayFix" ? "green-600" : ""} font-semibold flex gap-1 items-center`}>
														{data.format === "addTeacher" ? (
																<TbSend className=""/>
														) : (
																<HiCheck className="text-xl"/>
														)}
														<p>{data.format === "addTeacher" ? `Заявка на обучение, язык: ${languageTranslation[data.language ? data.language : ""]}` : "Подтверждение занятия"}</p>
												</div>
												<UserInfo userId={data.senderId}/>
												<Button className="h-7 left-0 w-[6rem] font-medium text-sm" variant={"violetSelect"}>Профиль</Button>
										</div>
										<div className="flex flex-col h-[6.85rem] justify-between">
												{data.isArchive ? 
													<div className="h-[6.85rem] w-[6.85rem]">
														{data.status === "accepted" && 
															<div className="w-full h-full flex items-center flex-col justify-between pb-4 relative border-2 border-green-500 rounded-lg">
																<h1 className="text-lg font-semibold text-green-500">Принята</h1>
																<FaRegCircleCheck className="text-5xl scale-150 text-green-500"/>
																<Button 
																	className="cursor-pointer absolute flex flex-col items-center justify-center w-full h-[6.6rem] rounded-lg text-white scale-105 mb-2 hover:text-white opacity-0 hover:opacity-100 z-50 font-semibold text-lg bg-red-500 hover:bg-red-600 transition-all" 
																	variant={"shadow2"}
																	onClick={() => {
																		cansel(data.id)
																		fetchApplications()
																	}}
																>
																	<p className="absolute top-[1px]">Отменить</p>
																	<FaTimesCircle className="text-5xl scale-125 mt-6" />
																</Button>
															</div>
														}
														{data.status === "rejected" && 
															<div className="w-full h-full flex items-center flex-col justify-between pb-4 relative border-2 border-red-500 rounded-lg">
																<h1 className="text-lg font-semibold text-red-500">Отклонена</h1>
																<FaRegCircleXmark className="text-5xl scale-150 text-red-500"/>
																<Button 
																	className="cursor-pointer absolute flex flex-col items-center justify-center w-full h-[6.6rem] rounded-lg text-white scale-105 mb-2 hover:text-white opacity-0 hover:opacity-100 z-50 font-semibold text-lg bg-red-500 hover:bg-red-600 transition-all" 
																	variant={"shadow2"}
																	onClick={() => {
																		cansel(data.id)
																		fetchApplications()
																	}}
																>
																	<p className="absolute top-[1px]">Отменить</p>
																	<FaTimesCircle className="text-5xl scale-125 mt-6" />
																</Button>
															</div>
														}
													</div>
												: 
													(
														<>
																<Button 
																		className="bg-green-600 hover:bg-green-700 px-5 font-medium h-[3.18rem]" 
																		variant={"violetSelect"}
																		onClick={() => {
																				if(data.format === "addTeacher"){
																					addUser({user: user, toWho: data.senderId, language: data.language})
																					toast(`Пользователь добавлен`)
																				}
																				accept(data.id);
																				fetchApplications();
																		}}
																>
																	Принять
																</Button>
																<Button 
																		className="px-5 h-[3.18rem] bg-red-500 font-medium hover:bg-red-600" 
																		variant={"violetSelect"}
																		onClick={() => {
																			reject(data.id)
																			fetchApplications()
																		}}
																>
																	Отклонить
																</Button>
														</>
													) 
											}
											</div>
									</div>
							</div>
					))}
				</div>
			: 
			<div className='w-full min-h-[30.4vh] flex items-center justify-center'>
				<div className='flex flex-col items-center justify-center'>
					<h1 className='text-5xl scale-150 pb-5'>🙋‍♀️</h1>
					<h1 className='text-lg font-medium text-gray-400'>Заявок от учеников пока нет!</h1>
				</div>
			</div>
					
		}
		</>
	)
}

export default Applications