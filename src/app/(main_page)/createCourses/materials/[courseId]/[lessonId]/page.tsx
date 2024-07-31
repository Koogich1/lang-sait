"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LittleRasdel, QuestionType, Option, Answer } from "@prisma/client"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import DeleteRasdelModal from '../../../components/modal/deleteRasdelModal'
import { FaRegTrashCan } from 'react-icons/fa6'
import deleteLittleRasdel from '../../../components/actions/deleteRasdel'
import createLittleRasdel from '../../../components/actions/createLittleRasdel'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'

import { IoCheckmark } from "react-icons/io5";
import updateLittleRasdelName from '../../../components/actions/updateLittleRasdelName'
import { Checkbox } from '@/components/ui/checkbox'
import OrderBlock from './components/OrderBlock'

const FormSchema = z.object({
  username: z.string().max(30, {
		message: "Максимум 30 символов"
	})
})

type Test = {
  id: string;
  lessonId: string;
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

	useEffect(() => {
		const loadRasdels = async () => {
			await fetchRasdels(); // Ждем, пока данные загружены
		}
		loadRasdels(); // Вызываем функцию загрузки данных
	}, [lessonId])

	useEffect(() => {
		if (currRasdel) {
			form.setValue("username", currRasdel.name)
		}
	}, [currRasdel]); // Обновляем username при изменении currRasdel

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "", // Начальное значение остается пустым
		},
	})

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
								className={`flex gap-3 p-0 relative hover:bg-gray-200 border-b border-gray-100 justify-start text-gray-400 hover:text-gray-500 ${currRasdel?.id === data.id ? "border-b-blue-400 rounded-none rounded-t-lg border-b-2" : ""}`}
								key={data.id}
							>
								<span>=</span>
								<div
									className='flex gap-5 items-center px-3 py-[0.4rem]'
									onClick={async () => {
										setCurretRasdel({ id: data.id, lessonId: data.lessonId, name: data.name });
										await fetchTest(data.id);
									}}
								>
									<h1 className='font-medium'>{data.name}</h1>
								</div>
								<div
									className='w-4 h-4 bg-red-300 text-white rounded-sm flex items-center justify-center transition-all hover:bg-gray-500 hover:text-white hover:shadow-lg text-xs m-2'
									onClick={async () => {
										await deleteLittleRasdel(data.id);
										await fetchRasdels();
									}}
								>
									<FaRegTrashCan />
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
					<div className='w-full min-h-12 border-b border-gray-100'>
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
								<span>{currRasdel?.name}</span>
								<div
									className='w-8 h-8 bg-gray-200 text-gray-400 rounded-sm flex items-center justify-center transition-all hover:bg-gray-300 hover:text-gray-600 hover:shadow-lg text-lg cursor-pointer'
									onClick={() => {
										setSettingOn(true)
									}}
								>
									<IoPencil />
								</div>
							</h1>
							}
					</div>
					<div className='flex flex-col items-center'>
						{tests?.map((test, index) => (
							<div key={index} className='border border-gray-100 mt-5 flex flex-col justify-between rounded-xl p-3 pt-5 max-w-[430px] shadow-lg'>
							<h3 className='font-semibold text-lg text-gray-600'>{test.question}</h3>
							{/* В зависимости от типа вопроса, можно отобразить разные элементы */}
							{test.questionType === "MULTIPLE_CHOICE" && (
									<ul className='py-3 text-gray-500 font-semibold'>
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
														<h1>{option.text}</h1>
														<h1 className={` ${option.isCorrect ? "bg-green-200 border-green-300 border-2 rounded-xl px-3 text-green-500 font-semibold text-sm" : "bg-red-200 border-red-300 border-2 rounded-xl px-3 text-red-500 font-semibold text-sm"}`}>{option.isCorrect === true ? "верный" : "неверный"}</h1>
													</div>
												</li>
										))}
									</ul>
							)}
							{test.questionType === "ORDERING" && (
									<OrderBlock answers={test.answers}/>
							)}
							{/* Добавьте условия для других типов вопроса по аналогии */}
					</div>
						))}
					</div>
					
					<div
						onClick={() => {
							if (currRasdel && currRasdel.id && currRasdel.lessonId) {
								createSimpTest(currRasdel.id, currRasdel.lessonId);
							} else {
								console.error("currRasdel is null or its properties are undefined");
							}
						}}
					>
						createTest
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page;
