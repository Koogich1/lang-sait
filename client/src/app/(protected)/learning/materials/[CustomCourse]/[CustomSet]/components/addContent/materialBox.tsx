"use client"

import { courseData } from "@prisma/client"
import { useState } from "react"
import OpenMaterial from "./openMaterial/openMaterial"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MdLanguage } from "react-icons/md"

type Props = {
    materials: courseData[],
    onMaterialSelect: (id: string | null) => void
    selectedMaterial: string | null
    isMaterialOpen: boolean
}

const MaterialBox = ({ materials, onMaterialSelect, selectedMaterial, isMaterialOpen }: Props) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const handleBack = () => {
        onMaterialSelect(null);
    };

    // Функция фильтрации материалов по языку
    const filteredMaterials = selectedLanguage 
        ? materials.filter(material => material.language === selectedLanguage) 
        : materials;

    return (
        <>  
            <div>
                {!isMaterialOpen && !selectedMaterial && selectedMaterial == null && 
                    <div>
                        <h1 className="text-2xl font-light pt-5">
                    Доступные материалы
                </h1>
                <div className="mt-5 flex gap-1">
                    {/* Кнопки для фильтрации по языку */}
                         <Button
                            onClick={() => {
                                setSelectedLanguage(null)
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
                    </div>
                }
            </div>
            {selectedMaterial && (
                <OpenMaterial 
                    onMaterialSelect={onMaterialSelect} 
                    selectedMaterial={selectedMaterial} 
                    isMaterialOpen={isMaterialOpen}
                    onBack={handleBack} 
                />
            )}
            {!isMaterialOpen && !selectedMaterial && selectedMaterial == null && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-5 gap-5 pb-5">
                    {filteredMaterials.map((data) => (
                        <li className='flex items-center justify-center cursor-pointer' key={data.id} onClick={() => onMaterialSelect(data.id)}>
                            <div>
                                <div className='w-[175px] h-[275px] rounded-lg overflow-hidden relative flex justify-center hover:scale-105 hover:shadow-lg transition-all duration-300'>
                                    <img src={data.photoUrl} alt="" className='w-full h-4/5 object-cover' />
                                    <div className='absolute text-sm bottom-0 p-3 bg-white w-full h-1/5'>
                                        {data.name}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            )}
        </>
    )
}

export default MaterialBox;