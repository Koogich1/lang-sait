"use client"

import { Input } from "@/components/ui/input"
import { BsCopy } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import TeacherInterface from "./interface/teacher-interface";
import ModalNewTeacher from "./modal/newTeacherFirst";
import LogoUpload from "./logoUpload";
import IsHasDates from "@/actions/hasDates";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import getUserByTeacherId from "@/actions/getUserByTeacherId";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CardProfile = () => {
	const [dates, hasDates] = useState(false)
	const [user, setUser] = useState<User | null>(); 
	const [teacher, setTeacher] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/info');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
      }
    };

    fetchUser();
  }, []);

	/*
	useEffect(() => {
		const fetchData = async () => {
			const isDates = await IsHasDates();
			if (isDates === true) {
				hasDates(true);
			}
		};
		fetchData();
	}, []);
	*/

	


	const imgProfile = (
		<LogoUpload />
  );

	if(!user){
		return
	}

 return(
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
			<div className='flex relative'>
				<div className="md:w-[330px] h-[485px] lg:h-[525px] lg:w-[360px] xl:w-[380] xl:h-[580] 2xl:w-[400px] bg-white p-6 rounded-3xl shadow-lg w-full mt-10 text-gray-600">
					<div>
					</div>
					<div className="flex flex-col justify-center items-center w-full text-lg">
						<div className="w-full">
							<div className="flex justify-center">
								<div className="lg:w-[12rem] lg:h-[12rem] w-[10rem] h-[10rem] rounded-full">
									{imgProfile}
								</div>
							</div>
							<div className="flex w-full justify-center text-lg font-semibold pt-3 gap-1 lg:text-xl">
								<a className="">{user?.name}</a>
								<a className="">{user?.surname}</a>
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
								<div className="pt-1 flex items-center justify-between w-full text-base lg:text-lg">
									<p>Преподаватель:</p>
									{teacher ? 
										teacher.name 
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
						<div className="flex justify-between pt-3 gap-2.5">
							<Link href={"/chats/conversations"} className="w-[50%] h-[3rem]">
								<Button variant="violetSelect" className="w-full h-[3rem] rounded-xl shadow-none bg-[#699BD8] hover:bg-[#527aab]">
									Перейти в чат
								</Button>
							</Link>
							<div 
							className="relative h-full hover:bg-gray-200 rounded-lg transition-all"
							onClick={() => {
								const notify = () => toast(
									<p className='text-base'>
										{`Почта скопированна`}
									</p>
								 )
								 notify()
							}}
							>
								<Input
								type="text"
								value={`${user?.email}`}
								disabled
								className="text-[#527aab] h-[3rem]"
								>
								</Input>
								<Button 
								className={`absolute top-0 left-0 w-full h-full bg-transparent hover:bg-transparent flex justify-end opacity-50 hover:opacity-100`}
								title="Копировать"
								data-tooltip-text="Копировать"
							>
									<div>
										<BsCopy className="text-[#527aab]"/>
									</div>
								</Button>
							</div>
						</div>
					</div>
				</div>
				{user?.role === "TEACHER" ? 
				<div>
					<TeacherInterface />
				</div>
				: 
				""
				}
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