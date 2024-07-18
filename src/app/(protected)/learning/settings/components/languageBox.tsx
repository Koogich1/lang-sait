"use client"

import getUserByTeacherId from '@/actions/getUserByTeacherId';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";
import { BeatLoader } from 'react-spinners';
import DeleteLanguageModal from '../../components/modal/deleteLanguageModal';
import { useSession } from 'next-auth/react';


type Teacher = {
  id: string;
  teacherId: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
    language: string[];
    levelLanguage: string;
  };
};

type LanguageTranslation = {
  [key: string]: string;
};

const englishToRussian: LanguageTranslation = {
  English: 'Английский',
  Chinese: 'Китайский',
  Korean: 'Корейский',
  // Добавьте другие языки по необходимости
};


const LanguageBox = () => {
  const { update } = useSession()
  const [user, setUser] = useState<Teacher | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const userFetch = async () => {
            const userData = await getUserByTeacherId();
            if(userData) {
                setUser(userData);
                setIsLoading(false);
            }
        };
        userFetch();
    }, []);

    if (isLoading) {
        return <BeatLoader color="#835BD2" />;
    }

    if (!user?.teacherInfo.language || user.teacherInfo.language.length === 0) {
        return (
            <div>
                <p>Добавьте ваши языки</p>
            </div>
        );
    }

    const translateLanguage = (language: string) => {
        return englishToRussian[language] || language;
    };

    const handleLanguageDelete = () => {
      update()
    };

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-3'>
      {user?.teacherInfo.language.map((language, id) => {
        return (
          <div key={id} className='mt-3 lg:w-full flex items-center  justify-between h-11 bg-gray-100 border border-gray-300 px-2 rounded-lg shadow-lg text-gray-400 hover:text-[#835BD2] transition-all hover:border-[#835BD2] cursor-pointer'>
						<div className='flex gap-3 items-center'>
							<img src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/${language}.png`} alt="flag" className='w-9 h-7 object-cover' />
							<h1 className='text-lg font-medium'>{translateLanguage(language)}</h1>
						</div>
						<div
						className='bg-red-400 text-white p-[3px] rounded-lg hover:bg-red-500 transition-all relative'
						>
              <DeleteLanguageModal name={user.userInfo.name} language={language} languages={user.teacherInfo.language} onLanguageDelete={handleLanguageDelete}/>
							<IoClose className='text-white text-2xl'/>
						</div>
          </div>
        );
      })}
    </div>
  );
};

export default LanguageBox;