"use client"; // Ensure strict mode

import { useParams, useRouter } from 'next/navigation'; // Use useParams and useRouter from next/navigation
import { useCallback, useEffect, useState } from 'react';
import { CustomRasdelBox } from '@prisma/client';
import { Button } from '@/components/ui/button';
import ContentRigth from './components/contentRigth';
import CreateRasdelModal from '../../components/modal/createRasdelModal';
import { HashLoader } from 'react-spinners';
import findRasdelByCourseId from '../../actions/findRasdelByLesson';

const Page = () => { // Capitalize the component name 'Page'
    const { CustomSet, CustomCourse } = useParams(); // Use useParams to access parameters
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [rasdels, setRasdels] = useState<CustomRasdelBox[] | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchRasdels = useCallback(
        async () => {
            const rasdelsinf = await findRasdelByCourseId(CustomCourse as string);
            if (rasdelsinf && rasdelsinf.length > 0) {
                setRasdels(rasdelsinf);
            }
            setLoading(false); // Move setLoading here to avoid loading state issues
        }, [CustomCourse]
    )

    useEffect(() => {
        fetchRasdels();
    }, [CustomCourse, fetchRasdels]); // Add 'CustomCourse' to the dependency array

    if (loading) {
        return (
            <div className='w-full min-h-[60vh] bg-white rounded-2xl mt-5 shadow-lg flex items-center justify-center'>
                <HashLoader color="#835BD2" />
            </div>
        ); // Loading indicator
    }

    return (
        <>
            <div className='w-full flex gap-5 mt-5 text-gray-500'>
                {/* Левый блок с разделами */}
                <div className='w-1/4 bg-white rounded-lg p-2 py-3 shadow-md'>
                    <h1 className='text-xl font-light'>Список разделов</h1>
                    <div className='w-full h-[1px] bg-gray-100 mt-2' />
                    <div className='flex flex-col gap-1 mt-3'>
                        {rasdels?.map((data) => (
                            <div className={`${data.id === CustomSet ? "text-white bg-blue-400" : "text-gray-400"} rounded-sm w-full border-dashed transition-all text-sm py-2 border text-center cursor-pointer`}
                                onClick={() => {
                                    router.push(`/createCourses/watching/${CustomCourse}/${data.id}`);
                                }}
                                key={data.id} // добавляем ключ для элемента
                            >
                                {data.name}
                            </div>
                        ))}
                        <div className='w-full h-[1px] bg-gray-100 my-2' />
                        <Button
                            className='w-full px-2 bg-white border-2 border-dashed text-blue-500 border-blue-500 text-sm hover:bg-blue-200 hover:text-blue-700'
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Добавить раздел
                        </Button>
                    </div>
                </div>

                {/* Правый блок с контентом */}
                <div className='flex-grow bg-white rounded-lg p-2 shadow-md min-h-[60vh]'>
                    <ContentRigth customSet={CustomSet as string} />
                </div>
            </div>
            <CreateRasdelModal openModal={open} setOpenModal={setOpen} visov={fetchRasdels} courseId={CustomCourse as string} />
        </>
    );
}

export default Page;
