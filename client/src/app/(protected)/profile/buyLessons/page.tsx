"use client"

import { currentUser } from "@/lib/auth"
import { User } from "@prisma/client"
import { useEffect, useState } from "react"
import Header from "../_components/header"
import TeacherProfile from "./components/teacherProfile"
import { Button } from "@/components/ui/button"
import { FaInfo } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import userEvent from "@testing-library/user-event"

const BuyLessons = () => {
    const [user, setUser] = useState<User | null>(null)
    const [openInfo, setOpenInfo] = useState<boolean>(false)
    const [showText, setShowText] = useState<boolean>(false) // Новое состояние

    const fetchUser = async () => {
        const fetchData = await currentUser()
        if (fetchData) {
            setUser(fetchData)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (openInfo) {
            const timer = setTimeout(() => {
                setShowText(true)
            }, 300); // Длительность анимации открытия
            return () => clearTimeout(timer);
        } else {
            setShowText(false); // Скрываем текст, когда div закрыт
        }
    }, [openInfo]);

    if (!user) {
        return (
            <div>
                Загрузка...
            </div>
        )
    }

    return (
        <div className=''>
            <Header 
                header="Покупка уроков"
                user={user}
            />
            <div className={`${openInfo ? "w-full bg-white" : "w-20 bg-gray-200"} h-20 relative transition-all shadow-lg mt-5 rounded-lg flex items-center justify-center text-xl font-semibold text-blue-400`}>
                {showText && openInfo ? ( // Показываем текст только когда openInfo истинно и текст должен быть показан
                    <h1>На этой странице вы можете просмотреть количество купленных уроков у каждого преподавателя и приобрести их</h1>
                ) : null}
                <Button 
                    variant={"shadow2"} 
                    className={`absolute p-0 text-xl w-10 h-10  hover:bg-gray-300 text-gray-400 hover:text-gray-600 ${openInfo ? "w-10 h-10 right-5 bg-gray-200" : "bg-white w-20 h-20"}`}
                    onClick={() => {
                        setOpenInfo(!openInfo)
                    }}
                >
                    {openInfo ? <IoClose className="text-3xl"/> : <FaInfo /> }
                </Button>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                {user.TeacherS.map((data, index) => (
                    <div className="flex items-center justify-center" key={index}>
                        <TeacherProfile teacherId={data}/>
                    </div>
                ))}
                {user.TeacherS.length < 2 && 
                    <div className="flex items-center justify-center">
                        <div className="w-1/2 h-[40vh] bg-white shadow-lg rounded-lg flex flex-col gap-3 items-center justify-around px-2 py-4">

                        </div>
                    </div>
                }
                {user.TeacherS.length < 3 && 
                    <div className="flex items-center justify-center">
                        <div className="w-1/2 h-[40vh] bg-white shadow-lg rounded-lg flex flex-col gap-3 items-center justify-around px-2 py-4">
                        
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default BuyLessons