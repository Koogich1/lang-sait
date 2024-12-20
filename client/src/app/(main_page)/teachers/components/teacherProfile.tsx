"use client"

import { Button } from "@/components/ui/button";
import { Language, User } from "@prisma/client";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddToFavourites, { gettAllFavouritesTeachers } from "../addToFavourites";
import { useState } from "react";
import PriseListTeachers from "../../teacher/components/modal/priseList";


type Teacher = {
  id: string;
  teacherId: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
    languages: Language[]; // Adjust this to accommodate the new structure
    lessonPrise: number;
  };
};

type Props = {
	teacher: Teacher
	favouritesT: string[] | undefined
	user: User | null | undefined
}

const FormatedLang = (lang: string) => {
  const languages = ['English', 'Korean', 'China'];
  const langIndex = languages.indexOf(lang);
  const russianLanguages = ['Английский', 'Корейский', 'Китайский'];
  return russianLanguages[langIndex] || lang; // Default to the lang if not found
};

const TeacherProfile = ({teacher, favouritesT,}: Props) => {
	const [open, setOpen] = useState(false)

		return (
			<>
			<Button 
				onClick={() => {
					setOpen(true)
				}}
				variant={"violetSelect"}
				className="font-medium bg-green-600 hover:bg-green-700 h-6 px-2 sm:px-3 rounded-sm text-xs py-0 m-0 mt-[0.125rem]"
			>
				Прайс Лист
			</Button>
				<PriseListTeachers openModal={open} setOpenModal={setOpen} teacher={teacher} />
			</>
	)
}

export default TeacherProfile