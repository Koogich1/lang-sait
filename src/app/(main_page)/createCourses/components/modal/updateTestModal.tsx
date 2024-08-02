"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react"
import { FaPen } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaTrashCan } from "react-icons/fa6";

import { IoClose, IoCloseOutline } from "react-icons/io5";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import updateTest from "../actions/updateTest";
import createNewOrdering from "../actions/createNewOrdering";
import fetchCurrTest from "../actions/fetchCurrTest";
import deleteOrdering from "../actions/deleteOrdering";
import createNewFillInTheBlank from "../actions/createNewFillInTheBlank";
import createNewMultipleChoose from "../actions/createNewMultipleChoose";
import deleteOptions from "../actions/deleteOptions";
import deleteSimpleTest from "../actions/test/deleteTest";
import { currentUser } from "@/lib/auth";

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
});


type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
};

const UpdateTestModal = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [testInfo, setTestInfo] = useState(test)
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [user, setUser] = useState<User | null>(null)


	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: testInfo.question,
			option: testInfo.options.map((data) => data.text), // массив строк
			isTrue: testInfo.options.map((data) => data.isCorrect.toString()), // массив булевых cтрок
			answer: testInfo.answers.map((data) => data.text),
			poriyadNum: testInfo.answers.map((data) => data.order?.toString()),
		},
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

	const fechCurrTestInfo = async () => {
		const data = await fetchCurrTest(test.id);
		if (data) {
				setTestInfo(data);
				form.reset({
						question: data.question,
						option: data.options.map((data) => data.text),
						isTrue: data.options.map((data) => data.isCorrect.toString()),
						answer: data.answers.map((data) => data.text),
						poriyadNum: data.answers.map((data) => data.order?.toString())
				});
			}
		};

		async function onSubmit(data: z.infer<typeof FormSchema>) {
			const file = data.file;
	
			const optionsToUpdate = data.option.map((text, index) => ({
					id: testInfo.options[index].id,
					text,
					isCorrect: data.isTrue[index] === "true",
			}));
	
			const answersToUpdate = data.answer.map((text, index) => ({
					id: testInfo.answers[index]?.id,
					text,
					order: data.poriyadNum[index] ? parseInt(data.poriyadNum[index]) : undefined,
			}));
	
			// Проверяем, выбран ли файл
			if (file) {
					const formData = new FormData();
					formData.append('file', file);
					formData.append('question', data.question);
					formData.append('testId', testInfo.id);
					// Добавьте другие необходимые поля, такие как optionsToUpdate и answersToUpdate,
					// если это нужно на сервере, например, в JSON-формате.
	
					try {
							const response = await fetch('/api/user/addFiles', { // Путь к вашему API
									method: 'POST',
									body: formData,
							});
	
							const result = await response.json();
	
							if (result.success) {
									// Обновляем тест с URL файла
									await updateTest({
											options: optionsToUpdate,
											answers: answersToUpdate,
											testId: testInfo.id,
									});
	
									setOpen(false); // Закрытие модального окна
									updateVisov(); // Обновление данных
							} else {
									console.error('Ошибка загрузки файла на сервер:', result.error);
							}
					} catch (error) {
							console.error('Ошибка при отправке запроса:', error);
					}
			} else {
					// Если файл не выбран, просто обновляем тест
					await updateTest({
							name: data.question,
							options: optionsToUpdate,
							answers: answersToUpdate,
							testId: testInfo.id,
					});
	
					setOpen(false);
					updateVisov();
			}
	}

	return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
				<div className="p-2 mt-3 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 text-lg absolute top-[-50px] right-0 rounded-lg cursor-pointer">
					<FaPen />
				</div>
      </DialogTrigger>
      <DialogContent className="text-gray-500">
				<DialogHeader className="text-xl font-semibold text-gray-600">
					<DialogTitle></DialogTitle>
					Изменить данные
				</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
				{testInfo.questionType === "AUDIOCHOOSE" ? (
              <div>
                <audio src={testInfo.question} controls></audio>
								<FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
										<FormLabel className="w-1/3 text-lg font-semibold text-gray-600">Выберите файл:</FormLabel>
										<FormControl className="w-2/3 text-lg">
										<Input
												type="file"
												accept="audio/mpeg"
												onChange={(e) => {
													if (e.target.files && e.target.files.length > 0) {
														form.setValue('file', e.target.files[0]); // Сохраняем файл в форму
													}
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
                )}
              />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="w-1/3 text-lg font-semibold text-gray-600">Вопрос:</FormLabel>
                    <FormControl className="w-2/3 text-lg">
                      <Textarea placeholder="Введите вопрос" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
						)}
						
					{testInfo.options && testInfo.options.map((data, index) => (
						<div className="flex gap-3" key={index}>
							<FormField
							key={data.id}
							control={form.control}
							name={`option.${index}`} // Динамические имена для массива
							render={({ field }) => (
								<FormItem className={`flex items-center justify-between ${testInfo.questionType === "FILL_IN_THE_BLANK" ? "w-[100%]" : "w-[75%]"}`}>
									<FormLabel className="w-1/3 text-lg font-semibold text-gray-600">{`Ответ ${index + 1}:`}</FormLabel>
									<FormControl className="w-2/3 text-lg">
										<Textarea placeholder="Введите ответ" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>
							{testInfo.questionType === "FILL_IN_THE_BLANK" ? 
							<div 
							onClick={() => {
								deleteOptions(data.id)
								fechCurrTestInfo()
								updateVisov() //ВОТ ТУТ НАДО ПОСЛЕ ФОРМУ ОБНОВИТЬ
							}} className="mt-2 w-5 h-5 bg-red-200 text-red-400 border border-red-500 rounded-sm text-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 hover:text-red-700 hover:border-red-700 transition-all">
								<IoCloseOutline />
						</div> :
							<>
								<FormField
										key={data.id+1}
										control={form.control}
										name={`isTrue.${index}`}
										render={({ field }) => (
												<FormItem className="flex items-center justify-between w-[25%]">
														<FormControl className="text-lg">
																<Select onValueChange={field.onChange} defaultValue={data.isCorrect.toString()}>
																		<SelectTrigger>
																				<SelectValue placeholder="Выберите правильный ответ" />
																		</SelectTrigger>
																		<SelectContent>
																				<SelectItem value="false">неверный</SelectItem>
																				<SelectItem value="true">верный</SelectItem>
																		</SelectContent>
																</Select>
														</FormControl>
														<FormMessage />
												</FormItem>
										)}
								/>
								<div 
									onClick={() => {
										deleteOptions(data.id)
										fechCurrTestInfo()
										updateVisov() //ВОТ ТУТ НАДО ПОСЛЕ ФОРМУ ОБНОВИТЬ
									}} className="w-5 h-5 mt-2 bg-red-200 text-red-400 border border-red-500 rounded-sm text-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 hover:text-red-700 hover:border-red-700 transition-all">
										<IoCloseOutline />
								</div>
							</>
							}
						</div>
					))}
					{testInfo.answers && testInfo.answers.map((data, index) => (
						<div key={data.id} className="flex gap-3 w-full justify-between items-center">
							<FormField
							key={data.id}
							control={form.control}
							name={`answer.${index}`} // Динамические имена для массива
							render={({ field }) => (
								<FormItem className="flex items-center w-[89%] justify-between ">
									<FormLabel className="w-1/3 text-lg font-semibold text-gray-600">{`Ответ ${index + 1}:`}</FormLabel>
									<FormControl className="text-lg">
										<Textarea placeholder="Введите ответ" {...field}/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							/>
							<div className="flex flex-col justify-between items-end gap-1 w-[11%]">
								<div 
								onClick={() => {
									deleteOrdering(data.id)
									fechCurrTestInfo()
									updateVisov() //ВОТ ТУТ НАДО ПОСЛЕ ФОРМУ ОБНОВИТЬ
								}} className="w-5 h-5 bg-red-200 text-red-400 border border-red-500 rounded-sm text-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 hover:text-red-700 hover:border-red-700 transition-all">
									<IoCloseOutline />
								</div>
								<FormField
								key={data.id}
								control={form.control}
								name={`poriyadNum.${index}`} // Динамические имена для массива
								render={({ field }) => (
									<FormItem className="flex h-8 w-full">
										<FormControl className="text-lg">
											<Input placeholder="номер" {...field} className="flex justify-center items-center"/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
								/>
							</div>
						</div>
					))}
					<div className="w-full h-20 mt-3 bg-gray-50 border-2 border-dashed rounded-lg border-gray-300 text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:text-gray-500 transition-all"
						onClick={() => {
							if(testInfo.questionType === "ORDERING"){
								createNewOrdering(testInfo.id)
								fechCurrTestInfo()
							}
							if(testInfo.questionType === "FILL_IN_THE_BLANK"){
								createNewFillInTheBlank(testInfo.id)
								fechCurrTestInfo()
							}
							if(testInfo.questionType === "MULTIPLE_CHOICE"){
								createNewMultipleChoose(testInfo.id)
								fechCurrTestInfo()
							}
							if(testInfo.questionType === "AUDIOCHOOSE"){
								createNewMultipleChoose(testInfo.id)
								fechCurrTestInfo()
							}
							if(testInfo.questionType === "TRUE_OR_FALSE"){
								createNewMultipleChoose(testInfo.id)
								fechCurrTestInfo()
							}
						}}
					>
						<h1 className="text-lg font-semibold">
							Добавить вариант
						</h1>
					</div>
					<DialogDescription className="flex gap-3 mt-3">
						<Button type="submit" variant='violetSelect' className="w-1/2">
							Подтвердить
						</Button>
						<Button type='button' variant={"shadow2"} className="w-1/2"
							onClick={() => {
								setOpen(false)
							}}
						>
							Отменить
						</Button>
					</DialogDescription>
					<div className='absolute top-0 right-0 m-6 h-10 cursor-pointer w-10 flex items-center justify-center bg-red-300 border-2 text-xl border-red-500 rounded-xl text-red-500 hover:bg-red-400 hover:border-red-600 hover:text-red-600 transition-all'
						onClick={() => {
							deleteSimpleTest({testId: test.id, littleRasdelId: test.littleRasdelId})
							updateVisov()
						}}
					>
						<FaTrashCan />
					</div>
				</form>
			</Form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateTestModal