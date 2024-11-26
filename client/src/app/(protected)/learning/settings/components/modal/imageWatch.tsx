"use client"

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/auth";
import { User } from "@prisma/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { HashLoader } from "react-spinners";

type Props = {
	images: string[],
	activeImage: string,
	openModal: boolean;
	setOpenModal: any;
	teacherId: string;
}

const ImageWatch = ({ images, activeImage, openModal, setOpenModal, teacherId }: Props) => {
	const [user, setUser] = useState<User | null>();
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	const fetchUser = async () => {
		const data = await currentUser();
		if (data) {
			setUser(data);
		}
	};

	useEffect(() => {
		fetchUser();
	}, []);

	// Функция для обработки смены изображения
	const goToPreviousImage = () => {
		setActiveImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
	};

	const goToNextImage = () => {
		setActiveImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
	};

	useEffect(() => {
		const index = images.indexOf(activeImage);
		setActiveImageIndex(index >= 0 ? index : 0); // устанавливаем начальный индекс активного изображения
	}, [activeImage, images]);

	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent className="border-none w-auto rounded-sm p-0 overflow-hidden max-w-[95%] md:max-w-[90%] lg:max-w-4/5">
				<Button 
					className="p-0 bg-transparent hover:bg-transparent absolute top-0 right-0 w-10 h-10 text-2xl text-gray-300 hover:text-black"
					onClick={() => { setOpenModal(false) }}
				>
					<IoClose />
				</Button>
				<DialogHeader>
					<div className="flex gap-2">
						<div className="w-[70%] border border-gray-100 shadow-lg rounded-lg overflow-hidden flex items-center relative">
							<Image src={images[activeImageIndex]} alt="galaryImage" width={700} height={700} className=""/>
							<div className="absolute h-20 w-full flex items-center justify-between px-5">
								<div 
									className="bg-black opacity-40 hover:opacity-70 h-10 w-10 rounded-full cursor-pointer transition-all flex items-center justify-center text-white text-xl"
									onClick={goToPreviousImage}
								>
									<FaArrowLeft />
								</div>
								<div 
									className="bg-black opacity-40 hover:opacity-70 h-10 w-10 rounded-full cursor-pointer transition-all flex items-center justify-center text-white text-xl"
									onClick={goToNextImage}
								>
									<FaArrowRight />
								</div>
							</div>
						</div>
						<div className="w-[30%] flex flex-col justify-between mt-10 p-2">
							<h1 className="w-full text-center font-semibold text-[#835BD2] text-lg">Комментарии</h1>
							<ScrollArea className="w-full h-2/3 border-y border-gray-100 my-3 text-center flex items-center">
								<div className="pt-[60%] flex items-center justify-center flex-col gap-2">
									<p className="text-gray-200 font-medium">В разработке...</p>
									<HashLoader color="#e5e7eb"/>
								</div>
							</ScrollArea>
							{user?.teacherId === teacherId ? 
							<div>
								<Button className="w-full font-medium bg-red-600 hover:bg-red-700" variant={"violetSelect"}>
									Удалить
								</Button>
							</div>
							: ""}
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ImageWatch;