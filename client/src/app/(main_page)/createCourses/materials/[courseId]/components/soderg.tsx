"use client"

import { useEffect, useState, useCallback } from 'react'
import CreateNewRasp from '../../../components/modal/createNewRasd'
import { courseData, rasdelId, User } from '@prisma/client'
import fetchCourses from '../../../components/actions/fetchCourses'
import {
  Accordion,
} from "@/components/ui/accordion"
import { currentUser } from '@/lib/auth'
import { Skeleton } from '@/components/ui/skeleton'
import RasdelBox from './rasdelBox'

type Props = {
	course: courseData
	currUser: User
	rasdel: rasdelId[] | null
}

const Soderg = ({ course, currUser, rasdel }: Props) => {
	const [rasd, setRasd] = useState<rasdelId[] | null>(rasdel)

	const fetchRasd = useCallback(async () => {
		const fetcher = await fetchCourses({ courseID: course.id })
		if (fetcher) {
			setRasd(fetcher)
		}
	}, [course.id]) // Добавьте курс в зависимости


	if (!currUser || !rasd) {
		return(
			<div className='px-3 mt-5 grid lg:grid-cols-2 gap-3 w-full'>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
				<Skeleton className='h-20 w-full rounded-lg'/>
			</div>
		)
	}

	return (
		<div className='px-3'>
			{currUser.id === course.userId &&
			<h1 className='text-lg mt-2 text-blue-400 font-medium'>В этом окне вы можете создавать, менять уроки!</h1>
			}
			<Accordion type="multiple" className='grid lg:grid-cols-2 gap-3 mt-3 items-start'>
				{rasd?.map((data, id) => (
					<div key={id}>
						<RasdelBox id={id} data={data} fetchRasd={fetchRasd} currUser={currUser} course={course}/>
					</div>
				))}
			</Accordion>
			{currUser.id === course.userId && <CreateNewRasp updateData={fetchRasd} course={course} />}
		</div>
	)
}

export default Soderg;