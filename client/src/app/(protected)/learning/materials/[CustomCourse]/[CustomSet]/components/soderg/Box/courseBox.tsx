"use client"

import findCourses from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findCourses"
import { courseData, customCourse } from "@prisma/client"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { format } from 'date-fns'; // Импорт функции format
import { Button } from "@/components/ui/button"
import { IoSettingsSharp } from "react-icons/io5"
import { FaInfo } from "react-icons/fa";
import Settings from "@/app/(main_page)/createCourses/watching/components/modal/adding/Settings"

interface CustomCourse {
  id: string;
  name: string;
  photoUrl: string;
  language: string;
  createdAt: Date;
}

interface CustomCourseSet {
  id: string;
  customRasdelId: string;
  description: string;
  createdAt: Date;
  position: number;
  courses: CustomCourse[]; // убедитесь, что это свойство существует
}

type Props = {
	
}

const CourseBox = () => {
  const { CustomSet } = useParams();
  const [courseSets, setCourseSets] = useState<CustomCourseSet[]>([]);
  const [enter, setEnter] = useState(false);
  const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<CustomCourse>();
	const [customSetId, setCustomSetId] = useState<string>()

  

  const fetchCourses = useCallback(async () => {
    const data = await findCourses(CustomSet as string);
    console.log(data);
    if (data) {
      setCourseSets(data);
    }
  }, [CustomSet]); // Добавлен CustomSet здесь

  const languageTranslations: Record<string, string> = {
    China: "Китайский",
    Korean: "Корейский",
    English: "Английский",
    German: "Немецкий",
    // Добавьте другие языки по мере необходимости
  };

  const translatedLanguage = (course: any) => {
    return languageTranslations[course] || "Неизвестный язык";
  };

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]); // В зависимости только fetchCourses

  return (
    <div>
      <h1 className="text-xl font-extralight pb-2 border-b flex flex-col gap-2">Добавленные курсы</h1>
      {courseSets.map((set) => (
        <div key={set.id}>
          {set.courses && set.courses?.map((data) => (
            <>
              <div key={data.id} className="p-3 mt-1 rounded-lg flex justify-between">
                <div className="flex">
                  <Image src={data.photoUrl} alt="courseLogo" width={120} height={210} className="object-cover rounded-lg w-[120px] h-[170px]" />
                  <div className="flex justify-between flex-col text-lg font-light ml-2">
                    <p className="flex gap-2"><p className="text-[#835BD2] text-xl font-medium">{data.name}</p></p>
                    <div className="flex flex-col">
                      <p className="flex gap-2"> Язык: <p className="text-[#835BD2] font-medium">{translatedLanguage(data.language)}</p></p>
                      <p className="flex gap-2"> Добавлен: <p className="text-[#835BD2] font-medium">{format(new Date(set.createdAt), 'dd:MM:yyyy')}</p></p>
                    </div>
                    <div>
                      <Button variant={"violetSelect"} className="text-base font-medium">
                        Открыть курс
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="bg- justify-between flex flex-col items-end">
                  <div 
                    className="bg-gray-200 text-gray-400 flex items-center justify-center rounded-lg text-3xl w-10 h-10 hover:bg-gray-300 cursor-pointer transit"
                    onClick={() => {
											setCustomSetId(set.id)
                      setCourse(data);
                      setOpen(true);
                    }}
                  >
                    <IoSettingsSharp className="hover:rotate-90 transition-all"/>
                  </div>
                  <div className="flex gap-3">
                    <div 
                      className={`${enter ? "w-[140px] relative justify-between pl-3 pr-2" : "pl-2"} overflow-hidden transition-all cursor-pointer bg-purple-200 text-[#835BD2] hover:bg-purple-300 hover:text-purple-500 w-10 h-10 relative rounded-lg flex items-center`}
                    >
                      <FaInfo className={`text-2xl flex-shrink-0`}/> 
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-100 mt-1"/>
            </>
          ))}
        </div>
      ))}
      <Settings setOpenModal={setOpen} openModal={open} courseId={course} customSetId={customSetId} visov={fetchCourses}/>
    </div>
  )
}

export default CourseBox