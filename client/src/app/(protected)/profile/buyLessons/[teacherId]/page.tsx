"use client"

import { Language, User, UserSubscriptions } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import getTeacherByUserId from '../components/getTeacherByUserID'
import { currentUser } from '@/lib/auth'
import getTeacherSubs from '@/app/(main_page)/teacher/components/week/getTeacherSubs'
import findLanguage from '../components/findLanguage'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Header from '../../_components/header'
import addLesson from '@/app/(main_page)/createCourses/watching/actions/addMaterial/addLesson'
import addLessonToTeacher from './addLessonToTeacher'

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

const ByePage = () => {
	const { teacherId } = useParams()
	const [teacher, setTeacher] = useState<Teacher | null>(null)
	const [userSubs, setUserSubs] = useState<UserSubscriptions | null>(null)
	const [languages, setLanguages] = useState<Language | null>(null)
	const router = useRouter()
	const [user, setUser] = useState<User | null>(null)

	const handleData = async (teacherId: string, user: User) => {
		const subsData = await getTeacherSubs({ teacherId: teacherId, user: user.id })
		if (subsData) {
			setUserSubs(subsData)
		}
	}	

	useEffect(() => {
		const fetchInfo = async () => {
			const data = await getTeacherByUserId(teacherId as string)
			if (data) {
				setTeacher(data)
				const userInfo = await currentUser()
				if (userInfo) {
					setUser(userInfo)
					const getUserLanguages = async () => {
						handleData(data.teacherId, userInfo); // Исправленный вызов
						const info = await findLanguage({ userid: userInfo.id, teacherId: data.id })
						console.log(info)
						if (info) {
							setLanguages(info)
						}
					}
					getUserLanguages()
				}
			}
		}
		fetchInfo()
	}, [])

	if (!user || !teacher) {
		return
	}

	return (
		<div>
			<Header header='Покупка уроков' user={user}/>
			<div className='w-full h-[80vh] flex items-center justify-center'>
				<div className='bg-white rounded-lg w-2/3 flex items-center flex-col justify-center h-[60vh] shadow-xl gap-3'>
					<div>Количество уроков: {userSubs?.LessonsPayd}</div>
					<Button
						onClick={() => {
							addLessonToTeacher({ userId: user.id, teacherId: teacher.id });
							handleData(teacher?.teacherId, user) // Убедитесь, что здесь тоже переданы правильные аргументы
						}}
					>
						Добавить урок
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ByePage
