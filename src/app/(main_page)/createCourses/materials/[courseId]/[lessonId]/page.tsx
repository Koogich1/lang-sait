"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LittleRasdel, QuestionType, Option, Answer, Materials } from "@prisma/client"
import fetchTestFromDb from '../../../components/actions/fetchTestFromDb'
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import getLittleRasdels from '../../../components/actions/getLittleRasdels'
import createSimpTest from '../../../components/actions/createSimpTest'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { FaRegTrashCan } from 'react-icons/fa6'
import deleteLittleRasdel from '../../../components/actions/deleteRasdel'
import createLittleRasdel from '../../../components/actions/createLittleRasdel'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';

import { IoCheckmark } from "react-icons/io5";
import updateLittleRasdelName from '../../../components/actions/updateLittleRasdelName'
import OrderBlock from './components/OrderBlock'
import UpdateTestModal from '../../../components/modal/updateTestModal'
import CreateTestModal from '../../../components/modal/createTestModal'
import { Textarea } from '@/components/ui/textarea'
import DeleteRasdelModal from '../../../components/modal/deleteRasdelModal'
import MaterialBox from './components/materialBox'
import getMaterailFromDb from '../../../components/actions/materials/getMaterailFromDb'

const FormSchema = z.object({
  username: z.string().max(30, {
		message: "Максимум 30 символов"
	})
})

type Test = {
  id: string;
  lessonId: string;
	audioHeader: string | null;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType; // Это значение может быть enum или типом, определенным в Prisma
  options: Option[]; // Используем массив Option
  answers: Answer[];  // Используем массив Answer
};


const Page = () => {
	const { lessonId } = useParams()
	const [tests, setTests] = useState<Test[] | null>(null)
	const [rasdels, setRasdels] = useState<LittleRasdel[] | null>(null)
	const [currRasdel, setCurretRasdel] = useState<{ id: string; lessonId: string; name: string } | null>(null)
	const [settingOn, setSettingOn] = useState(false)
	const [selectedAnswer, setSelectedAnswer] = useState<{ [key: string]: string | null }>({});
	const [testOrMaterials, setTextOrMaterials] = useState("test")
	const [materials, setMaterials] = useState<Materials[]>([]);

  const fetchMaterials = async (rasdelId: string) => {
    const data = await getMaterailFromDb({
      currentLessonId: lessonId as string,
      currentLittleRasdelId: rasdelId,
    });
    if (data) {
      setMaterials(data);
    }
  };


	const fetchTest = async (rasdelId: string) => {
		const data = await fetchTestFromDb({ lessonId: lessonId as string, littleRasdelId: rasdelId })
		if (data) {
			setTests(data)
		}
	}

	const fetchRasdels = async () => {
		const data = await getLittleRasdels(lessonId as string)
		if (data) {
			setRasdels(data)
		}
	}

	const setRasdel = () => {
		if (rasdels && rasdels.length > 0) {
			const firstRasdel = rasdels[0];
			setCurretRasdel(firstRasdel);
			fetchTest(firstRasdel.id);
		} else {
			setCurretRasdel(null);
			setTests(null); // или другое поведение, если разделов нет
		}
	};

	useEffect(() => {
		const loadRasdels = async () => {
			await fetchRasdels(); // Ждем, пока данные загружены
		}
		fetchMaterials(currRasdel?.id ? currRasdel.id : "")
		loadRasdels(); // Вызываем функцию загрузки данных
	}, [lessonId])

	useEffect(() => {
		if (currRasdel) {
			form.setValue("username", currRasdel.name);
		} else if (rasdels && rasdels.length > 0) {  // Если currRasdel не установлен
			setCurretRasdel(rasdels[0]); // Установить первый раздел
			fetchTest(rasdels[0].id); // Получить тесты для первого раздела
		}
	}, [currRasdel, rasdels]); // Добавить rasdels как зависимостьl

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "", // Начальное значение остается пустым
		},
	})

	const updateVisov = () => {
		fetchTest(currRasdel?.id ? currRasdel?.id : "")
	}

	const handleCheckboxChange = (testId: string, optionId: string) => {
		// Устанавливаем выбранный ответ, если он уже выбран, сбрасываем его
		setSelectedAnswer((prev) => ({
				...prev,
				[testId]: prev[testId] === optionId ? null : optionId,
		}));
};

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (currRasdel) {
			updateLittleRasdelName({ name: data.username, rasdId: currRasdel.id });
			setCurretRasdel({ ...currRasdel, name: data.username });
			fetchRasdels()
			setSettingOn(false);
		} else {
			console.error("currRasdel is null, unable to update the name." );
		}
	}

	const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

	return (
		<div className='flex gap-3 mt-5'>
			<div className='flex flex-col items-center'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='w-11 h-11 rounded-xl bg-gray-400 hover:bg-gray-500 text-white shadow-md hover:shadow-none transition-all cursor-pointer text-3xl flex items-center justify-center'>
							<IoMenuOutline />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='text-gray-600 flex items-start flex-col space-y-2 ml-11'>
						<DropdownMenuSeparator />
						<DropdownMenuItem className='text-lg font-semibold'>Разделы</DropdownMenuItem>
						{rasdels && rasdels.map((data) => (
							<DropdownMenuItem
								className={`flex gap-3 p-0 w-full relative hover:bg-gray-200 border-b border-gray-100 justify-start text-gray-400 hover:text-gray-500 ${currRasdel?.id === data.id ? "border-b-blue-400 rounded-none rounded-t-lg border-b-2" : ""}`}
								key={data.id}
							>
								<span>=</span>
								<div
									className='flex gap-5 items-center px-3 py-[0.4rem]'
									onClick={async () => {
										setCurretRasdel({ id: data.id, lessonId: data.lessonId, name: data.name });
										await fetchMaterials
										await fetchTest(data.id);
									}}
								>
									<h1 className='font-medium'>{data.name}</h1>
								</div>
							</DropdownMenuItem>
						))}
						<Button variant="shadow2" className='w-full' onClick={() => {
							createLittleRasdel(lessonId as string);
							fetchRasdels();
						}}>
							Добавить раздел
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className='w-7 h-[1px] bg-gray-300 mt-3' />
				<div className='w-11 bg-white rounded-lg shadow-sm mt-3' />
			</div>
			<div className='min-h-[80vh] w-full p-3 bg-white shadow-lg rounded-lg'>
				<div>
					<div className='w-full min-h-12 border-b border-gray-100 relative'>
						{settingOn ? 
							<div>
								<Form {...form}>
									<form onSubmit={form.handleSubmit(onSubmit)} className="w-full text-gray-400 font-bold text-2xl flex gap-3 items-center">
										<FormField
											control={form.control}
											name="username"
											render={({ field }) => (
												<FormItem className='w-full'>
													<FormControl>
														<Input placeholder="введите название раздела" className='text-2xl h-10 border-gray-200' {...field}/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<Button 
											type="button" 
											className='p-2 text-red-300 bg-red-100 hover:bg-red-200 hover:text-red-400' 
											variant={"shadow2"}
											onClick={() => {
												setSettingOn(false)
											}}
										>
											<IoClose className='text-2xl'/></Button>
										<Button type="submit" className='p-2 text-green-400 bg-green-200 hover:bg-green-400 hover:text-green-700' variant={'shadow2'}>
											<IoCheckmark className='text-2xl' />
										</Button>
									</form>
								</Form>
							</div>
							:
							<h1 className='text-gray-500 font-bold text-2xl flex gap-3 items-center'>
								<span className=''>{currRasdel?.name}</span>
								<div
									className='w-8 h-8 bg-gray-200 text-gray-400 rounded-sm flex items-center justify-center transition-all hover:bg-gray-300 hover:text-gray-600 hover:shadow-lg text-lg cursor-pointer'
									onClick={() => {
										setSettingOn(true)
									}}
								>
									<IoPencil />
								</div>
								<div
									className='absolute right-0'
									onClick={async () => {
										await fetchRasdels();
									}}
								>
									<DeleteRasdelModal
										currRasdel={currRasdel ? currRasdel.id : ""}
										lessonId={currRasdel ? currRasdel.lessonId : ""}
										visov={setRasdel} // это обновляет состояние, устанавливая первый раздел
									/>
								</div>
							</h1>
							}
					</div>
					<div className='w-full h-8 mt-1 rounded-t-lg relative flex justify-between'>
							<ul className='flex justify-between w-full items-center px-3 text-lg font-semibold text-gray-400'>
								<li className={`cursor-pointer w-1/2 flex items-center justify-center border border-gray-100 rounded-t-lg hover:bg-blue-50 transition-all ${testOrMaterials === "test" ? "border-b-[3px] border-b-blue-400 text-blue-400": ""}`}
									onClick={() => {
										setTextOrMaterials("test")
									}}
								>
									Тест
								</li>
								<li className={`cursor-pointer w-1/2 flex items-center justify-center border border-gray-100 rounded-t-lg hover:bg-blue-50 transition-all ${testOrMaterials === "materials" ? "border-b-[3px] border-b-blue-400 text-blue-400": ""}`}
									onClick={async() => {
										if(!currRasdel){return}
										setTextOrMaterials("materials")
										await fetchMaterials(currRasdel.id ? currRasdel.id : "")
									}}
								>
									Материал
								</li>
							</ul>
					</div>
					{testOrMaterials === "test" ? 
						<div className='flex flex-col items-center'>
						{tests?.map((test, index) => (
							<div key={test.id} className='border border-gray-100 mt-5 flex flex-col justify-between rounded-xl p-3 pt-5 min-w-[330px] max-w-[430px] shadow-lg'>
							{test.questionType === "AUDIOCHOOSE" ? 
							<div>
								<h1 className='text-lg font-semibold text-gray-600'>{test.audioHeader ? test.audioHeader : "Введите название"}</h1>
								<audio src={test.question} controls className='w-[80%] h-9 my-3'></audio>
							</div> : test.questionType === "CONNECT_LETTERS" ? <h1 className='text-lg font-semibold text-gray-600'>Составьте слово из букв</h1> :<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>}
							{test.questionType === "MULTIPLE_CHOICE" && (
									<ul className='py-3 text-gray-500 font-semibold relative'>
											{test.options.map((option) => (
												<li key={option.id} className='flex gap-3 h-9 border-t items-center border-gray-100 rounded-lg '>
													<input
														className='w-5 h-5 rounded-xl cursor-pointer transition-all'
														type="checkbox"
														checked={selectedAnswer[test.id] === option.id}
														onChange={() => handleCheckboxChange(test.id, option.id)}
													/>
													-
													<div className={`flex w-full justify-between ${option.isCorrect ? "" : ""}`}>
														<h1 className='text-gray-400 font-semibold'>{option.text}</h1>
														<h1 className={` ${option.isCorrect ? "bg-green-200 border-green-300 border-2 rounded-xl px-3 text-green-500 font-semibold text-sm" : "bg-red-200 border-red-300 border-2 rounded-xl px-3 text-red-500 font-semibold text-sm"}`}>{option.isCorrect === true ? "верный" : "неверный"}</h1>
													</div>
												</li>
										))}
										<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
									</ul>
							)}
							{test.questionType === "ORDERING" && (
								<>
									<OrderBlock answers={test.answers} test={test} visov={() => updateVisov()} currRasdel={currRasdel?.id ? currRasdel?.id : ""}/>
								</>
							)}
							{test.questionType === "FILL_IN_THE_BLANK" && (
								<div className='relative'>
									<div className='flex font-semibold text-gray-400'>
										Правильные ответы:
									</div>
									{test.options.map((data, id)=> (
										<div key={data.id} className='text-gray-600 font-medium mt-1 flex-col'>
											<div className='w-full flex justify-start items-start'>
												<h1 className='flex gap-3 px-3 py-1 text-green-500 bg-green-200 font-semibold rounded-xl border-green-300 text-sm items-center justify-center border-2'>
													{data.text}
													{data.isCorrect}
												</h1>
											</div>
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										</div>
									))}
								</div>
							)}
							{test.questionType === "AUDIOCHOOSE" && (
									<ul className='py-3 text-gray-500 font-semibold relative'>
											{test.options.map((option) => (
												<li key={option.id} className='flex gap-3 h-9 border-t items-center border-gray-100 rounded-lg '>
													<input
														className='w-5 h-5 rounded-xl cursor-pointer transition-all'
														type="checkbox"
														checked={selectedAnswer[test.id] === option.id}
														onChange={() => handleCheckboxChange(test.id, option.id)}
													/>
													-
													<div className={`flex w-full justify-between ${option.isCorrect ? "" : ""}`}>
														<h1 className='text-gray-400'>{option.text}</h1>
														<h1 className={` ${option.isCorrect ? "bg-green-200 border-green-300 border-2 rounded-xl px-3 text-green-500 font-semibold text-sm" : "bg-red-200 border-red-300 border-2 rounded-xl px-3 text-red-500 font-semibold text-sm"}`}>{option.isCorrect === true ? "верный" : "неверный"}</h1>
													</div>
												</li>
										))}
										<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
									</ul>
							)}
							{test.questionType === "TRUE_OR_FALSE" && (
									<ul className='py-3 text-gray-500 font-semibold relative flex flex-col gap-1 items-center w-full'>
											{test.options.map((option) => (
												<div key={option.id} className='flex justify-between items-center w-full border border-gray-100 rounded-lg'>
													<h1 className="px-2 py-2 text-gray-400">{option.text}</h1>
													<h1 className={`px-2 py-2 ${option.isCorrect ? "bg-green-200 rounded-lg border-2 border-green-400 text-green-500" : "bg-red-200 rounded-lg border-2 border-red-400 text-red-500"}`}>{option.isCorrect ? "Истина": "Ложь"}</h1>
												</div>
										))}
										<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
									</ul>
							)}
							{test.questionType === "CONNECT_LETTERS" && (
									<ul className='py-3 text-gray-500 font-semibold relative flex gap-1 items-center w-full flex-col'>
										<span className='text-base font-semibold text-gray-400'>Загаданное слово: {test.question}</span>
										<div className='flex gap-1'>
											{shuffleArray(test.question.split("")).map((letter:any, id:any) => (
													<div key={id} className='h-8 w-8 bg-green-200 flex justify-center items-center border-2 border-green-400 text-green-500 font-semibold rounded-lg'>
															{letter.toLowerCase()}
													</div>
											))}
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										</div>
									</ul>
							)}
							{test.questionType === "BIG_TEXT_OR_STATIYA" && (
								<ul className='relative'>
									<div className='py-3 text-gray-500 font-semibold relative flex gap-1 items-center w-full flex-col'>
										<Textarea className='w-fill min-h-20'/>
									</div>
									<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
								</ul>
							)}
							{test.questionType === "TEXT_PO_PORYADKY" && (
								<ul className='relative'>
									{shuffleArray(test.answers.map((data, id) => (
										<div key={id}>
											<h1 className='text-base font-semibold text-gray-400'>Предложение: {data.order}</h1>
											<h1 className='w-full p-2 border border-gray-100 rounded-lg text-gray-400 font-medium text-sm'>{data.text}</h1>
										</div>
									)))}
									{/* Правильный текст */}
									<div className='mt-4 p-2 border border-blue-200 rounded-lg'>
											<h1 className='font-semibold text-gray-600'>Правильный порядок:</h1>
											<p className='text-gray-400 text-sm flex flex-col gap-3'>
													{test.answers
															.filter(data => data.order !== null) // Фильтрация, чтобы убрать null
															.sort((a, b) => (a.order || 0) - (b.order || 0)) // Сортируем с проверкой на null
															.map((data) => (<span key={data.id}>{data.text}</span>))
													}
											</p>
									</div>
									<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
								</ul>
							)}
					</div>
						))}
					</div>
					:
						<MaterialBox currRasdel={currRasdel ? currRasdel : null} visov={() => fetchMaterials(currRasdel?.id ? currRasdel.id : "")} materials={materials}/>
					}
					<div
					>
						{testOrMaterials === "test" ? <CreateTestModal currRasdelId={currRasdel ? currRasdel.id : ""} visov={updateVisov} lessonId={currRasdel ? currRasdel?.lessonId : ""}/> : ''}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page;
