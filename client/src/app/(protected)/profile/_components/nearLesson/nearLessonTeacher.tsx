"use client"

import { User } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import getUserByTeacherId from "../actions/application/getUserByTeacherId"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { FaUser } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Props = {
	teacherId: string
}

const NearLessonTeacher = ({teacherId}: Props) => {
	const [user, setUser] = useState<User | null>(null)

	const fetchTeacher = useCallback(async() => {
		const data = await getUserByTeacherId(teacherId)
		if(data){
			setUser(data)
		}
	}, [teacherId])



	useEffect(() => {
		fetchTeacher()
	}, [])

	return (
		<div className="w-full p-1 shadow-md rounded-lg border border-gray-100 flex justify-between items-center max-w-[210px]">
			<div className="flex gap-1">
				{user?.image ?
					<Image 
						src={user?.image}
						alt="Avatar"
						width={30}
						height={30}
						className="rounded-full"
					/>
					:
					<Skeleton className="w-[30px] h-[30px] rounded-full"/>
				}
				<div className="text-xs">
					<h1>{user?.name}</h1>
					<h1>{user?.surname}</h1>
				</div>
			</div>
			<Link href={`/teacher/${teacherId}`} className="w-[30px] h-[30px] bg-blue-400 hover:bg-blue-500 flex items-center justify-center text-white rounded-lg">
					<FaUser className="text-white"/>
			</Link>
		</div>
	)
}

export default NearLessonTeacher