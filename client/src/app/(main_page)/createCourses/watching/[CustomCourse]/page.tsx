"use client"

import { courseData, customCourse, CustomCourseSet, CustomRasdelBox, Lessons, User } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import getAllCourses from '../../components/actions/getAllCourses'
import Link from 'next/link';
import findCourselessons from '../actions/findCourselessons'
import findRasdelByLesson from '../actions/findRasdelByLesson'
import findRasdelByCourseId from '../actions/findRasdelByLesson'
import { Button } from '@/components/ui/button'
import CreateRasdelModal from '../components/modal/createRasdelModal'
import getCourseInfo from '../actions/getCouseInfo'
import { HashLoader } from 'react-spinners'
import Image from 'next/image'
import { FaArrowDown, FaArrowRight, FaRegTrashCan } from 'react-icons/fa6'
import { currentUser } from '@/lib/auth'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const Page = () => {
	const { CustomCourse } = useParams()
	const[course, setCourse] = useState<customCourse>()
	const[lessons, setLessons] = useState<Lessons[]>([])
	const[rasdels, setRasdels] = useState<CustomRasdelBox[] | null>(null) // Массив для хранения разделов
	const[open, setOpen] = useState(false)
	const[loading, setLoading] = useState(true)
	const[user, setUser] = useState<User | null>(null)
	const[cols, setCols] = useState(1)

	const router = useRouter()

	
	const fetchRasdels = useCallback(async () => {
		const rasdelsinf = await findRasdelByCourseId(CustomCourse as string)
		if (rasdelsinf && rasdelsinf.length > 0) {
			setRasdels(rasdelsinf)
		}
	}, [CustomCourse]); // Зависимость: CustomCourse

	const fetchCourseInfo = useCallback(async () => {
		const courseInf = await getCourseInfo(CustomCourse as string)
		if (courseInf) {
			setCourse(courseInf)
		}
		const userInf = await currentUser()
		if (userInf) {
			setUser(userInf)
		}
	}, [CustomCourse]); // Зависимость: CustomCourse

	useEffect(() => {
		fetchCourseInfo()
		fetchRasdels()
		setLoading(false)
	},[fetchCourseInfo, fetchRasdels]) 

	if(loading){
		return <div className='w-full min-h-[60vh] bg-white rounded-2xl mt-5 shadow-lg flex items-center justify-center'><HashLoader color="#835BD2" /></div>; // Индикатор загрузки
	}

	if(course?.userId != user?.id){
		//router.push("")
	}

	return (
		<>
		<div className='mt-5 p-3 w-full min-h-[60vh] bg-white rounded-lg shadow-lg text-gray-600'>
			<div className='flex gap-3 justify-between items-end'>
				<div className='flex gap-3 items-end'>
					{
					course?.imageSrc ? 
						<Image 
						src={course.imageSrc}
						alt="Course image"
						height={200}
						width={200}
						className='w-[4.5rem] h-[6rem] rounded-lg'
						/>
					: 
						<div className='w-[4.5rem] h-[6rem] rounded-lg bg-purple-400 flex items-center justify-center text-5xl text-white'>
							{course?.name.charAt(0)}
						</div>
					}
					<div className='flex flex-col justify-between h-[6rem]'>
						<div>
							<Button className='px-0 py-0 p-0 h-8 w-8 mt-[0.01rem]' variant={'shadow2'}>
								<FaRegTrashCan />
							</Button>
						</div>
						<h1 className='text-xl font-light text-gray-400'>
							{course?.name}
						</h1>
					</div>
				</div>
				<div className='w-[6rem] h-9 bg-gray-100 rounded-lg flex gap-1 p-1'>
					<div className='w-7 h-7 bg-gray-200 rounded-md flex items-center cursor-pointer hover:bg-gray-300 transition-all'
						onClick={() => {setCols(1)}}
					>
						<div className='w-full h-2 bg-gray-100 m-1'>
						</div>
					</div>
					<div className='w-7 h-7 bg-gray-200 rounded-md flex items-center gap-1 p-1 cursor-pointer hover:bg-gray-300 transition-all'
						onClick={() => {setCols(2)}}
					>
						<div className='w-full h-2 bg-gray-100'>
						</div>	
						<div className='w-full h-2 bg-gray-100'>
						</div>	
					</div>
					<div className='w-7 h-7 bg-gray-200 rounded-md flex items-center gap-1 p-[0.1rem] cursor-pointer hover:bg-gray-300 transition-all'
						onClick={() => {setCols(3)}}
					>
						<div className='w-full h-2 bg-gray-100'>
						</div>
						<div className='w-full h-2 bg-gray-100'>
						</div>
						<div className='w-full h-2 bg-gray-100'>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full h-[1px] bg-gray-100 my-3'/>
			<div className='flex flex-col gap-3'>
				{
					rasdels ?
					<div>
						<Accordion type="single" collapsible className={`grid md:grid-cols-${cols} gap-2`}>
							{rasdels.map((data)=>(
								<AccordionItem value={data.name} key={data.id} className='border border-purple-200 rounded-lg overflow-hidden'>
									<AccordionTrigger className='w-full h-20 text-gray-500 text-sm relative flex justify-between items-center px-3' key={data.id}>
										<div className=''>
											<h1 className='h-5 w-5 border border-gray-300 rounded-sm flex items-center justify-center text-gray-300 font-semibold absolute top-0 left-0 m-1'>{data.order + 1}</h1>
											{data.name}
										</div>
									</AccordionTrigger>
									<AccordionContent>
										<div className='w-full flex justify-between'>
											<div className='w-3/4'>
												первые 2 микротемы
											</div>
											<div className='w-1/4'>
												<Button className='bg-blue-400'
													onClick={() => {
														router.push(`${CustomCourse}/${data.id}`)
													}}
												>
													Перейти
												</Button>
											</div>
										</div>
									</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
						<Button 
							className='w-full h-20 mt-3 bg-white border-2 border-dashed text-blue-500 border-blue-500 text-xl hover:bg-blue-200 hover:text-blue-700'
							onClick={() => {
								setOpen(true)
							}}
						>
							Добавить раздел
						</Button>
					</div>
					: 
						<div className='mt-20'>
							<div className='flex flex-col items-center justify-center text-blue-400'>
								<h1 className='w-full text-2xl font-semibold text-blue-400 text-center'>Пока нет еще ни одного раздела</h1>
								<HashLoader color='#60a5fa' className='mt-5'/>
							</div>
							<Button 
								className='w-full h-20 mt-6 bg-white border-2 border-dashed text-blue-500 border-blue-500 text-xl hover:bg-blue-200 hover:text-blue-700'
								onClick={() => {
									setOpen(true)
								}}
							>
								Создать новый!
							</Button>
						</div>
				}
			</div>
		</div>
		<CreateRasdelModal openModal={open} setOpenModal={setOpen} visov={() => fetchRasdels()} courseId={CustomCourse as string}/> 
		</>
	)
}

export default Page