"use client"

import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import axios from "axios"

import Avatar from "@/components/avatar"

interface UserBoxProps {
	data: User
}

const UserBox: React.FC<UserBoxProps> = ({data}) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const handleClick = useCallback(() => {
		setIsLoading(true)
		axios.post("/api/conversations", {
			userId: data.id,
			isGroup: false,
			members: 2,
			name: data.name
		})
		.then((data) => {
			router.push(`/chats/conversations/${data.data.id}`)
		})
		.finally(() => setIsLoading(false))
	}, [data, router])
	
	return (
		<div onClick={handleClick}
		className="w-full relative flex items-center space-x-3 bg-white border border-b-0 border-x-0
		p-1 hover:bg-neutral-100 transition cursor-pointer mb-[1px] rounded-sm">
			<img src={
				data.image 
				?? "https://storage.yandexcloud.net/langschoolacynberg/images/user.png"} alt="" 
				className="w-[3rem] h-[3rem] object-cover rounded-full"
			/>
			<div className="min-w-0 flex-1">
				<div className="focus:outline-none">
					<div
					className="flex justify-between itmes-center mb-1"
					>
						<p className="text-sm font-medium text-gray-900">
							{data.name}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserBox