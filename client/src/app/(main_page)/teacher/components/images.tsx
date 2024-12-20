"use client"

import ImageWatch from "@/app/(protected)/learning/settings/components/modal/imageWatch";
import Image from "next/image";
import { useState } from "react";
import { AiOutlinePicture } from "react-icons/ai";

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
		<div className="flex flex-col gap-3">
			<div className="flex flex-col">
				<div className="w-full text-center font-medium text-gray-500 text-xl pb-2 flex gap-2 items-center justify-center">
					<AiOutlinePicture className='text-white bg-gray-500 rounded-md h-6 w-6 p-[0.170rem]'/>
					Галерея
				</div>
				<div className="w-full h-[1px] bg-gray-200" />
			</div>
			<div className="grid grid-cols-3 gap-1">
				{teacher.teacherInfo.images.map((data, key) => (
					<div className="border shadow-sm object-cover rounded-md overflow-hidden" key={key} onClick={() => {
						setActiveImage(data)
						setOpenImage(true)
					}}>
						<Image src={data} alt="galary" width={80} height={80} className="hover:opacity-60 h-[80px] w-full object-cover cursor-pointer transition-all"/>
					</div>
				))}
				<ImageWatch openModal={openImage} setOpenModal={setOpenImage} activeImage={activeImage} images={teacher.teacherInfo.images} teacherId={teacher.teacherId}/>
			</div>
		</div>
		
	)
}

export default Images