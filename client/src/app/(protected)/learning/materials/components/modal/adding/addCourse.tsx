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
import { courseData } from "@prisma/client";
import Image from "next/image";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import addCourse from "../../../actions/addMaterial/addCourse";
import { useParams } from "next/navigation";


type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	courseId?: courseData | null;
	rasdelId?: string;
	lessonId?: string;
	littleRasdelId?: string;
	testId?: string;
	materialId?: string;
	customSet: string;
}


const AddCourse = ({openModal, setOpenModal, courseId, rasdelId, lessonId, littleRasdelId, testId, materialId, customSet} : Props) => {
	if(!courseId) return

	const languageTranslations:any = {
		China: "Китайский",
		Korean: "Корейский",
		English: "Английский",
		German: "Немецкий",
		// Добавьте другие языки по мере необходимости
	};

	const submit = async() => {
		await addCourse(courseId.id, customSet)
		setOpenModal(false)
	}

	const translatedLanguage = languageTranslations[courseId.language] || "Неизвестный язык";
	
	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="max-w-[650px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal text-blue-400">Вы действительно хотите добавить целый курс:

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
								<Image src={courseId?.photoUrl} alt="logo" width={155} height={220} className="w-[155px] h-[220px] object-cover rounded-lg shadow-md"/>
								<h1 className="text-xl font-light text-gray-600">
									{customSet}
									<p className="flex gap-3 font-ligth">Название курса: <p className="font-medium text-blue-400">{courseId.name}</p></p>
									<p className="flex gap-3 font-ligth">Язык: <p className="font-medium text-blue-400">{translatedLanguage}</p></p>
									<p className="flex gap-3 font-ligth">Уровень подготовки: <p className="font-medium text-blue-400">Пока ничего нет...</p></p>
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

export default AddCourse