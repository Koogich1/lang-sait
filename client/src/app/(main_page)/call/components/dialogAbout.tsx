"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { FaInfo } from "react-icons/fa6"
import { MdClose } from "react-icons/md"

const DialogAbout = () => {
	const[open, setOpen] = useState<boolean>(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button className="w-7 h-7 m-0 p-1 text-base" variant="shadow2">
					<FaInfo />
				</Button>
			</DialogTrigger>
			<DialogContent className="p-4 px-6">
				<DialogHeader>
					<DialogTitle className="text-blue-400 text-xl pb-3 flex justify-between items-center">
						Это переходаня страница для звонка!
						<Button 
							className="w-6 h-6 p-0 bg-red-400 hover:bg-red-500 text-white"
							onClick={() => setOpen(false)}
						>
							<MdClose />
						</Button>
					</DialogTitle>
					<DialogDescription className="text-base text-gray-400">
						<span>В данном модуле вы можете соврешать, присоединяться к активным для вас звонкам</span>
						<span>Активный урок сам направит вам ссылку для присоединения, но так-же вы можете просмотреть ближайшие звонки тут!</span>
					</DialogDescription>
				</DialogHeader>
				<Button 
					variant={"shadow2"} 
					className="bg-blue-100 text-blue-400 hover:text-blue-500 hover:bg-blue-200"
					onClick={() => setOpen(false)}
				>
					Понятно!
				</Button>
			</DialogContent>
		</Dialog>
	)
}

export default DialogAbout