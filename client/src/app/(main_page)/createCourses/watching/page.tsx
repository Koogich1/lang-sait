"use client";

import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import CreateCustomCourseModal from './components/modal/createModal';
import { customCourse, CustomCourseSet } from '@prisma/client';
import { db } from '@/lib/db';
import findedLessons from './actions/findLessons';
import { ClipLoader, HashLoader } from 'react-spinners';
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link';

const Page = () => {
  const[open, setOpen] = useState(false)
  const boxRef = useRef(null);
  const[lessons, setLessons] = useState<customCourse[] | null>(null)
  const[loading, setLoading] = useState(true)
  
  const fetchLessons = async() => {
    setLoading(true)
    const lessons = await findedLessons()
    console.log(lessons)
    if(lessons){
      setLessons(lessons)
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchLessons()
  }, [])

  if(loading){
    return(
      <div className='w-full h-[60vh] bg-white shadow-lg rounded-lg gap-3 flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-semibold text-gray-500'>Загрузка данных...</h1>
        <HashLoader size={60} color='#6B7280'/>
      </div>
    )
  }

  return (
    <>
     {lessons?.length === 0 || lessons === null ? 
      <div className='w-full bg-white rounded-lg shadow-lg min-h-[60vh] mt-5 flex items-center justify-center p-5'>
      <div className='flex items-center justify-center flex-col gap-3'>
      <h1 className='text-xl font-semibold text-gray-600'>
        Cоставьте свои уроки, используйте разные 
      </h1>
      <Button ref={boxRef} id='box' variant={"violetSelect"} className='font-medium text-lg' onClick={() => {
        setOpen(true)
      }}>
        Начать прямо сейчас
      </Button>
    </div>
    </div>
    :
    <div className='w-full min-h-[60vh] bg-white p-3 mt-5'>
      <div className='grid grid-cols-4 gap-3'>
      {lessons.map((data) => (
        <Link href={`/createCourses/watching/${data.id}`} key={data.id}>
          <div className='w-[175px] h-[275px] rounded-lg overflow-hidden relative flex justify-center hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            {data.imageSrc === "" ? (
              <div className='w-full h-4/5 bg-[#835BD2] flex items-center justify-center'>
                <h1 className='text-5xl text-white'>{data.name.charAt(0).toUpperCase()}</h1>
              </div>
            ) : (
              <img src={data.imageSrc ? data.imageSrc : ""} alt={data.name} className='w-full h-4/5 object-cover' />
            )}
            <div className='absolute text-sm bottom-0 p-3 bg-white w-full h-1/5 flex items-center justify-center text-gray-400'>
              {data.name}
            </div>
          </div>
        </Link>
      ))}
        <Button ref={boxRef} id='box' variant={"violetSelect"} className='w-[175px] h-[275px] border-2 border-[#835BD2] bg-white border-dotted text-white hover:bg-[#835BD2] shadow-md' onClick={() => {
            setOpen(true)
          }}>
          <div className='h-[3.5rem] w-[3.5rem] rounded-full bg-[#835BD2] flex items-center justify-center'>
            <FaPlus size={40}/>
          </div>
        </Button>
      </div>
    </div>
    }
    <CreateCustomCourseModal openModal={open} setOpenModal={setOpen} visov={() => fetchLessons()} />
    </>
  );
}

export default Page;