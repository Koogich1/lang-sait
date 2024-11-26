"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { rasdelId } from "@prisma/client";
import Image from "next/image";
import addCourse from "../../../actions/addMaterial/addCourse";
import { Button } from "@/components/ui/button";
import { IoClose } from "react-icons/io5";
import addRasdel from "../../../actions/addMaterial/addRasdel";


type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	rasdelId?: rasdelId;
	customSet: string;
}

const AddRasdel = ({openModal, setOpenModal, rasdelId, customSet} : Props) => {

	if(!rasdelId){
		return
	}
	
	const submit = async() => {
		await addRasdel(rasdelId?.id, customSet)
		setOpenModal(false)
	}

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="max-w-[650px]">
				<DialogHeader>
					<DialogTitle className="text-2xl font-normal text-blue-400">Вы действительно хотите добавить раздел:

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
								<Image src={rasdelId?.photoUrl} alt="logo" width={125} height={125} className="w-[125px] h-[125px] object-cover rounded-lg shadow-md"/>
								<h1 className="text-xl font-light text-gray-600">
									<p className="flex gap-3 font-ligth">Название Раздела: <p className="font-medium text-blue-400">{rasdelId.name}</p></p>
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

export default AddRasdel