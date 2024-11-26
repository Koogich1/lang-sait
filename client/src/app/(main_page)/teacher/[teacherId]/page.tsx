"use client"

import getTeacherById from '../components/findTeacherByID';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import VideoModal from '../components/modal/videoModal';
import findIsTeacherAdded from '../../addTeacher/actions/findIsTeacherAdded';
import Images from '../components/images';
import LanguagesBlock from '../components/languagesBlock';
import UserBlock from '../components/userBlock';
import LessonPrise from '../components/lessonPrise';
import { FaRegCalendarAlt, FaUser } from 'react-icons/fa';
import { FaNewspaper } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import WeekBlocks from '../components/week/weekBlocks';
import LessonForTeacher from '../components/week/lessonForTeacher';
import Employment from '../components/week/employment';
import { StudentBooking, User, UserSubscriptions } from '@prisma/client';
import { currentUser } from '@/lib/auth';
import getTeacherSubs from '../components/week/getTeacherSubs';
import bookingInfo from '../components/week/bookingInfo';
import TimerToLesson from '../components/week/timerToLesson';
import { BeatLoader } from 'react-spinners';

type Teacher = {
  id: string;
  teacherId: string;
  videoSrc: string; // Добавлено поле videoSrc
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
		images: string[];
    languages: {
      language: string; // Убедитесь, что тут у вас правильный тип
      level: string;
      prefers: string; // Или используйте ваш enum
    }[];
    lessonPrise: number;
  };
};

type PageNames = "Profile" | "Calendar" | "News"


const TeacherPage = () => {
	const { teacherId } = useParams()
	const [user, setUser] = useState<Teacher | null>(null)
	const [isTeacherAdded, setIsTeacherAdded] = useState<boolean>(false)
	const	[userSubs, setUserSubs] = useState<UserSubscriptions>()
	const [currUser, setCurrUser] = useState<User | null>(null)

	const [activePage, setActivePage] = useState<PageNames>("Profile");
	const [isTransitioning, setIsTransitioning] = useState(false);
	const[booking, setBooking]= useState<StudentBooking[] | null>(null)

	

	useEffect(() => {
		const fetchUser = async () => {
			const data = await getTeacherById(teacherId as string)
			if (data) {
				const isaAdded = await findIsTeacherAdded(data?.teacherId)
				if(isaAdded){
					setIsTeacherAdded(true)
				} else{
					setIsTeacherAdded(false)
				}
				setUser(data)
			}
			const fetchUser = await currentUser()
			if(fetchUser){
				if(!data)return
				setCurrUser(fetchUser)
				const handleData = async() => {
					const subsData = await getTeacherSubs({teacherId: data.id, user: fetchUser.id})
					if(subsData){
						setUserSubs(subsData)
					}
				}
				const findStudentBookingInfo = async() => {
					const bookingData = await bookingInfo({teacherId: data.id, userId: fetchUser.id})
					if(bookingData){
						setBooking(bookingData)
					}
				}
				findStudentBookingInfo()
				handleData()
			}
			
		}
		fetchUser()
			if(user && currUser){
			const fetchAdded = async() => {
				const isaAdded = await findIsTeacherAdded(user?.teacherId)
						if(isaAdded){
							setIsTeacherAdded(true)
						} else{
							setIsTeacherAdded(false)
						}
			}
			fetchAdded()
		}
	}, [])

	const handlePageChange = (page: PageNames) => {
		setIsTransitioning(true);
		setTimeout(() => {
			setActivePage(page);
			setIsTransitioning(false);
		}, 300); // Продолжительность анимации
	}


	if (!user || !currUser) {
		return <div>загрузка...</div>
	}

	const updateLessonsBuyed = async() => {
		const subsData = await getTeacherSubs({teacherId: user?.id, user: currUser.id})
			if(subsData){
				setUserSubs(subsData)
				}
	}

	const upadeteBooking = async() => {
		const bookingData = await bookingInfo({teacherId: user.id, userId: currUser.id})
		if(bookingData){
			setBooking(bookingData)
		}
	}
	
	return (
		<div className='w-full flex flex-col gap-3 pb-10'>
				<div className='flex justify-between gap-3 mt-5 font-medium'>
					<Button 
						className={`w-1/3 h-12 rounded-lg shadow-lg flex items-center justify-center gap-2 text-xl  ${activePage === "Profile" ? "text-white bg-[#835BD2] hover:bg-[#6647a5]" : "text-[#835BD2] bg-white hover:bg-[#ece3ff]"}`}
						onClick={() => {
							handlePageChange("Profile")
						}}
					>
						<FaUser />
						<span>Профиль</span>
					</Button>
					<Button 
						className={`w-1/3 h-12 rounded-lg shadow-lg flex items-center justify-center gap-2 text-xl hover:bg-[#ece3ff] ${activePage === "Calendar" ? "text-white bg-[#835BD2] hover:bg-[#6647a5]" : "text-[#835BD2] bg-white hover:bg-[#ece3ff]"}`}
						onClick={() => {
							handlePageChange("Calendar")
						}}
					>
						<FaRegCalendarAlt />
						<span>Расписание</span>
					</Button>
					<Button 
						className={`w-1/3 h-12 rounded-lg shadow-lg flex items-center justify-center gap-2 text-xl hover:bg-[#ece3ff] ${activePage === "News" ? "text-white bg-[#835BD2] hover:bg-[#6647a5]" : "text-[#835BD2] bg-white hover:bg-[#ece3ff]"}`}
						onClick={() => {
							handlePageChange("News")
						}}
					>
						<FaNewspaper />
						<span>Новости</span>
					</Button>
				</div>
				<div className={`${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
					{activePage === "Profile" && 
					(
						<div className='flex flex-col gap-3'>
							<div className='w-full flex gap-3'>
								<div className="flex justify-center items-start w-full">
									<UserBlock user={user} isTeacherAdded={isTeacherAdded}/>
								</div>
									<div className='w-2/5 bg-white rounded-lg shadow-lg p-3 py-5 flex flex-col justify-between'>
										<LanguagesBlock user={user}/>
									</div>
								</div>
								<div className='flex gap-3'>
									<div className='w-2/5 bg-white rounded-lg shadow-lg p-3 py-5 flex flex-col justify-between'>
										<Images teacher={user} />
									</div>
									<div className='w-3/5 bg-white rounded-lg shadow-lg p-3 py-5'>
										<LessonPrise lessonPrise={user.teacherInfo.lessonPrise} />
									</div>
								</div>
							</div>
						)}
						{activePage === "Calendar" && 
						(
							<div className='flex flex-col gap-3'>
								<div className='w-full flex gap-3'>
									<div className='w-1/5 h-[170px] bg-white shadow-lg rounded-lg'>
										<Employment userSubs={userSubs} teacher={user}/>
									</div>
									<div className='w-3/5 h-[170px] bg-white shadow-lg rounded-lg'>
										<LessonForTeacher user={currUser} Teacher={user} userSubs={userSubs} booking={booking}/>
									</div>
									<div className='w-1/5 h-[170px] bg-white shadow-lg rounded-lg'>
										<TimerToLesson booking={booking}/>
									</div>
								</div>
								<div className='w-full flex gap-3'>
									<div className='w-full bg-white shadow-lg rounded-lg'>
										<WeekBlocks Teacher={user} userSubs={userSubs} user={currUser} isTeacherAdded={isTeacherAdded} visov={() => {
											updateLessonsBuyed()
											upadeteBooking()}}
										/>
									</div>
								</div>
							</div>
						)}
						{activePage === "News" &&
						(
							<div className='w-full h-[40vh] flex flex-col gap-5 items-center justify-center bg-white shadow-lg rounded-lg'>
								<p className='text-gray-400 text-2xl'>Тут преподаватели смогут выкладывать свои новости</p>
								<div className='flex gap-2 text-2xl text-gray-400 flex-col items-center justify-center'>В разработке <BeatLoader color='#9ca3af'/></div>
							</div>
						)}
				</div>
			
			</div>
	)
}

export default TeacherPage