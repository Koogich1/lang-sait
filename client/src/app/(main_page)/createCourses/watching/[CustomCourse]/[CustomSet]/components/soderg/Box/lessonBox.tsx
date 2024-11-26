"use client"

import findRasdels from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findRasdels";
import SettingsLesson from "@/app/(main_page)/createCourses/watching/components/modal/adding/SettingsLessons";
import { Button } from "@/components/ui/button";
import { Lessons } from "@prisma/client"; // Убедитесь, что у вас правильные импорты
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import findLessons from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findLessons";
import LessonInfo from "./lessionInfo";

interface CustomCourseSet {
	id: string;
	customRasdelId: string;
	description: string;
	createdAt: Date;
	position: number;
	lessons: Lessons[]; // Убедитесь, что это свойство существует
}

const LessonBox = () => {
	const [lessons, setLessons] = useState<CustomCourseSet[]>([]);
	const { CustomSet } = useParams();
	const [open, setOpen] = useState(false);
	const [course, setCourse] = useState<Lessons | undefined>();
	const [customSetId, setCustomSetId] = useState<string | undefined>();

	const fetchRasdels = useCallback(async () => {
		const fetchedLessons = await findLessons(CustomSet as string);
		if (fetchedLessons) {
			setLessons(fetchedLessons);
		}
	}, [CustomSet]);

	useEffect(() => {
		fetchRasdels();
	}, [fetchRasdels]); // Теперь fetchRasdels не будет вызывать предупреждения

	return (
		<div>
			<h1 className="text-xl font-extralight pb-2 border-b flex flex-col gap-10 mt-2">Добавленные Уроки</h1>
			{lessons?.map((data) => (
				<div key={data.id} className="border-y border-gray-100 p-1 py-3 my-2 px-3">
					{data.lessons.map((lesson) => (
						<div className="flex gap-3 justify-between" key={lesson.id}>
							<div className="flex gap-2">
								<Image
									src={lesson.photoUrl}
									alt="logo"
									width={125}
									height={125}
									className="w-[125px] shadow- border border-gray-200 rounded-lg h-[125px] object-cover"
								/>
								<div className="flex flex-col justify-between">
									<div className="flex flex-col">
										<p className="text-lg font-medium text-[#835BD2]">{lesson.name}</p>
										<div><LessonInfo rasdelId={lesson.rasdelId} /></div>
									</div>
									<Button variant={"violetSelect"} className="text-base font-medium h-9 w-[130px] py-2 px-3">
										Открыть урок
									</Button>
								</div>
							</div>
							<div>
								<div
									className="bg-gray-200 text-gray-400 flex items-center justify-center rounded-lg text-3xl w-10 h-10 hover:bg-gray-300 cursor-pointer transit"
									onClick={() => {
										setCustomSetId(data.id);
										setCourse(lesson);
										setOpen(true);
									}}
								>
									<IoSettingsSharp className="hover:rotate-90 transition-all" />
								</div>
							</div>
						</div>
					))}
				</div>
			))}
			<SettingsLesson setOpenModal={setOpen} openModal={open} lesson={course} customSetId={customSetId} visov={fetchRasdels} />
		</div>
	);
}

export default LessonBox;
