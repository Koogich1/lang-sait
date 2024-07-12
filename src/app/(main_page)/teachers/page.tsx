"use client"

import { useEffect, useRef, useState } from 'react';
import MainHeader from '../header';
import getAllTeachers from './getTeachers';
import { Button } from '@/components/ui/button';
import { FaBookmark } from 'react-icons/fa6';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddToFavourites, { gettAllFavouritesTeachers } from './addToFavourites';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { currentUser } from '@/lib/auth';
import userImg from '@/actions/getImageUser';

type languagePick = 'English' | 'China' | 'Polish' | 'German';

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
    language: languagePick;
    levelLanguage: string;
  };
};

const FormSchema = z.object({
  language: z
    .string({})
});

const TeachersPage = () => {


  const [image, setImage] = useState("");

  useEffect(() => {
		const fetchUser = async () => {
			const img = await userImg()
			if(img){
				setImage(img)
			}
		};
		fetchUser();
	}, []);

  const updateFavourityes = async (teacherId: string) => {
    if(favouritesT?.includes(teacherId)){
      const notify = () => toast(
        <p>Учитель уже в избранном!</p>
      );
      notify()
    }else{
      await AddToFavourites(teacherId);
      const updatedFavourites = await gettAllFavouritesTeachers();
      setFavouritesT(updatedFavourites);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<languagePick | 'все'>(
    'все'
  );
  const [favouritesT, setFavouritesT] = useState<string[] | undefined>();

  useEffect(() => {
    const fetchFavourites = async () => {
      const favourites = await gettAllFavouritesTeachers();
      setFavouritesT(favourites);
    };
    fetchFavourites();
  }, []);

  const cardsRef = useRef(null);

  useGSAP(() => {
    if (cardsRef.current) {
      gsap.to(cardsRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'none',
      });
    }
  });

  const languageTranslations = {
    English: 'Английский',
    China: 'Китайский',
    Polish: 'Польский',
    German: 'Немецкий',
  };

  useEffect(() => {
    const fetchData = async () => {
      const teachersData = await getAllTeachers();
      setTeachers(teachersData.filter((teacher): teacher is Teacher => teacher !== undefined));
    };

    fetchData();
  }, []);

  const handleLanguageChange = (language: languagePick | 'все') => {
    setSelectedLanguage(language);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleLanguageChange(data.language as languagePick | 'все');
  }

  const filteredTeachers = selectedLanguage === 'все'
    ? teachers
    : teachers.filter((teacher) => teacher.teacherInfo.language === selectedLanguage);

  const truncateText = (text: any, maxLength: any) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <>
      <MainHeader />
      <ToastContainer
        position="bottom-left"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='flex justify-between w-full px-[5%] mt-10 relative'>
        <div className='bg-white mr-3 p-2 rounded-lg shadow-lg fixed w-[220px]'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-[200px] space-y-6">
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className='text-gray-600'>
                    <FormLabel className='text-xl font-semibold'>Выберете язык</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберете язык" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="все">Все</SelectItem>
                        <SelectItem value="English">Английский</SelectItem>
                        <SelectItem value="China">Китайский</SelectItem>
                        <SelectItem value="Polish">Польский</SelectItem>
                        <SelectItem value="German">Немецкий</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" variant='violetSelect' className='font-medium'>Подтвердить</Button>
            </form>
          </Form>
        </div>
       <div ref={cardsRef} className=' ml-[230px] w-full opacity-0 grid grid-cols-2 gap-5'>
         {filteredTeachers.map((teacher, id) => (
           <div key={id} className='[230px] h-[240px] rounded-lg shadow-lg bg-white flex p-2 w-full relative text-gray-600'>
             <div className='w-[220px] h-[225px] rounded-sm bg-cover overflow-hidden mr-4'>
               <img className="w-[220px] h-[225px] object-cover" 
                 src={teacher.userInfo.image ? teacher.userInfo.image : 'Ava'} 
                 alt="" 
               />
             </div>
             <div className='flex flex-col w-1/2 relative justify-between'>
                 <div className='flex gap-1 font-semibold text-[1.4rem]'>
                   <h1>{teacher.userInfo.name}</h1>
                   <h1>{teacher.userInfo.surname}</h1>
                 </div>
                 <div className='flex items-center gap-2 pt-1'>
                  <div className='w-3 h-[3px] bg-purple-600 rounded-sm'></div>
                   <p className='text-base font-medium'>{languageTranslations[teacher.teacherInfo.language]} язык</p> 
                 </div>
                 <div className='flex items-center gap-2'>
                  <div className='w-3 h-[3px] bg-purple-600 rounded-sm'></div>
                   <p className='text-base font-medium'>Уровень - {teacher.teacherInfo.levelLanguage}</p> 
                 </div>
                 <p className='h-[120px] overflow-hidden leading-5 pt-1 text-gray-400'>
                  {truncateText(teacher.teacherInfo.aboutMe, 110)}
                 </p>
                 <div className='mb-1 flex gap-2 justify-start'>
                   <Button className='w-[120px] border-2 border-gray-500 text-gray-500' variant='shadow2'>Подробнее!</Button>
                   <Button className='w-[120px] font-medium' variant='violetSelect'>Записаться</Button>
                 </div>
             </div>
             <div className='absolute top-0 right-0 m-2 mr-3'>
               <Button variant="calendar" size="sm" onClick={() => {
                updateFavourityes(teacher.teacherId)
                if(favouritesT?.includes(teacher.teacherId)){

                }else{
                  const notify = () => toast(
                  <p className='text-base'>
                    {`Учитель `}
                    <span className='font-bold'>{teacher.userInfo.name}</span>
                    {` `}
                    <span className='font-bold'>{teacher.userInfo.surname}</span>
                    {` добавлен в избранное`}
                  </p>,
                  {
                    closeButton: 
                      <Link href={"user/profile/favourites"}><Button variant='violetSelect' className='text-base font-medium mt-6'>Перейти</Button></Link>
                  }
                );
                notify()
                }
                }} 
                className='bg-white hover:bg-white p-0 m-0 border-none hover:border-none hover text-purple-300 hover:text-purple-600'>
                 {favouritesT?.includes(teacher.teacherId) ? (
                    <FaBookmark className='text-xl text-purple-600'/>
                  ): 
                 (<FaBookmark className='text-xl' />)
                 }
               </Button>
             </div>
           </div>
         ))}
       </div>
      </div>
    </>
  );
}

export default TeachersPage