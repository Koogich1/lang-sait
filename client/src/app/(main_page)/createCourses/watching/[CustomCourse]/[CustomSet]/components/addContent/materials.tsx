"use client"

import { courseData } from "@prisma/client"
import { useEffect, useState } from "react"
import findMaterials from "../../../../actions/findMaterials"
import MaterialBox from "./materialBox"

const Materials = ({ customSet, onMaterialSelect, selectedMaterial, isMaterialOpen }: { 
    customSet: string, 
    onMaterialSelect: (id: string | null) => void, 
    selectedMaterial: string | null, 
    isMaterialOpen: boolean 
}) => {
    const [materials, setMaterials] = useState<courseData[]>([])

    const fetchMaterials = async () => {
        const fetchedData = await findMaterials()
        if (fetchedData) {
            setMaterials(fetchedData)
        }
    }

    useEffect(() => {
        fetchMaterials()
    }, [])

    return (
        <>
            <MaterialBox 
                materials={materials} 
                onMaterialSelect={onMaterialSelect} 
                selectedMaterial={selectedMaterial} 
                isMaterialOpen={isMaterialOpen}
            />
        </>
    )
}

export default Materials
