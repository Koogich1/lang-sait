"use client"

import findCreatorById from '@/app/(main_page)/createCourses/watching/actions/findCreatorById'
import getMaterialInfoById from '@/app/(main_page)/createCourses/watching/actions/getMaterialInfoById'
import AddCourse from '@/app/(main_page)/createCourses/watching/components/modal/adding/addCourse'
import { Button } from '@/components/ui/button'
import { getUserById } from '@/data/user'
import { courseData, User } from '@prisma/client'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { HiArrowUturnLeft } from "react-icons/hi2";
import RasdelsList from './rasdelsBox'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'next/navigation'

type Props = {
    onMaterialSelect: (id: string) => void
    selectedMaterial: string | null
    isMaterialOpen: boolean
    onBack: () => void // Добавьте этот пропс
}

const OpenMaterial = ({ onMaterialSelect, selectedMaterial, isMaterialOpen, onBack }: Props) => {
    const {CustomSet} = useParams()
    const [selectMaterial, setSelectMaterial] = useState<courseData | null>(null);
    const [creator, setCreator] = useState<User | null>(null);
	const [open, setOpen] = useState(false)

    const findMaterialInfo = useCallback(async () => {
        if (selectedMaterial) {
            const materialData = await getMaterialInfoById(selectedMaterial);
            if (materialData) {
                setSelectMaterial(materialData);
            }
        }
    }, [selectedMaterial]); // Убрали setSelectMaterial, так как он не должен быть здесь

    const findCreatorName = useCallback(async () => {
        if (selectMaterial) {
            const infoAboutTeacher = await findCreatorById(selectMaterial.userId);
            console.log(infoAboutTeacher);
            if (infoAboutTeacher) {
                setCreator(infoAboutTeacher);
            }
        } else {
            console.log("еще нет материала");
        }
    }, [selectMaterial]); // Добавили selectMaterial

    useEffect(() => {
        findMaterialInfo();
    }, [findMaterialInfo]);

    useEffect(() => {
        findCreatorName();
    }, [selectMaterial]); // Вызываем при изменении selectMaterial

    return (
        <>
            {selectedMaterial && (
                <div className='w-full mt-3 relative'>
                    <div className='flex gap-3'>
                        <Image src={selectMaterial?.photoUrl ? selectMaterial?.photoUrl : ""} alt="logo" height={100} width={100} className='w-[100px] rounded-md h-[125px] object-cover'/>
                        <div className='flex flex-col justify-between'>
                            <h1 className='text-xl font-light'>{selectMaterial?.name}</h1>
                            <div className='bg-blue-400 flex gap-3 h-8 px-3 items-center text-white rounded-full w-[212px] hover:bg-blue-500 transition-all cursor-pointer'
								onClick={() => {setOpen(true)}}
						    >
                                <FaPlus />
                                <h1>Добавить весь курс</h1>
                            </div>
                        </div>
                        <Button className='absolute right-0 py-1 h-7 gap-1 flex items-center' variant={"shadow2"} onClick={onBack}>
                            <p>Назад</p>
                            <HiArrowUturnLeft />
                        </Button>
                    </div>
                </div>
            )}
			    <RasdelsList selectMaterial={selectMaterial} />
				<AddCourse openModal={open} setOpenModal={setOpen} courseId={selectMaterial} customSet={CustomSet as string}/>
        </>
    )
}

export default OpenMaterial
