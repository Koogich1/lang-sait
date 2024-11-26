"use client"

import { useEffect, useState } from 'react'
import CreateNewRasp from '../../../components/modal/createNewRasd'
import { courseData, rasdelId } from '@prisma/client'
import fetchCourses from '../../../components/actions/fetchCourses'
import { FaEllipsisH } from "react-icons/fa";

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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaRegTrashCan } from 'react-icons/fa6'
import { IoPencil } from 'react-icons/io5'
import deleteResdel from '../../../components/actions/deleteResdel'
import CreateNewLesson from '../../../components/modal/createNewLesson'
import UpdateRasdelModal from '../../../components/modal/updateRasdelModal'
import { Button } from '@/components/ui/button'
import SetPositonModal from '../../../components/modal/raspolozhitModal'
import { User } from 'next-auth'
import { currentUser } from '@/lib/auth'

type Props ={ 
	course: courseData
}

const Soderg = ({course}: Props ) => {
	const [rasd, setRasd] = useState<rasdelId[] | null>(null)
	const [currUser, setCurrUser] = useState<User | null>(null)

	const fetchRasd = async() => {
		const fetcher = await fetchCourses({courseID: course.id})
		if(fetcher){
			setRasd(fetcher)
		}
	}

	useEffect(() => {
		fetchRasd()
	},[])

	useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrUser(user);
      }
    };
    fetchCurrentUser();
  }, []);

	const allRasdelsConst = rasd?.length

	if(!currUser){
		return
	}

	return (
		<div className='px-3'>
			<Accordion type="multiple">	
				{rasd?.map((data, id) => (
					<AccordionItem value={id.toString()} key={id} className='relative'>
						<div className='absolute top-0 right-0 mt-[1.7rem] mr-[5%] lg:mr-[2%] flex items-center justify-center'>
							{currUser.id === course.userId &&
							<>
								<UpdateRasdelModal rasdelId={data.id} updateData={fetchRasd}/>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<div className='h-7 w-7 rounded-lg flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 transition-all cursor-pointer'>
											<FaEllipsisH />
										</div>
									</DropdownMenuTrigger>
									<DropdownMenuContent className='text-gray-500 font-medium'>
										<DropdownMenuItem className='hover:bg-gray-100 flex justify-between'>
										</DropdownMenuItem>
										<DropdownMenuItem className='hover:bg-gray-100 flex justify-between'
										onClick={async() => {
											await deleteResdel({ rasdelId: data.id })
											await fetchRasd()
										}}>
											<FaRegTrashCan />
											Удалить
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</>
							}
						</div>
						<AccordionTrigger className='items-center h-[8vh] mt-1 '>
							<div className='w-full h-[8vh] border-gray-100 gap-3 flex items-center'>
								<img src={data.photoUrl} alt="" className='w-10 h-10 rounded-lg object-cover'/>
								<h1 className='text-base font-semibold'>{data.name}</h1>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<CreateNewLesson rasdelId={data.id} updateData={() => {}}/>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{currUser.id === course.userId && <CreateNewRasp updateData={() => fetchRasd()} course={course}/>}
		</div>
	)
}

export default Soderg