"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { LittleRasdel, QuestionType, Option, Answer, Materials, courseData, User, TextBlock, CorrectAnswer } from "@prisma/client"
import fetchTestFromDb from '../../../components/actions/fetchTestFromDb'
import { IoClose, IoMenuOutline } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import { FaBook, FaPen } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import getLittleRasdels from '../../../components/actions/getLittleRasdels'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import createLittleRasdel from '../../../components/actions/createLittleRasdel'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input';

import { IoCheckmark } from "react-icons/io5";
import updateLittleRasdelName from '../../../components/actions/updateLittleRasdelName'
import CreateTestModal from '../../../components/modal/createTestModal'
import DeleteRasdelModal from '../../../components/modal/deleteRasdelModal'
import MaterialBox from './components/materialBox'
import getMaterailFromDb from '../../../components/actions/materials/getMaterailFromDb'
import getCourseById from '../../../components/actions/getCourseById'
import { currentUser } from '@/lib/auth'
import { FaHome } from 'react-icons/fa'
import createHomeWorkRasdel from '../../../components/actions/homework/createHomeWorkRasdel'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { ClipLoader } from 'react-spinners'
import BackButton from '../../../components/backButton'
import AudioChoose from './components/testBlocks/audioChoose'
import RecordAudio from './components/testBlocks/recordAudio'
import OnlyText from './components/testBlocks/onlyText'
import MultibleChoose from './components/testBlocks/multibleChoose'
import FillInTheBlank from './components/testBlocks/fillInTheBlank'
import ConnectLetters from './components/testBlocks/connectLetters'
import Ordering from './components/testBlocks/ordering'
import TrueOrFalse from './components/testBlocks/true_or_false'
import PDF from './components/testBlocks/pdf'
import ConnectVariants from './components/testBlocks/connectVariants'
import TextPoPOryadky from './components/testBlocks/textPoPoriyadky'
import BigTextOrStatiya from './components/testBlocks/bigTextOrStatiya'
import FillWordsInTheBlankDropDown from './components/testBlocks/fillWordsInTheBlankDropDown'
import WritingTask from './components/testBlocks/writingTask'
import Video from './components/testBlocks/video'
import FillWordsInTheBlankTextMenu from './components/testBlocks/FillWordsInTheBlankTextMenu'
import WordsToLearn from './components/testBlocks/words_to_learn'
import { Switch } from '@/components/ui/switch'
import PechatWordsInTheBlankDropDown from './components/testBlocks/pechatWordsInTheBlankDorpDown'
import ConnectPhotoVariants from './components/testBlocks/connectPhotoVariants'

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
	const [testOrMaterials, setTextOrMaterials] = useState("test")
	const [materials, setMaterials] = useState<Materials[]>([]);
	const [course, setCourse]= useState<courseData | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(false);
	const [isSwitchOn, setIsSwitchOn] = useState(true);

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
		setLoading(true)
		if (currRasdel) {
			form.setValue("username", currRasdel.name);
		} else if (rasdels && rasdels.length > 0) {  // Если currRasdel не установлен
			setCurretRasdel(rasdels[0]); // Установить первый раздел
			fetchTest(rasdels[0].id); // Получить тесты для первого раздела
		}
		setLoading(false)
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

	if(!user){
		return
	}

	const domashniyaRabotaRasdel = rasdels?.find(data => data.name === "Домашняя работа");

	return (
		<div className='flex gap-3 mt-5'>
			<div className='flex flex-col items-center'>
				<div className='lg:hidden'>
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
									className={`flex gap-3 p-0 pl-2 w-full relative hover:bg-gray-200 border-b border-gray-100 justify-start text-gray-400 hover:text-gray-500 ${currRasdel?.id === data.id ? "border-b-blue-400 text-blue-400 font-bold rounded-none rounded-t-lg border-b-2 bg-blue-50" : ""}`}
									key={data.id}
								>
									<span className='pl-2'>=</span>
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
				</div>
				<div className='hidden lg:block w-[180px] p-2 bg-white rounded-lg shadow-md'>
						<div className='pb-3'>
							{rasdels && rasdels.map((data) => (
									data.name === "Домашняя работа" ? "" : 
									<div
										className={`flex gap-3 items-center cursor-pointer rounded-md p-0 w-full border border-gray-100 relative hover:bg-gray-200 justify-start ${currRasdel?.id === data.id ? "border-b-blue-400 text-blue-400 font-bold border-b-2 bg-blue-50" : " text-gray-400 hover:text-gray-500"}`}
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
								</div>
							))}
						</div>
						{course?.userId === user.id && 
							<Button variant="shadow2" className='w-full' onClick={() => {
								createLittleRasdel(lessonId as string);
								fetchRasdels();
							}}>
								Добавить раздел
							</Button>
						}
				</div>
				<div className='w-7 lg:w-full h-[1px] bg-gray-300 mt-3' />
				<div className='w-11 lg:w-full bg-white rounded-lg flex flex-col lg:flex-row items-center justify-center shadow-sm mt-3'>
					<div className={`text-3xl lg:w-[97%] flex items-center justify-center p-[0.3rem] mt-[0.135rem] mb-[0.135rem] hover:bg-gray-100 hover:text-gray-600 rounded-lg transition-all cursor-pointer ${currRasdel?.id === domashniyaRabotaRasdel?.id ? "text-blue-500 bg-blue-100" : "text-gray-400"}`}
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
									const data = rasdels?.find(data => data.name === "Домашняя работа");
									if(data){
										setCurretRasdel({ id: data.id, lessonId: data.lessonId, name: data.name });
										await fetchMaterials(data.id)
										await fetchTest(data.id);
									}
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
										<FaPen />
									</div>
								}
								<div className='absolute right-0 mr-10'>
									<BackButton />
								</div>
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
							<div key={test.id} className='border mt-5 flex flex-col justify-between rounded-xl p-3 pt-5 min-w-[330px] max-w-[700px] shadow-lg border-purple-50'>
							{test.questionType === "AUDIOCHOOSE" && (
								<AudioChoose
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							)}
							{test.questionType === "RECORD_AUDIO" &&
								<RecordAudio 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							}
							{test.questionType === "WORDS_TO_LEARN" &&
								<WordsToLearn 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							}
							{test.questionType === "ONLY_TEXT"&& 
								<OnlyText 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							} 
							{test.questionType === "MULTIPLE_CHOICE" && 
								<MultibleChoose 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							}
							{test.questionType === "FILL_IN_THE_BLANK" && 
								<FillInTheBlank
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")} 
								/>
							}
							{test.questionType === "CONNECT_LETTERS" && 
								<ConnectLetters
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "ORDERING" && 
								<Ordering
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "TRUE_OR_FALSE" && 
								<TrueOrFalse 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "PDF" && 
								<PDF 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "CONNECT_VATIANTS" && 
								<ConnectVariants 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "CONNECT_PHOTO_VARIANTS" && 
								<ConnectPhotoVariants 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "TEXT_PO_PORYADKY" && 
								<TextPoPOryadky
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "BIG_TEXT_OR_STATIYA" && 
								<BigTextOrStatiya 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "FILL_WORDS_IN_THE_BLANK_DROPDOWN" && 
								<div className='relative'>
									<div className='absolute left-[-100px] top-[-21px] h-20 w-20 bg-gray-100 shadow-lg rounded-lg border-gray-300 border-[2px] p-2 flex flex-col items-center justify-center'>
										<h1 className='text-center text-gray-500 text-xs font-semibold pb-2'>Сменить тип</h1>
										<Switch
											checked={isSwitchOn}
											onClick={() => setIsSwitchOn(prev => !prev)}
										/>
									</div>
									{isSwitchOn ?
									
									<FillWordsInTheBlankDropDown
										test={test} 
										userId={user.id} 
										courseUserId={course?.userId ? course?.userId : ""}
										updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
									/> 
									: 
									<PechatWordsInTheBlankDropDown
										test={test} 
										userId={user.id} 
										courseUserId={course?.userId ? course?.userId : ""}
										updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
									/>}
									
								</div>
							}

							{test.questionType === "FILL_WORDS_IN_THE_TEXT_MENU" && 
								<FillWordsInTheBlankTextMenu
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}
							{test.questionType === "WRITING_TASK" && (
								<WritingTask 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							)}		
							{test.questionType === "VIDEO" && 
								<Video 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest(currRasdel?.id ? currRasdel?.id : "")}
								/>
							}		
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