"use client"

import { Button } from "@/components/ui/button";
import { getUserById } from "@/data/user";
import { BookedLesson, Teacher, User } from "@prisma/client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { FaMessage, FaUser } from "react-icons/fa6";
import getUserLessons from "./actions/profile/getUserLessons";
import PageLessonNear from "./pageLessonNear";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { IoIosArrowDown } from "react-icons/io";
import PageLesson from "./pageLesson";


type Props = {
	userId: string;
	setChoosen: any;
	teacher: Teacher;
}

const UserBlock = ({userId, setChoosen, teacher}: Props) => {
	const [user, setUser] = useState<User | null>(null);
	const [lesson, setLesson] = useState<BookedLesson[] | null>(null);
	const [openAccord, setOpenAccord] = useState<boolean>(false)

	useEffect(() => {
		const fetchUser = async () => {
			const data = await getUserById(userId);
			if (data) {
				setUser(data);
			}
		};

		const fetchLessons = async () => {
			const data = await getUserLessons({teacherId: teacher.id, userId: userId});
			if (data) {
				setLesson(data);
			}
		};

		fetchUser();
		fetchLessons();
	}, [userId, teacher.id]);

	return (
		<div className="w-full border rounded-lg border-gray-200 shadow-sm flex flex-col items-center justify-between gap-2 p-2">
			<div className="w-full flex gap-2 justify-between">
				<div className="flex items-center gap-2">
					<Image src={user?.image ? user.image : ""} alt="userImage" width={70} height={70} className="rounded-full"/>
					<div className="flex flex-col items-start justify-center text-gray-400 font-medium">
						<p>{user?.name}</p>
						<p>{user?.surname}</p>
					</div>
				</div>
				<div className="flex flex-col gap-2 items-end">
					<Button className="h-7 flex gap-2 font-medium" variant={"violetSelect"} onClick={() => setChoosen(user?.id)}>
						<FaUser/>Профиль
					</Button>
					<Button className="h-7 flex gap-2 bg-blue-400 hover:bg-blue-500 font-medium" variant={"violetSelect"}>
						<FaMessage/>Чат
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2 w-full">
				<Accordion type="single" collapsible>
					<AccordionItem value="item-1" className="border-blue-300 border-2 rounded-lg">
						<AccordionTrigger className="w-full flex justify-between p-0 items-center px-3 relative" onClick={() => {setOpenAccord(!openAccord)}}>
							{lesson?.slice(0, 1).map((data, index) => (
								<div className="" key={index}>
									<PageLessonNear lesson={data}/>
								</div>
							))}
							<div className="w-6 h-6 bg-blue-400 rounded-lg absolute right-3 z-50 flex justify-center text-lg items-center text-white">
								<IoIosArrowDown className={`rotate-${openAccord ? "180" : "0"} transition-all`}/>
							</div>
						</AccordionTrigger>
						<AccordionContent className="mr-4 p-0 px-3">
							<div className="text-sm font-medium text-start text-blue-400">
								Следующие занятия:
							</div>
							<div className="mt-[0.5rem] flex flex-col gap-2">
								{lesson?.slice(1).map((data, index) => ( // Изменено на slice(1)
									<div className="" key={index}>
										<PageLesson lesson={data}/>
									</div>
								))}
							</div>
						</AccordionContent>
					</AccordionItem>
				</Accordion>	
			</div>
		</div>
	);
}

export default UserBlock;
