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
import { useState } from "react";
import { FaPlus } from "react-icons/fa6"
import DeleteLanguage from "../../settings/actions/deleteLanguage";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type LanguageTranslation = {
  [key: string]: string;
};

const englishToRussian: LanguageTranslation = {
  English: 'Английский',
  China: 'Китайский',
  Korean: 'Корейский',
  // Добавьте другие языки по необходимости
};



	const DeleteLanguageModal = ({ name, language, languages, onLanguageDelete}: { name: string | null, language: string, languages:string[], onLanguageDelete: (updatedLanguages: string[]) => void }) => {
		const [open, setOpen] = useState(false);
		const translateLanguage = (language: string) => {
				return englishToRussian[language] || language;
	};

	const handleDelete = () => {
			DeleteLanguage(language, languages).then((response) => {
					if (response !== undefined && "success" in response && response.success !== undefined) {
							const notify = () => toast(
									<p>Язык удален, перезагрузите страницу, чтобы увидеть обновленные данные!</p>
							);
							notify();
					} else {
							const errorMessage = response && response.error ? response.error : 'Произошла ошибка при удалении языка.';
							console.log("все не успешно")
							const notify = () => toast(
									<p>{errorMessage}</p>
							);
							notify();
					}
					setOpen(false);
			});
	};
 
	return (
	<>
			<Dialog open={open}>
					<DialogTrigger className="w-full h-full absolute text-gray" onClick={() => setOpen(true)}>
					</DialogTrigger>
					<DialogContent className="text-gray-600" id="delete-lang-description">
							<DialogTitle className="font-normal text-lg">
									<span className="font-bold">{name}</span>, вы действительно хотите удалить {translateLanguage(language)} язык?
							</DialogTitle>
							<DialogHeader className="text-base">
									В таком случае вы не будете отображаться у учеников, при поиске по данному языку
							</DialogHeader>
							<div className="flex justify-between gap-5 pt-3">
									<Button 
										className="w-1/2 text-base font-semibold" 
										variant='violetSelect'
										onClick={handleDelete}
									>
											Подтвердить
									</Button>
									<Button className="w-1/2" variant='shadow2' onClick={() => setOpen(false)}>
											Отменить
									</Button>
							</div>
					</DialogContent>
			</Dialog>
		</>
	);
};

export default DeleteLanguageModal;