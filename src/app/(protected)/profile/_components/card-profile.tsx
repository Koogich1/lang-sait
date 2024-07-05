"use client"

import Image from "next/image"
import { Input } from "@/components/ui/input"
import { BsCopy } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import TeacherInterface from "./interface/teacher-interface";
import ModalNewTeacher from "./modal/newTeacherFirst";
import LogoUpload from "./logoUpload";

type Props = {
	user: any
}
const CardProfile = ({user}: Props) => {


	const teachEmail = user?.email ?? ''; 

	const imgProfile = user?.image ? user?.image : (
		<LogoUpload />
  );

 return(
			<div className="flex">
				<div className="md:w-[330px] 2xl:w-[400px] bg-white p-6 rounded-3xl shadow-lg w-full mt-10">
					<div>
					</div>
					<div className="flex flex-col justify-center items-center w-full text-lg text-[#4D6785]">
						<div className="w-full">
							<div className="flex justify-center">
								<div className="w-[8rem] h-[8rem] rounded-full">
									{imgProfile}
								</div>
							</div>
							<div className="flex w-full justify-center font-semibold pt-5 gap-1">
								<a className="">{user?.name}</a>
								<a className="">{user?.surname}</a>
							</div>
						</div>
						<div className="pt-5 w-full">
							<h3 className="font-semibold">
								Выбранный язык: <a className="font-normal">Английский</a>
								<ul className="w-full pt-3">
									<li 
									className="flex justify-between items-center font-normal">
										<p>- Уровень владения языком:</p>
										<Button 
										className="bg-[#699BD8] font-bold text-lg rounded-xl shadow-md hover:bg-[#527aab]"
										>
											A0
										</Button>
									</li>
									<li 
									className="pt-1 flex justify-between items-center font-normal">
										<p>- Курс:</p>
										<Button 
										className="bg-[#699BD8] font-bold text-lg rounded-xl shadow-md hover:bg-[#527aab]">
											Гибкий
										</Button>
									</li>
								</ul>
								<div className="pt-3 flex items-center justify-between w-full">
									<p>Преподаватель:</p>
									<Button className="flex items-center gap-2 h-[60px] bg-white text-[#699BD8]" variant='shadow'>
										<p>Елизовета Б. </p>
										<div className="w-[50px] h-[50px] rounded-full overflow-hidden lg:hidden 2xl:block">
											<Image
											className="object-cover w-full h-full"
											src="/teach4.jpg"
											alt="teacher"
											width={200}
											height={200}
											/>
										</div>
									</Button>
								</div>
							</h3>
						</div>
						<div className="flex justify-between pt-3 gap-2.5">
							<Button variant="violetSelect" className="w-[50%] h-[3rem] rounded-xl shadow-none bg-[#699BD8] hover:bg-[#527aab]">
								Перейти в чат
							</Button>
							<div className="relative h-full">
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
				{user?.role === "TEACHER" ? 
				<ModalNewTeacher 
				user={user}
				/> :
				""
				}
				
			</div>
 )
}

export default CardProfile