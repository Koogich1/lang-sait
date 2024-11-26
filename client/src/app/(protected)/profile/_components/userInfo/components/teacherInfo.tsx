"use client";

import { Button } from '@/components/ui/button';
import { getUserById } from '@/data/user';
import { Language, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaMessage, FaUser } from 'react-icons/fa6';

type Props = {
    teacherID: string;
    activeLanguage: Language | null;
}

const TeacherInfo = ({ teacherID, activeLanguage }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    
    // Always call hooks at the top level
    useEffect(() => {
        const fetchInfoAboutTeacher = async () => {
            if (activeLanguage && teacherID === activeLanguage.teacherId) {
                const data = await getUserById(teacherID);
                if (data) {
                    setUser(data);
                }
            }
        }

        fetchInfoAboutTeacher(); // Call function inside useEffect
    }, [teacherID, activeLanguage]); // Dependencies for useEffect

    // Render conditional UI based on user and activeLanguage
    if (!activeLanguage) {
        return null; // Render nothing if activeLanguage is null
    }
    
    if (teacherID !== activeLanguage.teacherId || !user) {
        return (
            <div>
                <Button className='w-full h-20 bottom-0 shadow-sm text-lg' variant={"violetSelect"}>
                    Найти учителя!
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <div className='border border-gray-100 p-1 rounded-lg shadow-lg'>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <Image src={user?.image || ""} alt='image' width={60} height={60} className='rounded-full h-[4rem] w-[4rem] shadow-md' />
                            <div className='flex flex-col justify-center'>
                                <h1>{user?.name}</h1>
                                <h1>{user?.surname}</h1>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <Link href={`/teacher/${user.teacherId}`} className="">
                                <Button variant="violetSelect" className="rounded-lg h-[1.9rem] flex gap-2 shadow-none">
                                    <p>Профиль</p>
                                    <FaUser />
                                </Button>
                            </Link>
                            <Link href={`/chats/${user.id}`} className="">
                                <Button variant="violetSelect" className="rounded-lg h-[1.9rem] flex gap-2 shadow-none bg-[#699BD8] hover:bg-[#527aab]">
                                    <p>Чат</p>
                                    <FaMessage />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherInfo;
