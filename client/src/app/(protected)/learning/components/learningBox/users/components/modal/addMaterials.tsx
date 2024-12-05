"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BookedLesson, customCourse } from "@prisma/client"
import Image from "next/image";
import { useState } from "react";
import AddMaterial from "../actions/lesson/addMaterial";

type Props = {
	data: customCourse;
	lesson: BookedLesson;
	visov: () => void
}

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const year = date.getFullYear();

	return `${day}:${month}:${year}`; // Возвращает формат DD:MM:YYYY
};

const AddMaterialModal = ({data, lesson, visov}: Props) => {
	const [open, setOpen] = useState<boolean>(false)

	const onSubmut = async() => {
		console.log("cтартую")
		const adding = await AddMaterial({lesson: lesson.id, courseInfo: data.id})
		if(adding){
			visov()
			setOpen(false)
		}
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-full h-[245px] absolute top-0 right-0" />
			<DialogContent className="p-3">
				<DialogHeader>
					<DialogTitle className="text-xl font-medium text-[#835BD2]">Вы действительно хотите добавить материал:</DialogTitle>
							<div key={data.id} className='flex cursor-default items-center justify-center pt-5'>
                <div className='border border-gray-200 w-[175px] h-[245px] rounded-lg overflow-hidden relative flex justify-center hover:scale-[102%] hover:shadow-md transition-all duration-300 cursor-pointer'>
                  {data.imageSrc === "" ? 
									(
                    <div className='w-full h-4/5 bg-[#835BD2] flex items-center justify-center rounded-lg'>
                      <h1 className='text-5xl text-white'>{data.name.charAt(0).toUpperCase()}</h1>
                    </div>
                    ) : 
										(
                      <Image src={data.imageSrc ? data.imageSrc : ""} alt={data.name} className='w-full h-4/5 object-cover' />
                    )}
                    <div className='absolute text-sm bottom-0 p-3 rounded-xl bg-white w-full h-1/5 flex items-center justify-center text-gray-400'>
                      <p className='absolute text-xs top-1 right-1 font-light text-gray-300'>{formatDate(data.createdAt.toJSON())}</p>
                        {data.name}
                    </div>
                  </div>
                </div>
				</DialogHeader>
				<div className="flex gap-2">
					<Button 
						variant={"shadow2"} 
						className="text-base font-medium w-1/2" 
						onClick={() => {setOpen(false)}}
					>
						Отменить
					</Button>
					<Button 
						variant={"violetSelect"} 
						className="text-base font-medium w-1/2"
						onClick={() => onSubmut()}
					>
						Подтвердить
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AddMaterialModal