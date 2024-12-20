"use client"

import { User } from "@prisma/client"
import { FaHouse } from "react-icons/fa6"

type Props = {
	user: User
}

const HomeWorkBox = ({user} : Props) => {
	return (
		<div>
				<div className="flex w-full justify-center text-lg font-semibold gap-2 lg:text-xl items-center">
				<FaHouse className="w-6 h-6 p-1 text-white bg-gray-500 rounded-md"/>
					<div className="flex gap-1">
						Домашняя работа
					</div>
				</div>
				<div className="w-full h-[1px] bg-gray-200 my-2"/>
		</div>
	)
}

export default HomeWorkBox