"use client";

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { getUserById } from '@/data/user';
import { Language, User } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaMessage, FaUser } from 'react-icons/fa6';

type Props = {
    teacherID: string;
}

const TeacherInfo = ({ teacherID }: Props) => {
    const [user, setUser] = useState<User | null>(null);
    
    // Always call hooks at the top level
    useEffect(() => {
        const fetchInfoAboutTeacher = async () => {
            
                const data = await getUserById(teacherID);
                if (data) {
                    setUser(data);
                }
        }

        fetchInfoAboutTeacher(); // Call function inside useEffect
    }, [teacherID]); // Dependencies for useEffect

    
    if(!user){
        return(
            <Skeleton className='w-full h-20'/>
        )
    }
    
    
        return (
            <div>
                <div className='border border-gray-200 p-1 rounded-lg'>
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
                                    <FaUser />
                                </Button>
                            </Link>
                            <Link href={`/chats/${user.id}`} className="">
                                <Button variant="violetSelect" className="rounded-lg h-[1.9rem] flex gap-2 shadow-none bg-[#699BD8] hover:bg-[#527aab]">
                                    <FaMessage />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default TeacherInfo;
