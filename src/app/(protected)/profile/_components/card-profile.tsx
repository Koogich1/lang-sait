"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import Link from "next/link";
import 'react-toastify/dist/ReactToastify.css';
import GetTeacher from "./actions/getTeacher";
import { Teacher } from "./actions/typeUser"
import getAllSubscription from "@/actions/getAllSubscription";
import { UserRole, UserSubscriptions } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import TeacherBox from "./teacherBox";
import { currentUser } from "@/lib/auth";
import GetUser from "./actions/getUser";

type allInf = {
	user: {
			id: string;
			name: string | null;
			surname: string | null;
			mail: string | null;
			favourites: string[];
			image: string | null;
			role: UserRole;
			teacherUser: {
					id: string;
			};
	};
}

const CardProfile = () => { 
	const	[userSubs, setUserSubs] = useState<UserSubscriptions[] | null>([])
	const [user, setUser] = useState<Teacher | allInf | null>(); 
	

  useEffect(() => {
    const fetchUser = async () => {
			const userdb = await currentUser()
			if(!userdb)return;
			if(userdb.role === "USER"){
				const allInf = await GetTeacher()
				if(allInf){
					setUser(allInf)
				}
			}else{
				const allInf = await GetUser()
				if(allInf){
					setUser(allInf)
				}
			}
    };
    fetchUser();
  }, []);

	if(!user){
		return
	}


 return(
	<>
		<div className='flex relative'>
			<div></div>
				<div className="md:w-[330px] h-[455px] lg:h-[490px] lg:w-[360px] xl:w-[380] 2xl:w-[400px] bg-white p-6 rounded-3xl shadow-lg w-full mt-10 text-gray-600">
					<div>
					</div>
					<div className="flex flex-col justify-center items-center w-full text-lg">
						<div className="w-full">
							<div className="flex justify-center">
								<div className="lg:w-[12rem] lg:h-[12rem] w-[10rem] h-[10rem] rounded-full">
									{user.user.image ? 
									<img className="w-full h-full rounded-full object-cover" src={`${user.user.image}`} alt="" /> 
									:
										<div></div>
										}
								</div>
							</div>
							<div className="flex w-full justify-center text-lg font-semibold pt-3 gap-1 lg:text-xl">
								<a className="">{user.user?.name}</a>
								<a className="">{user.user?.surname}</a>
							</div>
						</div>
						<div className="pt-3 w-full text-base lg:text-lg">
							<h3 className="font-semibold">
								Выбранный язык: <a className="font-normal">Английский</a>
								<ul className="w-full pt-3">
									<li 
									className="flex justify-between items-center font-normal">
										<p>- Уровень владения:</p>
										<Button 
										className="bg-[#699BD8] font-bold rounded-xl shadow-md hover:bg-[#527aab] lg:text-lg"
										>
											A0
										</Button>
									</li>
								</ul>
								<div className="pt-1 flex items-center justify-between w-full lg:text-lg mt-3 gap-3">
									<Link href={"/chats/conversations"} className="w-1/2 h-[3rem]">
										<Button variant="violetSelect" className="w-full h-[3rem] rounded-xl shadow-none bg-[#699BD8] hover:bg-[#527aab]">
											Перейти в чат
										</Button>
									</Link>
									{user.user.teacherUser ? 
											<DropdownMenu >
											<DropdownMenuTrigger asChild>
												<div className="hover:bg-[#835BD2] transition-all bg-white text-[#835BD2] border-2 border-[#835BD2] text-sm hover:text-white font-semibold p-[0.65rem] px-5 rounded-full scale-105 cursor-pointer">
													Преподаватели
												</div>
											</DropdownMenuTrigger>
											<DropdownMenuContent className="border-2 border-gray-300">
												<DropdownMenuLabel className="text-lg text-gray-600">Мои преподаватели</DropdownMenuLabel>
												<DropdownMenuSeparator />
												{userSubs?.map((subs) => (
													<DropdownMenuItem key={subs.id} className="p-0 m-0 w-full">
														<Link href={'/profile/lessonsBuy'} className="w-full">
																<TeacherBox subs={subs} />
														</Link>
													</DropdownMenuItem>
												))}
												<DropdownMenuSeparator />
												<DropdownMenuItem className="w-full p-1 m-0">
													<Link href={'/profile/lessonsBuy'} className="w-full"><Button className="w-full text-sm" variant='violetSelect'>Записаться на урок</Button></Link>
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
										: 
										<div>
											<Link href={"/teachers"}>
												<Button className="bg-[#835BD2] font-bold text-base lg:text-lg rounded-xl transition-all shadow-md hover:bg-[#7954c2] hover:shadow-none">
													Записаться!
												</Button>
											</Link>
										</div>
									}
								</div>
							</h3>
						</div>
					</div>
				</div>
				{ /* user.user.=== "TEACHER" ? 
				<div>
					<TeacherInterface />
				</div>
				: 
				""
				*/}
				{/* user?.role === "TEACHER" && dates === true ? 
					""
					:
					<ModalNewTeacher 
					user={user}
					>
				*/}
				
			</div>
	</>
 )
}

export default CardProfile