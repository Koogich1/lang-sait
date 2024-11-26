"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { courseData, rasdelId } from "@prisma/client";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import deleteSet from "../../../actions/deleteMaterial/deleteSet";


interface CustomCourse {
  id: string;
  name: string;
  photoUrl: string;
  language: string;
  createdAt: Date;
}

type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	rasdel: rasdelId | undefined;
	customSetId: string | undefined;
	visov: () => void;
}

const SettingsRasdel = ({openModal, setOpenModal, rasdel, customSetId, visov} : Props) => {

	if(!customSetId)return
	if(!rasdel)return

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="flex justify-between items-end">
					<div 
						className="w-7 h-7 m-6 rounded-md shadow-md  text-white text-2xl flex items-center justify-center bg-red-500 hover:bg-red-600 transition-all hover:shadow-none cursor-pointer absolute right-0 top-0"
						onClick={() => {setOpenModal(false)}}
					>
						<IoClose />
					</div>
					<div className="flex gap-2 items-center text-xl font-light text-gray-500">
						<Image src={rasdel?.photoUrl ? rasdel?.photoUrl : ""} alt="logo" width={100} height={100} className="w-20 h-20 rounded-lg object-cover border shadow-md border-gray-200" />
						<h1>{rasdel?.name}</h1>
					</div>
					</DialogTitle>
					<DialogDescription>
						<h1 className="text-lg my-5">
							Нужно ли давать/изменять название этого блока?
						</h1>
					</DialogDescription>
					<div className="bg-red-500 text-white mt-3 p-1 text-lg rounded-lg cursor-pointer transition-all hover:bg-red-600 shadow-sm hover:shadow-none"
						onClick={async() => {
							await deleteSet(customSetId)
							visov()
							setOpenModal(false)
						}}
					>
						<div className="flex items-center justify-center gap-3 px-2">
							<p>Удалить этот раздел?</p>
							<FaRegTrashAlt className="text-xl"/>
						</div>
					</div>
					<div className="flex gap-2">
						<Button 
							className="w-1/2" 
							variant={"shadow2"}
							onClick={() => {setOpenModal(false)}}
						>
							Отмена
						</Button>
						<Button className="w-1/2 " variant={"violetSelect"}>
							Подтвердить
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default SettingsRasdel