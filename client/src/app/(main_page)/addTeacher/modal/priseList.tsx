"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IoClose } from "react-icons/io5";


type Teacher = {
	id: string;
	teacherId: string;
	videoSrc: string;
	userInfo: {
		image: string | null;
		name: string | null;
		surname: string | null;
	};
	teacherInfo: {
		aboutMe: string;
		languages: {
			language: string;
			level: string;
			prefers: string;
		}[];
		lessonPrise: number;
	};
};

type Props = {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: boolean;
	teacher: Teacher;
}

const PriseList = ({setOpenModal, openModal, teacher} : Props) => {

	const Prise = teacher.teacherInfo.lessonPrise
	const x5Prise = teacher.teacherInfo.lessonPrise * 0.90
	const x10Prise = teacher.teacherInfo.lessonPrise * 0.80

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="">
				<div className="w-8 h-8 bg-red-200 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-2xl transition-all rounded-lg cursor-pointer absolute top-0 right-0 m-6" 
					onClick={() => {setOpenModal(false)}}
				>
					<IoClose />
				</div>
				<DialogHeader>
					<DialogTitle className="text-2xl text-[#835BD2] font-medium ">Прайслист</DialogTitle>
						<div className="p-3 border border-gray-200 rounded-lg">
							<p className="text-[#835BD2] text-lg font-semibold">Цена за урок</p>
							<div className="bg-gradient-to-r mt-2 from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-lg text-white font-medium">
								{Prise}₽
							</div>
						</div>
						<div className="p-3 border border-gray-200 mt-3 rounded-lg">
							<h1 className="text-[#835BD2] text-lg font-semibold">При покупке пакета</h1>
							<div className="mt-1">
								<p className="text-[#835BD2] text-base">Пакет из 5 уроков</p>
								<div className="relative w-20 mt-4">
									<div className=" bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-lg text-white font-medium">
										{x5Prise}₽
									</div>
									<span className="py px-1 bg-yellow-300 text-red-500 font-semibold absolute top-[-6px] right-[-20px] rounded-sm rotate-45">
										-10%
									</span>
								</div>
							</div>
							<div>
								<p className="text-[#835BD2] text-base">Пакет из 10 уроков</p>
								<div className="relative w-20 mt-4">
									<div className=" bg-gradient-to-r from-purple-600 to-blue-600 w-20 h-8 rounded-lg flex items-center justify-center text-lg text-white font-medium">
										{x10Prise}₽
									</div>
									<span className="py px-1 bg-yellow-300 text-red-500 font-semibold absolute text-sm top-[-6px] right-[-20px] rounded-sm rotate-45">
										-20%
									</span>
								</div>
							</div>
						</div> 
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default PriseList