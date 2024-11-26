"use client"

import findRasdels from "@/app/(main_page)/createCourses/watching/actions/findMaterials/findRasdels";
import Settings from "@/app/(main_page)/createCourses/watching/components/modal/adding/Settings";
import SettingsRasdel from "@/app/(main_page)/createCourses/watching/components/modal/adding/SettingsRasdel";
import { Button } from "@/components/ui/button";
import { courseData, rasdelId } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import { IoSettingsSharp } from "react-icons/io5";
import RasdelCourse from "./rasdelCourse";


interface CustomCourseSet {
  id: string;
  customRasdelId: string;
  description: string;
  createdAt: Date;
  position: number;
  rasdels: rasdelId[]; // убедитесь, что это свойство существует
}

const RasdelBox = () => {
	const [rasdels, setRasdels] = useState<CustomCourseSet[]>([])
	const { CustomSet } = useParams();
	const [open, setOpen] = useState(false);
  const [course, setCourse] = useState<rasdelId>();
	const [customSetId, setCustomSetId] = useState<string>()
 
	const fetchRasdels = async() => {
		const fetchRasdels = await findRasdels(CustomSet as string)
		if(fetchRasdels){
			setRasdels(fetchRasdels)
		}
	}


	useEffect(() => {
		fetchRasdels()
		
	}, [])


	return (
		<div>
			<h1 className="text-xl font-extralight pb-2 border-b flex flex-col gap-10 mt-2">Добавленные Разделы</h1>
				{rasdels?.map((data) => (
					<div key={data.id} className="border-y border-gray-100 p-1 py-3 px-3 my-2 x">
						{data.rasdels.map((rasdel) => (
							<div className="flex gap-3 justify-between">
								<div className="flex gap-2">
									<Image src={rasdel.photoUrl} alt="logo" width={125} height={125} className="w-[125px] shadow- border border-gray-200 rounded-lg h-[125px] object-cover"/>
									<div className="flex flex-col justify-between">
										<div className="flex flex-col">
											<p className="text-lg font-medium text-[#835BD2]">{rasdel.name}</p>
											<div><RasdelCourse courseId={rasdel.coureId}/></div>
										</div>
										<Button variant={"violetSelect"} className="text-base font-medium h-9 w-[150px] py-2 px-3">
											Открыть раздел
										</Button>	
									</div>
								</div>
								<div>
								<div 
                    className="bg-gray-200 text-gray-400 flex items-center justify-center rounded-lg text-3xl w-10 h-10 hover:bg-gray-300 cursor-pointer transit"
                    onClick={() => {
											setCustomSetId(data.id)
                      setCourse(rasdel);
                      setOpen(true);
                    }}
                  >
                    <IoSettingsSharp className="hover:rotate-90 transition-all"/>
                  </div>
								</div>
							</div>
						))}
					</div>
				))}
				<SettingsRasdel setOpenModal={setOpen} openModal={open} rasdel={course} customSetId={customSetId} visov={fetchRasdels}/>
		</div>
	)
}

export default RasdelBox