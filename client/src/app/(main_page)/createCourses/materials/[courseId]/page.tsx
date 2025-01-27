"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { courseData, rasdelId, User } from '@prisma/client'; 
import getCourseById from '../../components/actions/getCourseById';
import { useParams } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import { HashLoader } from 'react-spinners';
import getCreator from '../../components/actions/getCreator';
import Soderg from './components/soderg';
import Opisanie from './components/opisanie';
import DeleteCourseModal from '../../components/modal/deleteCourseModal';
import UpdateCourseModal from '../../components/modal/updateCourseModal';
import BackButton from '../../components/backButton';
import Raspolozhenie from './components/raspolozhit';
import Image from 'next/image';
import fetchCourses from '../../components/actions/fetchCourses';

const CourseDetails = () => {
  const { courseId } = useParams(); // Получите courseId из query
  const [course, setCourse] = useState<courseData | null>(null);
  const [creator, setCreator] = useState<User | null>(null);
  const [currUser, setCurrUser] = useState<User | null>(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState("opisanie");
  const [rasd, setRasd] = useState<rasdelId[] | null>(null)

  const fetchRasd = useCallback(async () => {
		const fetcher = await fetchCourses({ courseID: courseId as string })
		if (fetcher) {
			setRasd(fetcher)
		}
	}, [courseId]) // Добавьте курс в зависимости

  const fetchCourse = useCallback(async () => {
    if (typeof courseId === 'string') { // Проверяй тип courseId
      const courseData = await getCourseById(courseId);
      if (courseData) {
        const creatorData = await getCreator(courseData.userId);
        console.log(creatorData);
        setCreator(creatorData);
        setCourse(courseData);
      }
    }
  }, [courseId]); // Добавляем courseId как зависимость

  useEffect(() => {
    fetchCourse();
    fetchRasd()
  }, [fetchCourse]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrUser(user);
      }
    };
    fetchCurrentUser();
  }, []);

  if (!course || !creator || !currUser) {
    return (
      <div className='w-full min-h-[80vh] bg-white rounded-2xl mt-5 shadow-lg flex items-center justify-center'>
        <HashLoader color="#835BD2" />
      </div>
    ); // Индикатор загрузки
  }

  return (
    <div className='w-full min-h-[80vh] bg-white rounded-2xl mt-5 shadow-lg text-gray-600'>
      <header className='p-3 flex justify-between relative'>
        <div className='flex gap-3'>
          <Image 
            width={1000} 
            height={1000} 
            src={course.photoUrl} 
            alt="" 
            className='w-[80px] h-[120px] object-cover rounded-lg shadow-md'
          />
          <div className='ml-5 flex flex-col justify-between'>
            <div>
              <h1 className='text-xl font-semibold text-blue-400'>{course.name}</h1>
              <span className='text-sm font-semibold text-gray-400'>{creator?.name + " " + creator.surname}</span>
            </div>
            <div className='flex gap-2'>
              {currUser.id === creator.id && (
                <div className='font-semibold text-sm hover:bg-blue-200 hover:text-blue-600 text-blue-500 py-1 bg-blue-100  w-[120px] rounded-lg flex items-center justify-center cursor-pointer transition-all'>
                  Ваш учебник
                </div>
              )}
              {currUser.id === creator.id && <DeleteCourseModal courseId={course.id} />}
            </div>
            <div className='absolute right-3 bottom-3'>
              <BackButton />
            </div>
          </div>
        </div>
        {currUser.id === creator.id && <UpdateCourseModal courseId={courseId as string} updateData={fetchCourse}/>}
      </header>
      <div className='border-b border-gray-100 px-3 mt-3'>
        <ul className='flex gap-5 h-10 items-center'>
          <li
            className={`font-semibold ${selectedMenuItem === "opisanie" ? "text-blue-400 border-b-2 border-blue-300" : "text-gray-300"} transition-all cursor-pointer hover:bg-gray-100 h-full flex items-center px-2 rounded-t-lg`}
            onClick={() => { setSelectedMenuItem("opisanie") }}
          >Содержание</li>
          <li
            className={`font-semibold ${selectedMenuItem === "soderg" ? "text-blue-400 border-b-2 border-blue-300" : "text-gray-300"} transition-all cursor-pointer hover:bg-gray-100 h-full flex items-center px-2 rounded-t-lg`}
            onClick={() => { setSelectedMenuItem("soderg") }}
          >Описание</li>
          <li
            className={`font-semibold ${selectedMenuItem === "raspolozhit" ? "text-blue-400 border-b-2 border-blue-300" : "text-gray-300"} transition-all cursor-pointer hover:bg-gray-100 h-full flex items-center px-2 rounded-t-lg`}
            onClick={() => { setSelectedMenuItem("raspolozhit") }}
          >Расположение</li>
        </ul>
      </div>
      {selectedMenuItem === 'opisanie' && <Soderg course={course} currUser={currUser} rasdel={rasd}/>}
      {selectedMenuItem === 'soderg' && <Opisanie course={course} user={currUser}/>}
      {selectedMenuItem === "raspolozhit" && <Raspolozhenie rasdel={rasd} fetchInfo={fetchRasd}/>}
    </div>
  );
};

export default CourseDetails;