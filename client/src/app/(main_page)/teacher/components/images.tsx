"use client"

import ImageWatch from "@/app/(protected)/learning/settings/components/modal/imageWatch";
import Image from "next/image";
import { useState } from "react";

type Teacher = {
  id: string;
  teacherId: string;
  videoSrc: string; // Добавлено поле videoSrc
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
		images: string[],
    languages: {
      language: string; // Убедитесь, что тут у вас правильный тип
      level: string;
      prefers: string; // Или используйте ваш enum
    }[];
    lessonPrise: number;
  };
};

type Props = {
	teacher: Teacher
}
const Images = ({teacher} : Props) => {
	
	const[activeImage, setActiveImage] = useState<string>("")
	const[openImage, setOpenImage] = useState<boolean>(false)

	return (
		<>
			<div className="w-full text-center font-medium text-[#835BD2] text-2xl pb-2">Галерея</div>
			<div className="grid grid-cols-3 gap-1 mt-3">
				{teacher.teacherInfo.images.map((data, key) => (
					<div className="border shadow-sm object-cover rounded-md overflow-hidden bg-black" key={key} onClick={() => {
						setActiveImage(data)
						setOpenImage(true)
					}}>
						<Image src={data} alt="galary" width={100} height={100} className="w-full hover:opacity-60 h-[100px] md:h-[120px] lg:h-[150px] object-cover cursor-pointer transition-all"/>
					</div>
				))}
				<ImageWatch openModal={openImage} setOpenModal={setOpenImage} activeImage={activeImage} images={teacher.teacherInfo.images} teacherId={teacher.teacherId}/>
			</div>
		</>
		
	)
}

export default Images