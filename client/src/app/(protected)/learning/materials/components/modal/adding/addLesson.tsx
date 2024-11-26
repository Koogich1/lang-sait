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
import { Lessons } from "@prisma/client";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import addRasdel from "../../../actions/addMaterial/addRasdel";
import addLesson from "../../../actions/addMaterial/addLesson";


type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	lesson?: Lessons;
	customSet: string
}

const AddLesson = ({openModal, setOpenModal, lesson, customSet} : Props) => {

	if(!lesson){
		return
	}

	const submit = async() => {
		await addLesson(lesson?.id, customSet)
		setOpenModal(false)
	}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="max-w-[650px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal text-blue-400">Вы действительно хотите добавить урок:
					<div 
						className="w-7 h-7 m-6 rounded-md shadow-md  text-white text-2xl flex items-center justify-center bg-red-500 hover:bg-red-600 transition-all hover:shadow-none cursor-pointer absolute right-0 top-0"
						onClick={() => {setOpenModal(false)}}
					>
							<IoClose />
					</div>
					</DialogTitle>
					<DialogDescription>
						<div className="fle">
							<div className="flex gap-3 items-center my-4">
								<Image src={lesson?.photoUrl} alt="logo" width={125} height={125} className="w-[125px] h-[125px] object-cover rounded-lg shadow-md"/>
								<h1 className="text-xl font-light text-gray-600">
									<p className="flex gap-3 font-ligth">Название урока: <p className="font-medium text-blue-400">{lesson.name}</p></p>
								</h1>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
				<div className="flex gap-3">
					<Button type="button" variant={"violetSelect"} className="w-1/2 font-medium" onClick={() => {submit()}}>
						Подтвердить
					</Button>
					<Button type="button" variant={"shadow2"} className="w-1/2"
						onClick={() => {setOpenModal(false)}}
					>
						Отмена
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default AddLesson