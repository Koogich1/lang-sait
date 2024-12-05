"use client";

import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { BookedLesson, courseData, customCourse } from '@prisma/client';
import findedLessons from '@/app/(protected)/learning/materials/actions/findLessons';
import { HashLoader } from 'react-spinners';
import { FaPlus, FaFilter } from "react-icons/fa6";
import Link from 'next/link';
import fetchCourses from '@/app/(protected)/learning/materials/actions/fetchCourses';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import { MdLanguage } from 'react-icons/md';
import AddMaterialModal from '../../modal/addMaterials';

type Props = {
  lesson: BookedLesson;
  visov: () => void
}

const ChooseMaterial = ({lesson, visov}: Props) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);
  const [lessons, setLessons] = useState<customCourse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState("My Courses");
  const [courses, setCourses] = useState<courseData[]>();
  const [openFilter, setOpenFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (tab: string) => {
    setIsTransitioning(true); // Начинаем анимацию скрытия
    setTimeout(() => {
      setActive(tab);
      setIsTransitioning(false); // Завершаем анимацию после смены вкладки
    }, 300); // Задержка, равная времени анимации
  };

  const fetchingCourses = async () => {
    const data = await fetchCourses();
    if (data) {
      setCourses(data);
    }
  };

  const fetchLessons = async () => {
    setLoading(true);
    const lessons = await findedLessons();
    console.log(lessons);
    if (lessons) {
      setLessons(lessons);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingCourses();
    fetchLessons();
  }, []);

  if (loading) {
    return (
      <div className='w-full h-[60vh] bg-white shadow-lg rounded-lg gap-3 flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-semibold text-gray-500'>Загрузка данных...</h1>
        <HashLoader size={60} color='#6B7280' />
      </div>
    );
  }

  if (!courses) { return; }


  // Функция для сортировки
  const sortLessons = (lessons: customCourse[]) => {
    if (sortOrder === 'dateAsc') {
      return [...lessons].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateA - dateB;
      });
    }
    if (sortOrder === 'dateDesc') {
      return [...lessons].sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
    }
    if (sortOrder === 'alphaAsc') {
      return [...lessons].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOrder === 'alphaDesc') {
      return [...lessons].sort((a, b) => b.name.localeCompare(a.name));
    }
    return lessons;
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();

    return `${day}:${month}:${year}`; // Возвращает формат DD:MM:YYYY
  };

  const filteredLessons = lessons ? lessons.filter(lesson =>
    lesson.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const sortedLessons = sortLessons(filteredLessons);

  const filteredMaterials = selectedLanguage
    ? courses.filter(material => material.language === selectedLanguage && material.name.toLowerCase().includes(searchTerm.toLowerCase())) // Фильтр курсов по языку и имени
    : courses.filter(material => material.name.toLowerCase().includes(searchTerm.toLowerCase())); // Фильтр только по имени


  return (
    <div className='w-full bg-white rounded-lg flex flex-col text-gray-400 transition-all'>
      <div className='flex gap-3 w-full border-b mt-3'>
        <div
          className={`px-3 text-center border-b-2 p-1 hover:border-purple-100 hover:bg-purple-100 rounded-t-lg transition-all font-medium cursor-pointer ${active === "My Courses" ? "border-b-2 border-[#835BD2] text-[#835BD2]" : "border-white"}`}
          onClick={() => handleTabChange("My Courses")}
        >
          <h1>Мои уроки</h1>
        </div>
        <div
          className={`px-3 text-center border-b-2 p-1 hover:border-purple-100 hover:bg-purple-100 rounded-t-lg transition-all font-medium cursor-pointer ${active === "Katalog" ? "border-b-2 border-[#835BD2] text-[#835BD2]" : "border-white"}`}
          onClick={() => handleTabChange("Katalog")}
        >
          <h1>Каталог курсов</h1>
        </div>
      </div>
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {active === "My Courses" ?
          <>
            {lessons?.length === 0 || lessons === null ?
              <div className='flex items-center justify-center flex-col gap-3'>
                <h1 className='text-xl font-semibold text-gray-600'>
                  Cоставьте свои уроки, используйте разные
                </h1>
                <Button ref={boxRef} id='box' variant={"violetSelect"} className='font-medium text-lg' onClick={() => {
                  setOpen(true);
                }}>
                  Начать прямо сейчас
                </Button>
              </div>
              :
              <div className='w-full min-h-[60vh] px-0 flex flex-col items-center text-gray-500'>
                <div className='w-full mt-5 flex items-center justify-between'>
                  <p className='text-nowrap text-base font-semibold text-gray-400 flex gap-2'>
                    <p>Количество уроков</p>
                    <p>{lessons.length}</p>
                  </p>
                  <div className='h-1 mt-[0.12rem] border-t-2 border-gray-200 border-dotted w-full ml-2'></div>
                </div>
                <div className='flex w-full gap-2 pt-5'>
                  <Input
                    className='w-3/5 h-10 placeholder:text-gray-300 text-base'
                    placeholder='введите название урока...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние при вводе
                  />
                  <DropdownMenu open={openFilter} onOpenChange={setOpenFilter}>
                    <DropdownMenuTrigger className='w-2/5'>
                      <Button className={`w-full flex gap-2 ${openFilter ? "bg-gray-300 text-gray-500" : ""}`} variant={"shadow2"}>
                        <p>Фильтр</p>
                        <FaFilter />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-full text-gray-400'>
                      <DropdownMenuLabel className='text-base text-gray-500'>Сортировка</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { setSortOrder('dateDesc'); setOpenFilter(false); }} className={`${sortOrder === "dateDesc" ? "bg-gray-200 font-semibold" : ""} hover:bg-gray-100 hover:text-gray-400`}>Сначала новые</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSortOrder('dateAsc'); setOpenFilter(false); }} className={`${sortOrder === "dateAsc" ? "bg-gray-200 font-semibold" : ""} hover:bg-gray-100 hover:text-gray-400`}>Сначала старые</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => { setSortOrder('alphaAsc'); setOpenFilter(false); }} className={`${sortOrder === "alphaAsc" ? "bg-gray-200 font-semibold" : ""} hover:bg-gray-100 hover:text-gray-400`}>A-Z</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setSortOrder('alphaDesc'); setOpenFilter(false); }} className={`${sortOrder === "alphaDesc" ? "bg-gray-200 font-semibold" : ""} hover:bg-gray-100 hover:text-gray-400`}>Z-A</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                  {lessons.length > 0 ? 
										<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full mt-5'>
											{sortedLessons.map((data: any) => (
												<div key={data.id} className='flex cursor-default items-center justify-center'>
													<div className='w-[175px] h-[245px] rounded-lg overflow-hidden relative flex justify-center hover:scale-[102%] hover:shadow-md transition-all duration-300 cursor-pointer'>
														{data.imageSrc === "" ? (
															<div className='w-full h-4/5 bg-[#835BD2] flex items-center justify-center rounded-lg'>
																<h1 className='text-5xl text-white'>{data.name.charAt(0).toUpperCase()}</h1>
															</div>
														) : (
															<Image src={data.imageSrc ? data.imageSrc : ""} alt={data.name} className='w-full h-4/5 object-cover' />
														)}
														<div className='absolute text-sm bottom-0 p-3 rounded-xl bg-white w-full h-1/5 flex items-center justify-center text-gray-400'>
															<p className='absolute text-xs top-1 right-1 font-light text-gray-300'>{formatDate(data.createdAt)}</p>
															{data.name}
														</div>
														<AddMaterialModal data={data} lesson={lesson} visov={visov}/>
													</div>
												</div>
											))}
										</div>
									:
									<div className='min-h-[40vh] flex flex-col gap-1 items-center justify-center'>
										<h1 className='text-base font-light text-[#835BD2]'>Вы не создали ни один урок</h1>
										<Link href={"/learning/materials"}>
											<Button 
												variant={"violetSelect"} 
												className='text-base font-normal'
											>
												Создать прямо сейчас!
											</Button>
										</Link>
									</div>
									}
                </div>
            }
          </>
          :
          <div className='w-full h-full justify-center items-start'>
            <div className="mt-5 grid grid-cols-3 gap-1">
              {/* Кнопки для фильтрации по языку */}
              <Button
                onClick={() => {
                  setSelectedLanguage(null);
                }}
                className={`flex gap-1 border-2 border-blue-500 font-medium hover:bg-blue-100 ${selectedLanguage === "все" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              >
                <MdLanguage className='w-4 h-4' />
                Все
              </Button>
              <Button
                onClick={() => {
                  setSelectedLanguage("English");
                }}
                className={`flex gap-1 border-2 border-blue-500 font-medium hover:bg-blue-100 ${selectedLanguage === "English" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              >
                <Image src="/en.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm" />
                Английский
              </Button>
              <Button
                onClick={() => {
                  setSelectedLanguage("Korean");
                }}
                className={`flex gap-1 border-2 border-purple-400 font-medium hover:bg-purple-100 ${selectedLanguage === "Korean" ? "bg-purple-400 text-white" : "bg-white text-purple-400"}`}
              >
                <Image src="/korean.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm" />
                Корейский
              </Button>
              <Button
                onClick={() => {
                  setSelectedLanguage("China");
                }}
                className={`flex gap-1 border-2 border-red-400 font-medium hover:bg-red-100 ${selectedLanguage === "China" ? "bg-red-400 text-white" : "bg-white text-red-400"}`}
              >
                <Image src="/ch.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm" />
                Китайский
              </Button>
              <Button
                onClick={() => {
                  setSelectedLanguage("German");
                }}
                className={`flex gap-1 border-2 border-blue-400 font-medium hover:bg-blue-100 ${selectedLanguage === "German" ? "bg-blue-400 text-white" : "bg-white text-blue-400"}`}
              >
                <Image src="/gr.png" alt="en" width={20} height={20} className="w-6 h-4 shadow-md rounded-sm" />
                Немецкий
              </Button>
                <Input
                  className='w-full h-10 placeholder:text-gray-300 text-sm'
                  placeholder='введите название курса...' // Меняем placeholder на "введите название курса..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние при вводе
                />
            </div>
            <div className='grid grid-cols-2 gap-5 justify-center w-full items-center mt-6'>
              {filteredMaterials.map((data) => (
                <li className='flex items-center justify-center cursor-pointer' key={data.id}>
                  <div>
                    <div className='w-[175px] h-[275px] rounded-lg overflow-hidden relative flex justify-center hover:scale-105 hover:shadow-lg transition-all duration-300'>
                      <Image width={1000} height={1000} src={data.photoUrl} alt="" className='w-full h-4/5 object-cover' />
                      <div className='absolute text-sm bottom-0 p-3 bg-white w-full h-1/5'>
                        {data.name}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default ChooseMaterial;