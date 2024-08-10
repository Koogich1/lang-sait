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

import { FaPlus } from "react-icons/fa6"
import createSimpleTest from "../actions/test/createSimpleTest"
import { useState } from "react"
import createAudioTest from "../actions/test/createAudioTest"
import createFillAnswer from "../actions/test/createNewFillAnswer"
import createPoryadTest from "../actions/test/createPoryadTest"
import createTrueOrFalse from "../actions/test/createTrueOrFalse"
import createLettersToWord from "../actions/test/connectlettestToWord"
import createBigTextTest from "../actions/test/createBigTextTest"
import createBigTestByPoryad from "../actions/test/createTextPoPoryiadky"

import { ScrollArea } from "@/components/ui/scroll-area"
import { IoClose } from "react-icons/io5"
import createTestTasq from "../actions/test/createTextTesq"
import createWritingTasq from "../actions/test/createWritingTasq"
import createInputText from "../actions/test/inputWordsIntext/createInputText"
import createVideoTest from "../actions/test/videoTest/createVideoTest"
import сreateTrueVariantsTest from "../actions/test/connectTrueVariants/createThisTest"
import createPdfFail from "../actions/test/pdf/createPdfFail"

const CreateTestModal = ({currRasdelId, visov, lessonId} : {currRasdelId: string, visov: () => void, lessonId: string}) => {
	const[open, setOpen] = useState(false)
	const [choseen, setChoosen] = useState("Simple");
	
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-full flex hover:bg-gray-200 flex-col items-center justify-center h-20 border-2 border-dashed mt-5 hover:border-gray-400 transition-all rounded-lg">
				<div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center">
					<FaPlus className=" p-1 text-white text-2xl"/>
				</div>
				<h1 className="text-base font-semibold text-gray-400">Добавить новое упражнение</h1>
			</DialogTrigger>
				<DialogContent className="max-w-max transition-all">
					<div 
						className="w-8 h-8 bg-red-300 border-2 flex justify-center items-center border-red-500 rounded-lg absolute right-0 m-6 hover:bg-red-500 transition-all cursor-pointer text-red-500 hover:text-white"
						onClick={() => {
							setOpen(false)
						}}
					>
						<IoClose className="text-3xl" />
					</div>
					<DialogHeader>
						<DialogTitle className="text-2xl font-bold text-blue-500">Создание нового упражнение</DialogTitle>
					</DialogHeader>
						<div className="flex justify-between text-lg gap-2 font-semibold text-gray-400">
							<div className={`px-3 py-1 border border-gray-300 rounded-t border-b-0 transition-all hover:bg-gray-100 hover:text-gray-400 cursor-pointer ${choseen === "Simple" ? "text-blue-500 border-b-2 border-blue-500 hover:text-blue-500" : ""}`} onClick={() => setChoosen("Simple")}>Обычные тесты</div>
							<div className={`px-3 py-1 border border-gray-300 rounded-t border-b-0 transition-all hover:bg-gray-100 hover:text-gray-400 cursor-pointer ${choseen === "Wreating" ? "text-blue-500 border-b-2 border-blue-500 hover:text-blue-500" : ""}`} onClick={() => setChoosen("Wreating")}>Правописание</div>
							<div className={`px-3 py-1 border border-gray-300 rounded-t border-b-0 transition-all hover:bg-gray-100 hover:text-gray-400 cursor-pointer ${choseen === "Speaking" ? "text-blue-500 border-b-2 border-blue-500 hover:text-blue-500" : ""}`} onClick={() => setChoosen("Speaking")}>Говорение</div>
							<div className={`px-3 py-1 border border-gray-300 rounded-t border-b-0 transition-all hover:bg-gray-100 hover:text-gray-400 cursor-pointer ${choseen === "UpScale" ? "text-blue-500 border-b-2 border-blue-500 hover:text-blue-500" : ""}`} onClick={() => setChoosen("UpScale")}>Тесты повышенной сложности</div>
						</div>
					{choseen === "Simple" && 
						<ScrollArea className="w-full flex justify-center rounded-md border p-4">
							<div className="flex flex-col gap-5">
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createSimpleTest({ littleRasdelId: currRasdelId, lessonId: lessonId });
										visov();
										setOpen(false);
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Тест (один ответ или более)</h1> 
								</Button>
								<Button variant={"shadow2"}
									onClick={() => {
										createAudioTest({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Аудио Тест</h1> 
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createVideoTest({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Видео Тест</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createFillAnswer({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Ответ на вопрос</h1> 
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createPoryadTest({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Расставить по порядку</h1> 
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createTrueOrFalse({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Истина или ложь</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createInputText({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Заполни пропуски в тексте</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={()=> {
										createLettersToWord({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Составить слово из букв</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createBigTextTest({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Статья, сочинение или текст</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createBigTestByPoryad({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Расставить текст по порядку</h1>
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createTestTasq({littleRasdelId: currRasdelId, lessonId: lessonId})
										visov()
										setOpen(false)
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Текстовое задание</h1>
								</Button>
							</div>
						</ScrollArea>
					}
					{
						choseen === "Wreating" && 
						<ScrollArea className="w-full flex justify-center rounded-md border p-4">
							<div className="flex flex-col gap-5">
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createWritingTasq({ littleRasdelId: currRasdelId, lessonId: lessonId });
										visov();
										setOpen(false);
									}}
									className="relative flex-col  bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Текст сочинения, задание, параметры</h1> 
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createPdfFail({ littleRasdelId: currRasdelId, lessonId: lessonId });
										visov();
										setOpen(false);
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Pdf файл</h1> 
								</Button>
							</div>
						</ScrollArea>
					}
					{
						choseen === "Speaking" && 
						<div>
							Говорение
						</div>
					}
					{
						choseen === "UpScale" && 
						<ScrollArea className="w-full flex justify-center rounded-md border p-4">
							<div className="flex flex-col gap-5">
								<Button 
									variant={"shadow2"}
									onClick={() => {
										сreateTrueVariantsTest({ littleRasdelId: currRasdelId, lessonId: lessonId })
										visov();
										setOpen(false);
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Соедините правильные варианты ответа</h1> 
								</Button>
								<Button 
									variant={"shadow2"}
									onClick={() => {
										createAudioTest({ littleRasdelId: currRasdelId, lessonId: lessonId })
										visov();
										setOpen(false);
									}}
									className="relative flex-col bg-purple-50 hover:bg-purple-100 text-[#9c76e8] hover:text-[#6f4db3] h-auto w-full overflow-hidden border border-[#835BD2]"
								>
									<h1 className="font-medium relative z-10 text-base">Записать собственное аудио</h1> 
								</Button>
							</div>
						</ScrollArea>
					}
			</DialogContent>
		</Dialog>
	)
}

export default CreateTestModal