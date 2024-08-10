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
import updateAnswer from "../../actions/test/updateConnect/updateAnswer";
import updateOption from "../../actions/test/updateConnect/updateOption";
import updateQuestion from "../../actions/test/updateConnect/updatequestion";
import { ClipLoader } from "react-spinners";
import addBlock from "../../actions/test/updateConnect/addBlock";

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
	answer: z.array(z.string().max(350, {
		message: "Не более 1000 символов",
	})),
	option: z.array(z.string().max(350, {
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
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: test.question,
			answer: test.answers.map((data) => data.text),
			option: test.options.map((data) => data.text),
		}
	});


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
    setLoading(true); // Начинаем загрузку

    try {
        await updateQuestion(test.id, data.question); // Дождитесь завершения
        // Обновите ответы
        await Promise.all(
            test.answers.map((answer, index) => 
                updateAnswer(answer.id, data.answer[index])
            )
        );
        // Обновите опции
        await Promise.all(
            test.options.map((option, index) => 
                updateOption(option.id, data.option[index])
            )
        );

        console.log("успех");
        updateVisov();
    } catch (error) {
        console.error("Ошибка обновления:", error);
    } finally {
        setLoading(false); // Завершение состояния загрузки
    }
	}

	if (loading) {
    return (
        <Dialog open={loading}>
            <DialogContent className="flex flex-col items-center justify-center w-full min-h-[60vh] min-w-[60vh] text-2xl font-bold text-gray-400">
                <h1>Обновление данных...</h1>
                <ClipLoader size="100" color="#835BD2" />
            </DialogContent>
        </Dialog>
    );
	}



	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div className={`p-2 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 text-lg absolute right-0 top-0 rounded-lg cursor-pointer`}>
						<FaPen />
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
									Ответы
								</h1>
								<HoverCard>
									<HoverCardTrigger asChild>
										<div className="w-6 h-6 rounded-full bg-blue-200 text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:text-blue-500 transition-all">
											<FaQuestion />
										</div>
									</HoverCardTrigger>
									<HoverCardContent>
										Напишите несколько ответов и текстов, которые необходимо соединить!
									</HoverCardContent>
								</HoverCard>
							</div>
							<div className="flex gap-2">
								<div className="w-1/5 space-y-2">
								{test.answers.map((answer, index) => (
										<div className="flex gap-1 items-center relative" key={answer.id}>
											<span className="text-lg font-bold w-6 h-6 bg-green-300 rounded-md text-green-600 flex justify-center items-center">{index + 1}</span>
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
																					onChange={(e) => {
																						field.onChange(e); // Сначала вызываем стандартное поведение
																					}}
																			/>
																	</FormControl>
															</FormItem>
													)}
											/>
										</div>
								))}
								</div>
								<div className="w-4/5 space-y-2">
								{test.options.map((answer, index) => (
										<div className="flex gap-1 items-center relative" key={answer.id}>
											<FormField
													key={index}  // Добавляем уникальный ключ
													control={form.control}
													name={`option.${index}`}  // Используем динамическое имя
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
													//handleDeleteAnswer(answer.id)
													updateVisov()
												}}
											>
												<FaTrashCan className="text-base"/>
											</div>
										</div>
								))}
							</div>
							</div>
								<div 
									className="w-full py-[0.6rem] rounded-lg bg-green-200 flex justify-center items-center text-green-600 gap-3 font-bold text-lg border-[3px] border-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
									onClick={() => {
										addBlock(test.id)
										updateVisov()
									}}
								>
									Добавить 
									<FaPlus className="w-7 h-7 bg-green-400 p-[0.255rem] rounded-lg" />
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