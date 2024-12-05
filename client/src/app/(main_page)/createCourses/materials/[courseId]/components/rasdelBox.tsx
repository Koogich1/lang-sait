"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import UpdateRasdelModal from "../../../components/modal/updateRasdelModal"
import { courseData, Lessons, rasdelId, User } from "@prisma/client"
import { FaEllipsisH } from "react-icons/fa"
import deleteResdel from "../../../components/actions/deleteResdel"
import { FaRegTrashCan } from "react-icons/fa6"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { IoChevronDown } from "react-icons/io5"
import CreateNewLesson from "../../../components/modal/createNewLesson"
import { useState } from "react"

type DATA = {
	id: string;
	photoUrl: string;
	coureId: string;
	userId: string;
	name: string;
	position: number;
	aboutRasdel: string;
}

type Props = {
	fetchRasd: () => void,
	id: number,
	currUser: User,
	data: DATA,
	course: courseData
}

const RasdelBox = ({fetchRasd, id, currUser, data, course}: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<>
					<AccordionItem value={id.toString()} key={id} className='relative shadow-md border border-gray-100 hover:border-blue-300 rounded-lg overflow-hidden'>
						<div className='absolute top-0 right-0 mt-[1.55rem] mr-[5%] lg:mr-[2.8rem] flex items-center justify-center'>
							{currUser.id === course.userId &&
							<>
								<UpdateRasdelModal rasdelId={data.id} updateData={fetchRasd} />
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div>
											<div className='h-7 w-7 rounded-lg flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 transition-all cursor-pointer'>
												<FaEllipsisH />
											</div>
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='text-gray-500 font-medium'>
										<DropdownMenuItem className='hover:bg-gray-100 flex justify-between' />
										<DropdownMenuItem
											className='hover:bg-gray-100 flex justify-between'
											onClick={async () => {
												await deleteResdel({ rasdelId: data.id })
												await fetchRasd()
											}}
										>
											<FaRegTrashCan />
											Удалить
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
							}
						</div>
						<AccordionTrigger className='items-center h-[8vh] px-3 hover:bg-blue-50 transition-all border-none' onClick={() => {setOpen(!open)}}>
						<div className="text-gray-400 font-light text-xs absolute top-[0.15rem] left-[0.15rem] flex items-center justify-center">
							<div className="w-4 h-4 bg-blue-400 text-white flex items-center justify-center font-semibold rounded-md">
								{id + 1}
							</div>
						</div>
							<div className='w-full h-[8vh] border-gray-100 gap-3 flex items-center'>
								<Image width={1000} height={1000} src={data.photoUrl} alt="" className='w-10 h-10 rounded-lg object-cover' />
								<h1 className='text-base font-semibold'>{data.name}</h1>
							</div>
							<Button className="absolute text-white right-3 flex items-center justify-center p-0 h-7 w-7 bg-blue-400 hover:bg-blue-500 z-50" variant={"violetSelect"}>
								<IoChevronDown className={`text-xl transition-all rotate-${open ? "180" : "0"}`} />
							</Button>
						</AccordionTrigger>
						<AccordionContent className='px-3 py-0'>
							<CreateNewLesson rasdelId={data.id} updateData={() => { }} user={currUser} course={course} rasdelName={data.aboutRasdel}/>
						</AccordionContent>
					</AccordionItem>
		</>
	)
}

export default RasdelBox