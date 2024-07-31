"use client"

import React, { useEffect, useState } from 'react';
import { courseData, User } from '@prisma/client'; 
import getCourseById from '../../components/actions/getCourseById';
import { useParams } from 'next/navigation';
import { currentUser } from '@/lib/auth';
import { HashLoader } from 'react-spinners';
import getCreator from '../../components/actions/getCreator';
import { FaRegTrashCan } from "react-icons/fa6";
import deleteCourse from '../../components/actions/deleteCourse';
import { useRouter } from 'next/navigation';
import { IoPencil } from "react-icons/io5";
import Soderg from './components/soderg';
import Opisanie from './components/opisanie';

const CourseDetails = () => {
  const { courseId } = useParams(); // Получите courseId из query
  const [course, setCourse] = useState<courseData | null>(null);
  const [creator, setCreator] = useState<User | null>(null)
  const [currUser, setCurrUser] = useState<User | null>(null)
  const router = useRouter()
  const [selectedMenuItem, setSelectedMenuItem] = useState("opisanie");

  useEffect(() => {
    const fetchCourse = async () => {
      if (typeof courseId === 'string') { // Проверяй тип courseId
        const courseData = await getCourseById(courseId);
        if (courseData) {
          const creatorData = await getCreator(courseData.userId)
          console.log(creatorData)
          setCreator(creatorData);
          setCourse(courseData);
        }
      }
    };
    fetchCourse();
  }, [courseId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await currentUser();
      if (user) {
        setCurrUser(user);
      }
    };
    fetchCurrentUser();
  }, []);

  if (!course || !creator || !currUser) return <div className='w-full min-h-[80vh] bg-white rounded-2xl mt-5 shadow-lg flex items-center justify-center'><HashLoader color="#835BD2" /></div>; // Индикатор загрузки

  return (
    <div className='w-full min-h-[80vh] bg-white rounded-2xl mt-5 shadow-lg text-gray-600'>
      <header className='p-3 flex justify-between'>
        <div className='flex gap-3'>
          <img src={course.photoUrl} alt="" className='w-[80px] h-[120px] object-cover rounded-lg'/>
          <div className='ml-5 flex flex-col justify-between'>
            <div>
              <h1 className='text-xl font-semibold'>{course.name}</h1>
              <span className='text-sm font-semibold text-gray-400'>{creator?.name}</span>
            </div>
            <div className='flex gap-2'>
              {currUser.id === creator.id && <div className='font-semibold text-sm hover:bg-gray-200 hover:text-gray-600 text-gray-500 py-1 bg-gray-100  w-[120px] rounded-lg flex items-center justify-center cursor-pointer transition-all'>Ваш учебник</div>}
              <div 
                className='p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-all'
                onClick={() => {
                  deleteCourse(course.id)
                  router.push("/createCourses/materials/")
                }}
              >
                <FaRegTrashCan />
              </div>
            </div>
          </div>
        </div>
        <div
          className='bg-gray-100 h-9 w-9 border-2 text-xl text-gray-500 hover:bg-gray-200 hover:text-gray-600 rounded-lg flex items-center justify-center cursor-pointer transition-all'
          onClick={() => {}} //СДЕЛАТЬ РЕДАКТИРОВАНИЕ ОСНОВНОЙ ИНФОРМАЦИИ О КУРСЕ
        >
          <IoPencil />
        </div>
      </header>
      <div className='border-b border-gray-100 px-3 mt-3'>
        <ul className='flex gap-5 h-10 items-center'>
          <li
            className={`font-semibold ${selectedMenuItem==="opisanie" ? "text-gray-600 border-b-2 border-blue-300" : "text-gray-300"} transition-all cursor-pointer hover:bg-gray-100 h-full flex items-center px-2 rounded-t-lg`}
            onClick={() => {setSelectedMenuItem("opisanie")}}
          >Содержание</li>
          <li
            className={`font-semibold ${selectedMenuItem==="soderg" ? "text-gray-600 border-b-2 border-blue-300" : "text-gray-300"} transition-all cursor-pointer hover:bg-gray-100 h-full flex items-center px-2 rounded-t-lg`}
            onClick={() => {setSelectedMenuItem("soderg")}}
          >Описание</li>
        </ul>
      </div>
      {selectedMenuItem === 'opisanie' && <Soderg course={course}/>}
      {selectedMenuItem === 'soderg' && <Opisanie />}
    </div>
  );
};

export default CourseDetails;
