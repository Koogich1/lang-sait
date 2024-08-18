"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react"
import { FaPen, FaPlus, FaQuestion } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/auth";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'; 
import updateBigText from "../../actions/test/updateBigText";
import deleteSimpleTest from "../../actions/test/deleteTest";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import updateInputTest from "../../actions/test/inputWordsIntext/updateInputTest";
import addAnswer from "../../actions/test/inputWordsIntext/addAnswer";
import deleteAnswer from "../../actions/test/inputWordsIntext/deleteAnswer";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
	text: z.string(),
	answer: z.array(z.string().max(350, {
		message: "Не более 1000 символов",
	})),
});

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
	audioHeader: string | null;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
	audioName?: string | null;
};

const UpdateDropDown = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [ content, setContent ] = useState(test.question);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: test.audioHeader ? test.audioHeader : "",
			answer: test.answers.map((data) => data.text),
			text: test.question
		}
	});

	const handleDeleteAnswer = async (answerId: string) => {
		await deleteAnswer(answerId, test.id);
		updateVisov()
		const updatedAnswerTexts = test.answers.map((data) => data.text);
		form.setValue("answer", updatedAnswerTexts);
};

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

	async function onSubmit(data: z.infer<typeof FormSchema>) {
    const answersToUpdate = test.answers.map((answer, index) => ({
        id: answer.id, // предполагается, что у вас есть id ответа
        text: data.answer[index] // берём текст из формы
    }));
		console.log(data, "обновляем оинформацию")
    await updateInputTest({
        testId: test.id,
        question: data.question,
        text: data.text,
        answers: answersToUpdate,
    }).then(() => {
        updateVisov(); // обновляем видимость
        setOpen(false); // закрываем модальное окно
    }).catch(err => {
        console.error(err);
    });
	}


	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
				<div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-20px] right-0 rounded-lg cursor-pointer`}>
						<FaPen className="text-base"/>
					</div>
				</DialogTrigger>
				<DialogContent className="text-gray-500 max-w-[900px]">
					<DialogHeader className="text-xl font-semibold text-gray-600">
						<DialogTitle className="text-2xl text-gray-500 flex justify-between pb-2">
							<h2>
								Изменить текст
							</h2>
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
						<div className="w-full h-[1px] bg-gray-100"></div>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
							<h1 className="text-xl font-semibold">
								Задание
							</h1>
							<FormField
								control={form.control}
								name="question"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea placeholder="shadcn" className="text-xl font-semibold text-gray-400"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-2 items-center pt-3">
								<h1 className="text-xl font-semibold">
									Текст упражнения
								</h1>
								<HoverCard>
									<HoverCardTrigger asChild>
										<div className="w-6 h-6 rounded-full bg-blue-200 text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:text-blue-500 transition-all">
											<FaQuestion />
										</div>
									</HoverCardTrigger>
									<HoverCardContent>
										Напишите текст, слово, которое необходимо пропустить, обозначьте так <span className="text-lg font-semibold">[]</span>, позже обязательно добавьте ответ в блоке ответы
									</HoverCardContent>
								</HoverCard>
							</div>
							<FormField
								control={form.control}
								name="text"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea placeholder="shadcn" className="text-base font-semibold text-gray-400"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-2 items-center pt-3">
								<h1 className="text-xl font-semibold">
									Ответы
								</h1>
								<HoverCard>
									<HoverCardTrigger asChild>
										<div className="w-6 h-6 rounded-full bg-blue-200 text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:text-blue-500 transition-all">
											<FaQuestion />
										</div>
									</HoverCardTrigger>
									<HoverCardContent>
										Порядок ответов должнен соответсвовать порядку [] в тексте!
									</HoverCardContent>
								</HoverCard>
							</div>
							<div className="grid grid-cols-3 gap-2 m-0">
								{test.answers.map((answer, index) => (
										<div className="flex gap-1 items-center relative" key={answer.id}>
											<span className="text-lg">{index + 1})</span>
											<FormField
													key={index}  // Добавляем уникальный ключ
													control={form.control}
													name={`answer.${index}`}  // Используем динамическое имя
													render={({ field }) => (
															<FormItem className="w-full m-0 text-gray-400">
																	<FormControl>
																			<Input 
																					placeholder={`Ответ`} 
																					className="text-base font-semibold text-gray-400 m-0 w-full" 
																					{...field} 
																			/>
																	</FormControl>
															</FormItem>
													)}
											/>
											<div 
												className="w-7 h-7 bg-red-300 border-2 border-red-500 rounded-lg absolute right-3 flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
												onClick={() => {
													handleDeleteAnswer(answer.id)
													updateVisov()
												}}
											>
												<FaTrashCan className="text-base"/>
											</div>
										</div>
								))}
								<div 
									className="w-full py-[0.6rem] rounded-lg bg-green-200 flex justify-center items-center text-green-600 gap-3 font-bold text-lg border-[3px] border-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
									onClick={() => {
										addAnswer(test.id)
										updateVisov()
									}}
								>
									Добавить 
									<FaPlus className="w-7 h-7 bg-green-400 p-[0.255rem] rounded-lg" />
								</div>
							</div>
							<div className="flex justify-between gap-2 pt-4">
								<Button 
									variant={"violetSelect"} 
									className="w-1/2"
									onClick={() => {
										updateBigText({testId: test.id, text: content})
										updateVisov()
										setOpen(false)
									}}
								>
									Подтвердить
								</Button>
								<Button 
									variant={"shadow2"} 
									className="w-1/2" 
									onClick={() => {
										setOpen(false)
									}}
								>
									Отменить
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		)	
}


export default UpdateDropDown