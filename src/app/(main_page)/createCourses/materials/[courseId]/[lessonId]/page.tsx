"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LittleRasdel, QuestionType, Option, Answer, Materials, courseData, User, TextBlock, CorrectAnswer } from "@prisma/client"
import fetchTestFromDb from '../../../components/actions/fetchTestFromDb'
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import { FaBook, FaFilePdf } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import getLittleRasdels from '../../../components/actions/getLittleRasdels'
import createSimpTest from '../../../components/actions/createSimpTest'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { saveAs } from 'file-saver';

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
import getCourseById from '../../../components/actions/getCourseById'
import { currentUser } from '@/lib/auth'
import UpdateBigTextModal from '../../../components/modal/testCreateModal/UpdateBigTextModal'
import UpdateWritingTasqModal from '../../../components/modal/testCreateModal/updateWritingTasqModal'
import UpdateDropDown from '../../../components/modal/Fill_Words_DropDown/updateDropDown'
import UpdateVideo from '../../../components/modal/videoTest/updateVideo'
import UpdateConnectModal from '../../../components/modal/connectModal/updateConnectModal'
import UpdatePdfModal from '../../../components/modal/pdf/updatePdfModal'
import { FaHome } from 'react-icons/fa'
import createHomeWorkRasdel from '../../../components/actions/homework/createHomeWorkRasdel'
import UpdateAudioModal from '../../../components/modal/audio_record/audioRecord'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ClipLoader } from 'react-spinners'

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
	textBlocks : TextBlock[];
  questionType: QuestionType; // Это значение может быть enum или типом, определенным в Prisma
  options: Option[]; // Используем массив Option
  answers: Answer[];  // Используем массив Answer
	correctAnswers?: CorrectAnswer[];
};



const Page = () => {
	const { courseId } = useParams();
	const { lessonId } = useParams()
	const [tests, setTests] = useState<Test[] | null>(null)
	const [rasdels, setRasdels] = useState<LittleRasdel[] | null>(null)
	const [currRasdel, setCurretRasdel] = useState<{ id: string; lessonId: string; name: string } | null>(null)
	const [settingOn, setSettingOn] = useState(false)
	const [selectedAnswer, setSelectedAnswer] = useState<{ [key: string]: string | null }>({});
	const [testOrMaterials, setTextOrMaterials] = useState("test")
	const [materials, setMaterials] = useState<Materials[]>([]);
	const [course, setCourse]= useState<courseData | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Answer | null>>({});
	const [loading, setLoading] = useState(false);

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
			const courseData = await getCourseById(courseId as string)
			const userData = await currentUser()
			if(userData){
				setUser(userData)
			}
			if(courseData){
				setCourse(courseData)
			}
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
	if(!user){
		return
	}

	const handleAnswerSelect = (index: any, answer: any, testId: string) => {
		console.log(`Выбрано: ${answer} на месте ${index} в тесте ${testId}`);
	};

	const domashniyaRabotaRasdel = rasdels?.find(data => data.name === "Домашняя работа");

	const renderFilledText = (text: any, correctAnswers: any, testId: string, index: number) => {
    const parts = text.split(/(\[\])/g); // Разделяем текст на части
    return parts.map((part: any, idx: any) => {
        if (part === '[]') {
            // Получаем выбранный ответ для текущего индекса
            const selectedAnswer = selectedAnswers[testId];
            return (
                <DropdownMenu key={idx}>
                    <DropdownMenuTrigger asChild>
                        <button className='gap-button py-1 px-2 border rounded-lg font-semibold text-gray-300 hover:bg-gray-100 transition-all'>
                            {selectedAnswer ? selectedAnswer.text : 'Выберите'}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='flex gap-2 border border-blue-400'>
                        {correctAnswers.map((answer: Answer, idx: any) => (
                            <DropdownMenuItem 
																className='bg-blue-200 text-blue-400 font-bold hover:bg-blue-300 hover:text-blue-500'
                                key={idx} 
                                onClick={() => {
                                    handleAnswerSelect(testId, answer.text, answer.testId);
                                    // Обновляем состояние выбранных ответа
                                }}
                            >
                                {answer.text}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
        return <span className='font-medium text-gray-500 text-base' key={idx}>{part}</span>; // Возвращаем обычный текст
    });
	};	

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
		<div className='flex gap-3 mt-5'>
			<div className='flex flex-col items-center'>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div className='w-11 h-11 rounded-xl bg-gray-400 hover:bg-gray-500 text-white shadow-md hover:shadow-none transition-all cursor-pointer text-3xl flex items-center justify-center'>
							<IoMenuOutline />
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='text-gray-600 p-1 flex items-start flex-col space-y-2 ml-11'>
						<DropdownMenuItem className='text-lg font-semibold'>Разделы</DropdownMenuItem>
						{rasdels && rasdels.map((data) => (
							data.name === "Домашняя работа" ? "" : 
							<DropdownMenuItem
								className={`flex gap-3 p-0 w-full relative hover:bg-gray-200 border-b border-gray-100 justify-start text-gray-400 hover:text-gray-500 ${currRasdel?.id === data.id ? "border-b-blue-400 text-blue-400 font-bold rounded-none rounded-t-lg border-b-2 bg-blue-50" : ""}`}
								key={data.id}
							>
								<span>=</span>
								<div
									className='flex gap-5 items-center px-3 py-[0.4rem]'
									onClick={async () => {
										setCurretRasdel({ id: data.id, lessonId: data.lessonId, name: data.name });
										await fetchMaterials(data.id)
										await fetchTest(data.id);
									}}
								>
								<h1 className='font-medium'>{data.name}</h1>
							</div>
						</DropdownMenuItem>
						))}
						{course?.userId === user.id && 
							<Button variant="shadow2" className='w-full' onClick={() => {
								createLittleRasdel(lessonId as string);
								fetchRasdels();
							}}>
								Добавить раздел
							</Button>
						}
					</DropdownMenuContent>
				</DropdownMenu>
				<div className='w-7 h-[1px] bg-gray-300 mt-3' />
				<div className='w-11 bg-white rounded-lg flex flex-col items-center justify-center shadow-sm mt-3'>
					<div className={`text-3xl flex items-center justify-center p-[0.3rem] mt-[0.135rem] mb-[0.135rem] hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all cursor-pointer ${currRasdel?.id === domashniyaRabotaRasdel?.id ? "text-blue-500 bg-blue-100" : "text-gray-400"}`}
						onClick={async() => {
							if (domashniyaRabotaRasdel) {
								setCurretRasdel({ id: domashniyaRabotaRasdel.id, lessonId: domashniyaRabotaRasdel.lessonId, name: domashniyaRabotaRasdel.name });
								await fetchMaterials(domashniyaRabotaRasdel.id)
								await fetchTest(domashniyaRabotaRasdel.id);
							}else{
								try{
									setLoading(true)
									await createHomeWorkRasdel(lessonId as string)
									await fetchRasdels()
								}catch(e){
									console.log(e)
								}
								await fetchRasdels()
								const homeWork = rasdels?.find(data => data.name === "Домашняя работа")
								if(homeWork){
									setCurretRasdel({ id: homeWork.id, lessonId: homeWork.lessonId, name: homeWork.name });
									await fetchMaterials(homeWork.id)
									await fetchTest(homeWork.id);
									setLoading(false)
								}
							}
						}}
					>
						{domashniyaRabotaRasdel ? 
						
						<FaHome className='text-blue-400'/> 
						
						: 

						<FaHome className='text-gray-400'/> 
						
						}
					</div>
					<div className='w-7 h-[1px] bg-gray-300' />
					<div className='text-2xl flex items-center justify-center p-2 m-[0.1rem] mt-[0.135rem] mb-[0.135rem] text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all cursor-pointer'>
						<FaBook />
					</div>
				</div>
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
												<IoClose className='text-2xl'/>
											</Button>
										<Button type="submit" className='p-2 text-green-400 bg-green-200 hover:bg-green-400 hover:text-green-700' variant={'shadow2'}>
											<IoCheckmark className='text-2xl' />
										</Button>
									</form>
								</Form>
							</div>
							:
							currRasdel?.name === "Домашняя работа" ? 
							<h1 className='text-gray-500 font-bold text-2xl flex gap-3 items-center'>
								<span className=''>{currRasdel?.name}</span>
							</h1>
							: 
							<h1 className='text-gray-500 font-bold text-2xl flex gap-3 items-center'>
								<span className=''>{currRasdel?.name}</span>
								{course?.userId === user.id && 
									<div
										className='w-8 h-8 bg-gray-200 text-gray-400 rounded-sm flex items-center justify-center transition-all hover:bg-gray-300 hover:text-gray-600 hover:shadow-lg text-lg cursor-pointer'
										onClick={() => {
											setSettingOn(true)
										}}
									>
										<IoPencil />
									</div>
								}
								{course?.userId === user.id &&
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
								}
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
							<div key={test.id} className='border border-gray-100 mt-5 flex flex-col justify-between rounded-xl p-3 pt-5 min-w-[330px] max-w-[660px] shadow-lg'>
							{test.questionType === "AUDIOCHOOSE" &&
							<div>
								<h1 className='text-lg font-semibold text-gray-600'>{test.audioHeader ? test.audioHeader : "Введите название"}</h1>
								<audio src={test.question} controls className='w-[80%] h-9 my-3'></audio>
							</div> 
							}
							{test.questionType === "RECORD_AUDIO" &&
							<div className='relative'>
								<h1 className='text-lg font-semibold text-gray-600'>{test.audioHeader ? test.audioHeader : "Введите название"}</h1>
								<audio src={test.question} controls className='w-[80%] h-9 my-3'></audio>
								{user.id === course?.userId && 
									<UpdateAudioModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
								}
							</div> 
							}
							{test.questionType === "CONNECT_LETTERS" &&
								<h1 className='text-lg font-semibold text-gray-600'>Составьте слово из букв</h1> 
							}
							{	test.questionType === "ONLY_TEXT"&& 
								<div className='relative'>
								<div className='absolute right-0 top-8'>
										{user.id === course?.userId && 
											<UpdateBigTextModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
							</div>
							<div
								dangerouslySetInnerHTML={test.question ? { __html: test.question } : undefined}
								className="prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0
								prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"
							>
							</div>
						</div>
						} 
						{test.questionType === "MULTIPLE_CHOICE" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "FILL_IN_THE_BLANK" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "CONNECT_LETTERS" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "ORDERING" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "TRUE_OR_FALSE" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "PDF" && 
							<div className='flex flex-col relative min-w-[360px]'>
								{user.id === course?.userId && 
									<UpdatePdfModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
								}
								<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
								<a className='w-full h-[4rem] mt-4 bg-red-50 border border-gray-300 rounded-lg flex items-center leading-5 hover:bg-gray-100 text-red-300 hover:text-red-400 transition-all' href={test.audioHeader ? test.audioHeader : ""}>
									<div className='h-full text-5xl flex items-center p-2'>
										<FaFilePdf />
									</div>
									<span className='w-full h-full font-semibold items-center py-5 text-gray-400'>
										Нажмите, чтобы скачать файл
									</span>
								</a>
							</div>
						}
						{test.questionType === "CONNECT_VATIANTS" && 
							<div className='flex w-full justify-between relative'>
								<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
								<UpdateConnectModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
							</div>
						}
						{test.questionType === "TEXT_PO_PORYADKY" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "BIG_TEXT_OR_STATIYA" && 
							<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
						}
						{test.questionType === "FILL_WORDS_IN_THE_BLANK_DROPDOWN" && 
							<div key={index} className='flex relative top-0'>
								<UpdateDropDown test={test} updateVisov={() => updateVisov()} />
								<div className='flex flex-col gap-3'>
									<h1 className='text-xl font-semibold text-gray-600'>{test.audioHeader}</h1>
									<h3 className='mr-10'>{renderFilledText(test.question, test.answers, test.id, index)}</h3>
								</div>
							</div>
						}
						{test.questionType === "WRITING_TASK" && 
							<div>
								<div
								dangerouslySetInnerHTML={test.question ? { __html: test.question } : undefined}
								className='pr-[3rem] pb-3 prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0
								prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"'
								>
								</div>
							</div>
						}				
						{test.questionType === "VIDEO" && 
						<div>
							<div className='w-full flex items-center justify-between relative pb-5'>
								<h1 className='text-lg font-semibold text-gray-500'>{test.audioHeader}</h1>
								<UpdateVideo  test={test} updateVisov={() => updateVisov()}/>
							</div>
							<video src={test.question} controls></video>
						</div>
						}		
							{test.questionType === "MULTIPLE_CHOICE" && (
									<ul className='py-3 text-gray-500 font-semibold relative w-full'>
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
										{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
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
											{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
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
										{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
									</ul>
							)}
							{test.questionType === "RECORD_AUDIO" && (
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
										{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
									</ul>
							)}
							{test.questionType === "CONNECT_VATIANTS" && 
							<>
								<div className='flex min-w-[500px] justify-between pt-3'>
								{/* Контейнер с ответами */}
								<div className='flex flex-col gap-1 text-base font-semibold text-gray-600 w-[20%]'>
									{test.answers.map((data) => (
										<div key={data.id} className='px-3 py-1 border border-gray-200 rounded-lg'>
											{data.text}
										</div>
									))}
								</div>

								{/* Разделитель (если нужен) */}
								<div className='bg-gray-300 w-px mx-2'></div>

								{/* Контейнер с вариантами */}
									<div className='flex flex-col gap-1 text-xs font-medium text-gray-500 w-[80%]'>
										{test.options.map((data) => (
											<div key={data.id} className='px-3 py-1 border border-gray-200 rounded-lg'>
												{data.text}
											</div>
										))}
									</div>
								</div>
								</>
							}
							{test.questionType === "CONNECT_LETTERS" && (
									<ul className='py-3 text-gray-500 font-semibold relative flex gap-1 items-center w-full flex-col'>
										<span className='text-base font-semibold text-gray-400'>Загаданное слово: {test.question}</span>
										<div className='flex gap-1'>
											{shuffleArray(test.question.split("")).map((letter:any, id:any) => (
													<div key={id} className='h-8 w-8 bg-green-200 flex justify-center items-center border-2 border-green-400 text-green-500 font-semibold rounded-lg'>
															{letter.toLowerCase()}
													</div>
											))}
											{user.id === course?.userId && 
												<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
											}
										</div>
									</ul>
							)}
							{test.questionType === "BIG_TEXT_OR_STATIYA" && (
								<ul className='relative'>
									<div className='py-3 text-gray-500 font-semibold relative flex gap-1 items-center w-full flex-col'>
										<Textarea className='w-fill min-h-20'/>
									</div>
										{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
								</ul>
							)}
							{test.questionType === "WRITING_TASK" && (
								<div className='relative'>
										{user.id === course?.userId && 
											<UpdateWritingTasqModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
										<ul>
											{test.textBlocks.map((data) => (
												<>
												<li 
												className='py-2 border-t prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0
								prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"' 
												key={data.id}
												dangerouslySetInnerHTML={data.text ? { __html: data.text} : undefined}
												>
												</li></>
											))}
										</ul>
								</div>
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
										{user.id === course?.userId && 
											<UpdateTestModal test={test} updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}/>
										}
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
						{user.id === course?.userId && <>{testOrMaterials === "test" ? <CreateTestModal currRasdelId={currRasdel ? currRasdel.id : ""} visov={updateVisov} lessonId={currRasdel ? currRasdel?.lessonId : ""}/> : ''}</>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page;