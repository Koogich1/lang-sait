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

type Props = {
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	openModal: boolean;
	videoSrc: string;
}

const VideoTeacher = ({setOpenModal, openModal, videoSrc} : Props) => {
	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="max-w-[1100px]">
				<div className="w-8 h-8 bg-red-200 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-2xl transition-all rounded-lg cursor-pointer absolute top-0 right-0 m-6" 
					onClick={() => {setOpenModal(false)}}
				>
					<IoClose />
				</div>
				<DialogHeader>
					<DialogTitle className="text-2xl text-[#835BD2] font-medium ">Видеовизитка учителя</DialogTitle>
					<DialogDescription>
						<video controls width="" height="600" className="w-full rounded-lg mt-5">
							<source src={videoSrc} type="video/mp4" />
							Ваш браузер не поддерживает видео тег.
						</video>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default VideoTeacher