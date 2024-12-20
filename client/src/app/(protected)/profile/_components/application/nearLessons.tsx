"use client"

import { BookedLesson, User } from "@prisma/client"
import { useCallback, useEffect, useState } from "react";
import getUserLessons from "../actions/homework/getUserLessons";
import NearLessonBlock from "../nearLesson/nearLessonBlock";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HashLoader } from "react-spinners";

type Props = {
	user: User;
}

const NearLessons = ({user}: Props) => {
	const[lessons, setLessons] = useState<BookedLesson[]>()

	const fetchLessons = useCallback(async() => {
		const data = await getUserLessons({userId: user.id})
		if(data){
			setLessons(data)
		}
	}, [])

	useEffect(() => {
		fetchLessons()
	}, [fetchLessons])

	

	return (
		<ScrollArea className="w-full h-[300px] border rounded-lg shadow-md border-gray-100">
			<div className="flex flex-col gap-1 p-2">
				{lessons && lessons?.length > 0 ?
				lessons.map((data, index) => (
					<div key={index}>
						<NearLessonBlock lesson={data}/>
					</div>
				))
				:
				<div className="h-[280px] w-full flex items-center justify-center flex-col text-gray-400">
					<HashLoader size={50} color="#9ca3af"/>
					<h1 className="mt-3">Занятий нет...</h1>
					<p>Запишитесь!</p>
				</div>
				}
			</div>
		</ScrollArea>
	)
}

export default NearLessons