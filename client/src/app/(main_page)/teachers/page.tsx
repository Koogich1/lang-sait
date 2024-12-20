"use client"

import { useDebugValue, useEffect, useRef, useState } from 'react';
import MainHeader from '../header';
import getAllTeachers from './getTeachers'; // Make sure this function is updated
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
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z, ZodNull } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AddToFavourites, { gettAllFavouritesTeachers } from './addToFavourites';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import AboutTeacherModal from './modals/aboutTeacher';
import AddTeacherToUser from '@/actions/addTeacherToUser';
import Image from 'next/image';
import { MdLanguage } from "react-icons/md";
import { Language, User } from '@prisma/client';
import TeacherProfile from './components/teacherProfile';
import { currentUser } from '@/lib/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { RingLoader } from 'react-spinners';

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
    languages: Language[]; // Adjust this to accommodate the new structure
    lessonPrise: number;
  };
};

const FormSchema = z.object({
  language: z.string({}),
});

const FormatedLang = (lang: string) => {
  const languages = ['English', 'Korean', 'China'];
  const langIndex = languages.indexOf(lang);
  const russianLanguages = ['Английский', 'Корейский', 'Китайский'];
  return russianLanguages[langIndex] || lang; // Default to the lang if not found
};

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<'все' | string>('все');
  const [user, setUser] = useState<User | null>()
  const [favouritesT, setFavouritesT] = useState<string[] | undefined>();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      language: 'все', 
    },
  });

  useEffect(() => {
    const fetchFavourites = async () => {
      const favourites = await gettAllFavouritesTeachers();
      setFavouritesT(favourites);
      const fetchUser = await currentUser()
      if(fetchUser){
        setUser(fetchUser)
      }
    };
    fetchFavourites();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const teachersData = await getAllTeachers();
      // Filter out undefined values
      const filteredTeachersData = teachersData.filter((teacher): teacher is Teacher => teacher !== undefined);
      setTeachers(filteredTeachersData);
    };
    fetchData()
  }, []);

  const handleLanguageChange = (language: 'все') => {
    setSelectedLanguage(language);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleLanguageChange(data.language as 'все');
  }

  const updateFavourityes = async (teacherId: string) => {
    if (favouritesT?.includes(teacherId)) {
      toast(<p>Учитель уже в избранном!</p>);
    } else {
      await AddToFavourites(teacherId);
      const updatedFavourites = await gettAllFavouritesTeachers();
      setFavouritesT(updatedFavourites)
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const filteredTeachers = selectedLanguage === 'все'
    ? teachers
    : teachers.filter(teacher => teacher.teacherInfo.languages.some(lang => lang.language === selectedLanguage));

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
      <div className='flex justify-between max-w-[1440px] px-[5%] mt-10 relative w-full pb-20'>
        <div className='bg-white min-h-[70vh] rounded-lg shadow-lg relative w-full overflow-hidden'>
          <div className='pointer-events-auto bg-white mr-3 w-full border-b border-gray-100 py-5 mx-3'>
            <h1 className='text-3xl text-[#835BD2]'>Выберите язык</h1>
            <div className='gap-3 items-center pt-2 hidden md:flex'>
            <Button
              onClick={() => {
                setSelectedLanguage("все")
              }}
              className={`flex gap-1 border-2 border-blue-500 font-medium hover:bg-blue-100 ${selectedLanguage === "все" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
            >
              <MdLanguage className='w-4 h-4'/>
              Все
            </Button>
                            <Button
                            onClick={() => {
                                setSelectedLanguage("English")
                            }}
                            className={`flex gap-1 border-2 border-blue-500 font-medium hover:bg-blue-100 ${selectedLanguage === "English" as "все" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                            >
                            <Image src="/en.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>
                            Английский
                            </Button>
                            <Button
                            onClick={() => {
                                setSelectedLanguage("Korean")
                            }}
                            className={`flex gap-1 border-2 border-purple-400 font-medium hover:bg-purple-100 ${selectedLanguage === "Korean" as "все" ? "bg-purple-400 text-white" : "bg-white text-purple-400"}`}
                            >
                            <Image src="/korean.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>
                            Корейский
                            </Button>
                            <Button
                            onClick={() => {
                                setSelectedLanguage("China")
                            }}
                            className={`flex gap-1 border-2 border-red-400 font-medium hover:bg-red-100 ${selectedLanguage === "China" as "все" ? "bg-red-400 text-white" : "bg-white text-red-400"}`}
                            >
                            <Image src="/ch.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>
                            Китайский
                            </Button>
                            <Button
                            onClick={() => {
                                setSelectedLanguage("German")
                            }}
                            className={`flex gap-1 border-2 border-blue-400 font-medium hover:bg-blue-100 ${selectedLanguage === "German" as "все" ? "bg-blue-400 text-white" : "bg-white text-blue-400"}`}
                            >
                            <Image src="/gr.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/> 
                            Немецкий
                            </Button>
            </div>
            <div className='md:hidden'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 pt-2">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className='text-gray-600'>
                        <Select onValueChange={(value) => {
                          switch(value) {
                            case "все":
                              setSelectedLanguage("все");
                              break;
                            case "English":
                              setSelectedLanguage("English");
                              break;
                            case "Korean":
                              setSelectedLanguage("Korean");
                              break;
                            case "China":
                              setSelectedLanguage("China");
                              break;
                            case "German":
                              setSelectedLanguage("German");
                              break;
                            default:
                              break;
                          }
                        }}>
                          <FormControl>
                            <SelectTrigger className='max-w-[200px]'>
                              <SelectValue placeholder="Выберете язык" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['все', 'English', 'Korean', 'China', 'German'].map(lang => (
                              <SelectItem key={lang} value={lang}>
                                <div className='flex items-center gap-3 '>
                                  {lang === "все" && <MdLanguage className='w-4 h-4 text-blue-400'/>}
                                  {lang === "English" && <Image src="/en.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>}
                                  {lang === "Korean" && <Image src="/korean.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>}
                                  {lang === "China" && <Image src="/ch.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/>}
                                  {lang === "German" && <Image src="/gr.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm"/> }
                                  <p className={`font-medium 
                                    ${lang === "все" && "text-blue-400"}
                                    ${lang === "English" && "text-blue-600"}
                                    ${lang === "Korean" && "text-pink-500"}
                                    ${lang === "China" && "text-red-500"}
                                    ${lang === "German" && "text-orange-500"}
                                  `}>{FormatedLang(lang)}</p>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
          </div>
          <div className='w-full grid lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-5 px-3'>
            {filteredTeachers ? 
            filteredTeachers.map((teacher, id) => (
              <div key={id} className='h-[146px] w-full rounded-lg border border-gray-100 shadow-md bg-white flex p-2 relative text-gray-600'>
                <div className='w-[100px] sm:w-[130px] h-[130px] rounded-sm bg-cover overflow-hidden sm:mr-4 mr-2'>
                  {teacher.userInfo.image ? 
                    <Image width={130} height={130} className="object-cover h-[130px]" 
                      src={teacher.userInfo.image} 
                      alt="" 
                    />
                    :
                    <Skeleton className='w-[130px] h-[130px]' />
                  }
                </div>
                <div className='flex flex-col w-1/2 relative justify-between'>
                  <div className='flex gap-1 font-semibold text-lg text-[#835BD2]'>
                    <h1>{teacher.userInfo.name}</h1>
                    <h1>{teacher.userInfo.surname}</h1>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-[3px] bg-[#835BD2] rounded-sm'></div>
                    <div className='text-xs font-medium flex gap-1 text-[#835BD2]'>
                      {teacher.teacherInfo.languages.map((lang, id) => (
                        <div key={id}>
                          {FormatedLang(lang.language)}
                        </div>
                      ))} <div>язык</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-[3px] bg-[#835BD2] rounded-sm'></div>
                    <p className='text-xs font-medium text-[#835BD2]'>Уровень - {teacher.teacherInfo.languages.map(lang => lang.level).join(', ')}</p> 
                  </div>
                  <p className='overflow-hidden leading-3 text-xs pt-1 text-gray-400'>
                    {truncateText(teacher.teacherInfo.aboutMe, 54)}
                  </p>
                  <div className='flex gap-1 justify-start items-start'>
                    <Link href={`/teacher/${teacher.teacherId}`} className="z-50">
                      <Button variant={"violetSelect"} className='bg-blue-400 h-6 rounded-sm hover:bg-blue-500 text-xs'>Подробнее</Button>
                    </Link>
                    <TeacherProfile teacher={teacher} user={user} favouritesT={favouritesT}/>
                  </div>
                </div>
                <div className='absolute top-0 right-0 m-2 mr-3'>
                  <Button 
                    variant="calendar" 
                    onClick={() => updateFavourityes(teacher.teacherId)} 
                    className='bg-white hover:bg-white p-0 m-0 py-0 h-5 border-none hover:border-none hover text-purple-300 hover:text-purple-600'
                  >
                    {favouritesT?.includes(teacher.teacherId) ? (
                      <FaBookmark className='text-xl text-purple-600'/>
                    ) : (
                      <FaBookmark className='text-xl' />
                    )}
                  </Button>
                </div>
              </div>
            ))
           : 
           <div className='w-full h-[470px] flex items-center justify-center flex-col gap-3'>
              <div>Какая-то ошибка...</div>
              <RingLoader className='text-gray-400'/>
           </div>
           }
          </div>
        </div>
      </div>
    </>
  );
}

export default TeachersPage;
