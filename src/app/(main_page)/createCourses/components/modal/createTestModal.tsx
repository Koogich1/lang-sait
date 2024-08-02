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
import createSimpTest from "../actions/createSimpTest"
import createSimpleTest from "../actions/test/createSimpleTest"
import { useState } from "react"
import createAudioTest from "../actions/test/createAudioTest"
import createFillAnswer from "../actions/test/createNewFillAnswer"
import createPoryadTest from "../actions/test/createPoryadTest"
import createTrueOrFalse from "../actions/test/createTrueOrFalse"
import createLettersToWord from "../actions/test/connectlettestToWord"
import createBigTextTest from "../actions/test/createBigTextTest"
import createBigTestByPoryad from "../actions/test/createTextPoPoryiadky"
import Image from "next/image"

import { ScrollArea } from "@/components/ui/scroll-area"

const CreateTestModal = ({currRasdelId, visov, lessonId} : {currRasdelId: string, visov: () => void, lessonId: string}) => {

	const[open, setOpen] = useState(false)
	
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger className="w-full flex hover:bg-gray-200 flex-col items-center justify-center h-20 border-2 border-dashed mt-5 hover:border-gray-400 transition-all rounded-lg">
				<div className="h-8 w-8 bg-gray-400 rounded-full flex items-center justify-center">
					<FaPlus className=" p-1 text-white text-2xl"/>
				</div>
				<h1 className="text-base font-semibold text-gray-400">Добавить новое упражнение</h1>
			</DialogTrigger>
				<DialogContent className="">
					<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-gray-600">Создать новое упражнение</DialogTitle>
					</DialogHeader>
					<ScrollArea className="h-[90vh] w-full flex justify-center rounded-md border p-4">
						<div className="flex flex-col gap-5">
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createSimpleTest({ littleRasdelId: currRasdelId, lessonId: lessonId });
									visov();
									setOpen(false);
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type1.png'} 
										height={500} 
										width={500} 
										alt="test1" 
										className="w-full opacity-50 rounded-lg max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Тест (один или более ответ(ов))</h1> 
							</Button>

							<Button variant={"shadow2"}
								onClick={() => {
									createAudioTest({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type2.png'} 
										height={500} 
										width={500} 
										alt="test2" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">АудиоТест</h1> 
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createFillAnswer({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type3.png'} 
										height={500} 
										width={500} 
										alt="test3" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Ответ на вопрос</h1> 
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createPoryadTest({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type4.png'} 
										height={500} 
										width={500} 
										alt="test4" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Расставить по порядку</h1> 
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createTrueOrFalse({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type5.png'} 
										height={500} 
										width={500} 
										alt="test5" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Истина или ложь</h1>
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={()=> {
									createLettersToWord({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type6.png'} 
										height={500} 
										width={500} 
										alt="test6" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Составить слово из букв</h1>
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createBigTextTest({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type7.png'} 
										height={500} 
										width={500} 
										alt="test7" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10  text-xl text-gray-600">Статья, сочинение или текст</h1>
							</Button>
							<Button 
								variant={"shadow2"}
								onClick={() => {
									createBigTestByPoryad({littleRasdelId: currRasdelId, lessonId: lessonId})
									visov()
									setOpen(false)
								}}
								className="relative flex-col h-auto w-full overflow-hidden"
							>
								<div className="relative w-full">
									<Image 
										src={'/type8.png'} 
										height={500} 
										width={500} 
										alt="test8" 
										className="w-full opacity-50 rounded-lg  max-h-[250px] object-cover" 
									/>
									<div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-100 pointer-events-none"></div>
								</div>
								<h1 className="font-semibold relative z-10 text-xl text-gray-600">Расставить текст по порядку</h1>
							</Button>
						</div>
					</ScrollArea>
			</DialogContent>
		</Dialog>
	)
}

export default CreateTestModal