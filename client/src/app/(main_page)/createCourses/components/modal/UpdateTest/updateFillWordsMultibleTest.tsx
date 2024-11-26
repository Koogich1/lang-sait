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
import { ScrollArea } from "@/components/ui/scroll-area";
import addOrder from "../../actions/test/inputWordsIntext/addOrder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import addOrderBlock from "../../actions/test/inputWordsIntext/addOrderBlock";
import removeOrderBlock from "../../actions/test/inputWordsIntext/deleteOrderBlock";
import { updateOptions } from "../../actions/test/inputWordsIntext/updateOptions";
import updateFillWordsMultibleOptions from "../../actions/test/inputWordsIntext/updateFillWordsMultibleOptions";
import updateTrueOrFalse from "../../actions/test/inputWordsIntext/updateTrueOrFalse";
import { ClipLoader } from "react-spinners";

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
	text: z.string(),
	option: z.array(z.string().max(350, {
		message: "Не более 1000 символов",
	})),
	isTrue: z.array(z.string()),
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

const UpdateFillWordsMultibleText = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [ content, setContent ] = useState(test.question);
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: test.audioHeader ? test.audioHeader : "",
			option: test.options.map((data) => data.text),
			text: test.question,
			isTrue: test.options.map((data) => data.isCorrect.toString()), // массив булевых строк
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

	const onSubmit = async (data: z.infer<typeof FormSchema>) => {
		setLoading(true)
		await updateBigText({testId: test.id, text: data.text, question: data.question})
    await Promise.all(data.option.map((option, index) => (
      updateFillWordsMultibleOptions(test.options[index].id, option)
    )));
    updateVisov();
		setLoading(false)
		setOpen(false)
  };

  const handleToggleCorrect = async (optionId: string, value: string) => {
    const isCorrect = value === "true";
    await updateTrueOrFalse(optionId, isCorrect);
		updateVisov()
  };

	type GroupedOptions = {
		[order: number]: Option[]; // Ключ - это порядок (number), значение - массив опций (Option[])
	};

	const handleAddOrder = async (order: number) => {
    await addOrder({ testId: test.id, order }); 
		updateVisov()
	};

	
	const groupOptionsByOrder = (): GroupedOptions => {
		const groupedOptions: GroupedOptions = {};
	
		test.options.forEach(option => {
			const order = option.order || 0; // Получите порядок, если он есть
			if (!groupedOptions[order]) {
				groupedOptions[order] = [];
			}
			groupedOptions[order].push(option);
		});
	
		return groupedOptions;
	};
	
	const groupedOptions = groupOptionsByOrder();

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
				<div className={`p-2 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg rounded-lg cursor-pointer`}>
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
											<Textarea placeholder="" className="text-xl font-semibold text-gray-400"{...field} />
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
											<Textarea placeholder="" className="text-base font-semibold text-gray-400"{...field} />
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
							<div className="grid grid-cols-1 gap-2 m-0 w-full">
								<ScrollArea className="w-full h-[350px] border border-gray-300 p-2 rounded-lg">
									<div className="grid grid-cols-2 gap-5 w-full">
										{Object.keys(groupedOptions).map((order: string, index: number) => (
											<div key={index} className="w-full border p-3 border-gray-200 rounded-lg">
												<div className="w-full flex justify-between">
													<h2 className="font-semibold py-1">Ответы для блока {order}</h2>
													<div 
														className="w-8 h-8 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
														onClick={() => {
															removeOrderBlock(test.id, Number(order))
															updateVisov()
														}}
													>
														<FaTrashCan className="text-xd"/>
													</div>
													</div>
												{groupedOptions[Number(order)].map((option: Option, index) => (
													<div key={option.id} className="flex justify-between my-1 gap-1 items-center w-full">
														<span className="w-[9%]">{index+1} -</span>
														<FormField
															control={form.control}
															name={`option.${test.options.indexOf(option)}`}
															render={({ field }) => (
																<FormItem className="m-0 w-[66%]">
																	<FormControl>
																		<Input
																			placeholder={`Ответ`}
																			className="text-base font-medium text-gray-400 w-full" // Обязательно добавляем w-full
																			{...field}
																		/>
																	</FormControl>
																</FormItem>
															)}
														/>
														 <div className="flex items-center justify-between w-[25%] mr-2">
																<Select
																	onValueChange={(value) => {
																		handleToggleCorrect(option.id, value);
																	}}
																	defaultValue={option.isCorrect.toString()} // Используем значение по умолчанию
																>
																	<SelectTrigger className={`text-xs w-[105px] ${option.isCorrect ? "bg-green-200 text-green-500 border-2 border-green-400 font-semibold" : "bg-red-200 text-red-500 border-2 border-red-400 font-semibold"}`}>
																		<SelectValue placeholder="Выберите правильный ответ" />
																	</SelectTrigger>
																	<SelectContent>
																		<SelectItem value="false">неверный</SelectItem>
																		<SelectItem value="true">верный</SelectItem>
																	</SelectContent>
																</Select>
															</div>
														</div>
												))}
												<Button
													className="w-full py-[0.6rem] rounded-lg bg-green-200 flex justify-center items-center text-green-600 gap-3 font-semibold text-lg border-[2px] border-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
													type="button"
													onClick={() => {
														handleAddOrder(index + 1)
														updateVisov()
														setOpen(true)
													}} // Используйте новую функцию
												>
													Добавить 
													<FaPlus className="w-6 h-6 bg-green-400 p-[0.255rem] rounded-lg" />
												</Button>
											</div>
										))}
									</div>
								</ScrollArea>
							</div>
							<div 
									className="w-full py-[0.6rem] rounded-lg bg-green-200 flex justify-center items-center text-green-600 gap-3 font-bold text-lg border-[3px] border-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
									onClick={() => {
										addOrderBlock(test.id)
										updateVisov()
									}}
								>
									Добавить блок
									<FaPlus className="w-7 h-7 bg-green-400 p-[0.255rem] rounded-lg" />
								</div>
							<div className="flex justify-between gap-2 pt-4">
								<Button 
									variant={"violetSelect"} 
									className="w-1/2"
									onClick={() => {
										updateVisov()
									}}
								>
									Подтвердить
								</Button>
								<Button 
									variant={"shadow2"} 
									className="w-1/2" 
									onClick={() => {
										setOpen(false)
										updateVisov()
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


export default UpdateFillWordsMultibleText