"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { getUserById } from "@/data/user"
import { User } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import getUserByTeacherId from "../actions/application/getUserByTeacherId"
import Image from "next/image"

const Teacher = ({teacherId} : {teacherId: string}) => {
	const [user, setUser] = useState<User | null>(null)

	const fetchInfoAboutTeacher = useCallback(
		async() => {
			const data = await getUserByTeacherId(teacherId)
			console.log(data)
			if(data){
				setUser(data)
			} 
	}, [teacherId])

	useEffect(() => {
		fetchInfoAboutTeacher()
	}, [fetchInfoAboutTeacher])

	if(!user){
		return(
			<div className="flex gap-2 items-center">
				<Skeleton className="w-[40px] h-[40px] rounded-full mt-[0.125rem]" />
				<div className="flex flex-col gap-1 justify-center">
					<Skeleton className="w-[80px] h-[15px] rounded-full" />
					<Skeleton className="w-[100px] h-[15px] rounded-full" />
				</div>
			</div>
		)
	}

	return (
		<div className="flex gap-2">
			<div>
				<Image src={user.image ? user.image : "123"} alt="logo" width={45} height={45} className="rounded-full"/>
			</div>
			<div className="flex flex-col justify-center text-sm font-extralight text-gray-400">
				<p>{user.name}</p>
				<p>{user.surname}</p>
			</div>
		</div>
	)
}

export default Teacher