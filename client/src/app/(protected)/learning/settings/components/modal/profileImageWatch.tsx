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
	activeImage: string,
	openModal: boolean;
	setOpenModal: any;
	teacherId: string;
}

const ProfileImageWatch = ({ activeImage, openModal, setOpenModal, teacherId }: Props) => {
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
							<Image src={activeImage} alt="galaryImage" width={700} height={700} className=""/>
						</div>
						<div className="w-[30%] flex flex-col justify-between mt-10 p-2">
							<h1 className="w-full text-center font-semibold text-[#835BD2] text-lg">Комментарии</h1>
							<ScrollArea className="w-full h-2/3 border-y border-gray-100 my-3 text-center flex items-center">
								<div className="pt-[60%] flex items-center justify-center flex-col gap-2">
									<p className="text-gray-200 font-medium">В разработке...</p>
									<HashLoader color="#e5e7eb"/>
								</div>
							</ScrollArea>
						</div>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}

export default ProfileImageWatch;