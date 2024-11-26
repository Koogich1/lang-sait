'use client';

import Users from './users/usersBox';
import Groups from './groups/groupBox';
import Applications from './applications/applications';
import React, { useEffect, useState } from 'react';
import { Teacher, User } from '@prisma/client';
import { currentUser } from '@/lib/auth';
import { getUserById } from '@/data/user';
import getTeacherById from '@/app/(main_page)/teacher/components/findTeacherByID';
import getTeacherByTeacherId from './applications/actions/getTeacherByTeacherId';

const YourComponent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("users");
  const [user, setUser] = useState<User | null>(null);
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMenuItemClick = (menuItem: any) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedMenuItem(menuItem);
      setIsTransitioning(false);
    }, 300); // Adjust this timeout to match your desired transition duration
  };

  const findTeacher = async () => {
    const data = await currentUser();
    if (data) {
      if(!data.teacherId)return
      const info = await getTeacherByTeacherId(data.teacherId);
      if (info) {
       setTeacher(info)
      }
      setUser(data);
    }
  };

  useEffect(() => {
    findTeacher();
  }, []);

  if (!user) return null;

  return (
    <div className='w-full p-6 bg-white text-gray-600 rounded-xl shadow-lg mt-3'>
      <h1 className='text-2xl font-bold'>Обучение</h1>
      <ul className='flex text-lg mt-4 gap-2 text-gray-400'>
        <li 
          onClick={() => handleMenuItemClick('users')}
          className={`
            ${selectedMenuItem === "users" ? "border-b-2 text-purple-600 bg-purple-100 border-purple-600" : ""}
            pb-2 hover:bg-gray-100 hover:text-gray-500 transition p-2 px-5 cursor-pointer rounded-t-lg
          `}
        >
          Ученики
        </li>
        <li 
          onClick={() => handleMenuItemClick('groups')}
          className={`
            ${selectedMenuItem === "groups" ? "border-b-2 text-purple-600 bg-purple-100 border-purple-600" : ""} 
            pb-2 hover:bg-gray-100 hover:text-gray-500 transition p-2 px-5 cursor-pointer rounded-t-lg
          `}
        >  
          Группы
        </li>
        <li 
          onClick={() => handleMenuItemClick('applications')}
          className={`
            ${selectedMenuItem === "applications" ? "border-b-2 text-purple-600 bg-purple-100 border-purple-600" : ""}
            pb-2 hover:bg-gray-100 hover:text-gray-500 transition p-2 px-5 cursor-pointer rounded-t-lg
          `}
        >
          Заявки
        </li>
      </ul>
      <div className='w-full h-[1px] bg-gray-200'></div>
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {selectedMenuItem === 'users' && <Users user={user} teacher={teacher}/>}
        {selectedMenuItem === 'groups' && <Groups />}
        {selectedMenuItem === 'applications' && <Applications user={user} />}
      </div>
    </div>
  );
};

export default YourComponent;