"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Answer, Option, QuestionType, TextBlock, User } from "@prisma/client";
import { useEffect, useState } from "react"
import { FaPen, FaPlus } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/auth";
import dynamic from "next/dynamic";
import updateBigText from "../../actions/test/updateBigText";
import deleteSimpleTest from "../../actions/test/deleteTest";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import updateQuestion from "../../actions/test/bigTestUpdates/updateQuestion";
import updateBlock from "../../actions/test/bigTestUpdates/updateBlock";
import createBlock from "../../actions/test/bigTestUpdates/createBlock";
import deleteBlock from "../../actions/test/bigTestUpdates/deleteBlock";

import "trix/dist/trix";
import "trix/dist/trix.css";
import { TrixEditor } from "react-trix";

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
  option: z.array(z.string().max(50, {
    message: "Не более 50 символов",
  })),
  isTrue: z.array(z.string()),
	answer: z.array(z.string().max(350, {
		message: "Не более 1000 символов",
	})),
	poriyadNum: z.array(z.string().max(2, {
		message: "Не более 350 символов",
	})),
	file: z.instanceof(File).optional().refine((file) => {
    if (!file) return true; // Если файл не выбран, пропускаем проверку
    return file.type === 'audio/mpeg'; // Проверяем тип файла
  }, {
    message: 'Пожалуйста, загрузите файл формата mp3.',
  }),
	audioName: z.string().max(350, {
		message: "Не более 350 символов"
	})
});


type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType;
	textBlocks: TextBlock[];
  options: Option[];
  answers: Answer[];
	audioName?: string | null;
};

let mergeTags = [{trigger: "@",
  tags: [
    {name: "Dominic St-Pierre", tag: "@dominic"},
    {name: "John Doe", tag: "@john"}
  ]}]

const UpdateWritingTasqModal = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [content, setContent] = useState(test.question);
	const [selectedTextBlockId, setSelectedTextBlockId] = useState<string | null>(null)
	const [questionOrBlock, setQuestionOrBlock] = useState("question")

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	},[])

	const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

	const extractFirstWord = (text: string) => {
		const words = text.split(" "); // Разделение текста на массив слов
		if (words.length > 0) {
			return words[0]; // Возвращаем первое слово
		}
		return ""; // Или возвращаем пустую строку, если текст пуст
	};

	const extractTextFromHTML = (html: string) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.innerText; // Возвращаем текст
  };
	
	useEffect(() => {
		setSelectedTextBlockId(test.id)
	}, [test.id])

	const handleClickTextBlock = (id: string, text: string) => {
    setSelectedTextBlockId(id); // Устанавливаем ID выбранного текстового блока
    setContent(text); // Меняем содержимое редактора
  };
	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
				<div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-20px] right-0 rounded-lg cursor-pointer`}>
						<FaPen className="text-base"/>
					</div>
				</DialogTrigger>
				<DialogContent className="text-gray-500 max-w-[900px]">
					<DialogHeader className="text-xl font-semibold text-gray-600">
						<DialogTitle className="text-2xl text-gray-400 flex justify-between">
							<span>
								Окно редактирования
							</span>
							<div 
								className="w-10 h-10 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
								onClick={() => {
									deleteSimpleTest({testId: test.id, littleRasdelId: test.littleRasdelId})
									updateVisov()
									setOpen(false)
								}}
							>
								<FaTrashCan className="text-2xl"/>
							</div>
						</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-3">
						<div className="w-full flex gap-2 font-semibold text-lg"
						>
						<HoverCard>
							<HoverCardTrigger 
								className="cursor-pointer" 
								onClick={() => {
									setContent(test.question)
									setQuestionOrBlock("question")
									handleClickTextBlock(test.id, test.question)
								}}
							>
								<div className={`border border-b-[3px]   hover:bg-blue-100 hover:border-blue-200 hover:text-blue-300 rounded-t-lg px-3 py-1 transition-all ${test.id === selectedTextBlockId ? "border-blue-500 border-b-[3px] text-blue-500" : ""}`}>{extractFirstWord(extractTextFromHTML(test.question))}...</div></HoverCardTrigger>
							<HoverCardContent className="prose max-w-max">
								{extractTextFromHTML(test.question)}
							</HoverCardContent>
						</HoverCard>
						{test.textBlocks.map((data) => (
							<div key={data.id}
								className={`border border-b-[3px] hover:bg-blue-100 hover:border-blue-200 hover:text-blue-300 rounded-t-lg px-3 py-1 transition-all ${selectedTextBlockId === data.id ? "border-blue-500 border-b-[3px] text-blue-500" : ""}`}
								onClick={() => {
									setContent(data.text)
									handleClickTextBlock(data.id, data.text)
									setQuestionOrBlock("block")
								}}
							>	
								<HoverCard>
									<HoverCardTrigger className="cursor-pointer">{extractFirstWord(extractTextFromHTML(data.text))}...</HoverCardTrigger>
									<HoverCardContent className="prose max-w-max">
										{extractTextFromHTML(data.text)}
									</HoverCardContent>
								</HoverCard>
								
							</div>
						))}
						<div className="border border-b-[3px] rounded-t-lg flex items-center justify-center px-2 transition-all hover:bg-green-500 border-green-500 text-green-500 hover:text-white cursor-pointer"
							onClick={() => {
								createBlock({testId: test.id, text:"Новый блок"})
								updateVisov()
							}}
						>
							<FaPlus className="text-xl"/>
						</div>
					</div>
					<div className="relative">
							<TrixEditor
                className="w-full border border-gray-100 text-gray-500"
                autoFocus={true}
                placeholder=""
                value={content}
                uploadURL="https://domain.com/imgupload/receiving/post"
                uploadData={{"key1": "value", "key2": "value"}}
                fileParamName="blob"
                mergeTags={mergeTags}
                onChange={setContent}
                onEditorReady={() => {}}
              />
						<div>
							{questionOrBlock === "block" ? 
							<div 
								className="w-7 h-7 bg-red-300 absolute top-0 right-0 m-3 border border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
								onClick={() => {
									deleteBlock({blockId: selectedTextBlockId ? selectedTextBlockId: ""})
									updateVisov()
								}}
							>
								<FaTrashCan className=""/>
							</div> 
							: 
							""
							}
						</div>
					</div>
						<div className="flex justify-between gap-2">
							<Button 
								variant={"violetSelect"} 
								className="w-1/2"
								onClick={() => {
									if(questionOrBlock === "question"){
										updateQuestion({testId: test.id, question: content})
									}
									if(questionOrBlock === "block"){
										updateBlock({testId: test.id, blockId: selectedTextBlockId ? selectedTextBlockId : "", text:content })
									}
									updateVisov()
								}}
							>
								Сохранить открытый блок
							</Button>
							<Button 
								variant={"shadow2"} 
								className="w-1/2" 
								onClick={() => {
									setOpen(false)
								}}
							>
								Выйти
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		)	
}


export default UpdateWritingTasqModal