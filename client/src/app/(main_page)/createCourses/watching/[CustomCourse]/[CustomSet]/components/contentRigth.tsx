"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import Soderg from "./soderg/soderg"
import Materials from "./addContent/materials"

const ContentRigth = ({ customSet }: { customSet: string }) => {
    const [content, setContent] = useState("Soderg")
    const [isSetMaterial, setIsSetMaterial] = useState<string | null>(null)
    const [openMaterial, setOpenMaterial] = useState<boolean>(false)

    const handleMaterialSelect = (id: string | null) => {
        if (id) {
            setIsSetMaterial(id);
            setOpenMaterial(true);
        } else {
            setIsSetMaterial(null);
            setOpenMaterial(false); // Закрываем материал при возврате
        }
    };

    return (
        <div>
            <div className="flex gap-2">
                <div
                    className={`w-1/2 h-8 text-center border-b hover:bg-gray-100 rounded-t-lg transition-all flex items-center justify-center cursor-pointer ${content === "Soderg" ? "border border-b-2 text-blue-400 border-blue-400" : ""}`}
                    onClick={() => { setContent("Soderg"); setOpenMaterial(false); }} // Закрыть материал при переключении
                >
                    Содержание раздела
                </div>
                <div
                    className={`w-1/2 h-8 text-center border-b hover:bg-gray-100 rounded-t-lg transition-all flex items-center justify-center cursor-pointer ${content === "AddContend" ? "border border-b-2 text-blue-400 border-blue-400" : ""}`}
                    onClick={() => { setContent("AddContend"); }} // сохраняем состояние открытого материала
                >
                    Добавление материала
                </div>
            </div>
            <div>
                {content === "Soderg" ? 
                    <Soderg customSet={customSet} />
                    :
                    <Materials 
                        customSet={customSet} 
                        onMaterialSelect={handleMaterialSelect} 
                        selectedMaterial={isSetMaterial} 
                        isMaterialOpen={openMaterial}
                    />
                }
            </div>
        </div>
    )
}

export default ContentRigth