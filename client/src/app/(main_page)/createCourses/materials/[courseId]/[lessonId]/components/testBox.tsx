"use client"

import { Answer, CorrectAnswer, courseData, Option, QuestionType, TextBlock, User } from '@prisma/client'
import React, { useCallback, useState } from 'react'
import AudioChoose from './testBlocks/audioChoose';
import RecordAudio from './testBlocks/recordAudio';
import fetchTestFromDb from '@/app/(main_page)/createCourses/components/actions/fetchTestFromDb';
import WordsToLearn from './testBlocks/words_to_learn';
import OnlyText from './testBlocks/onlyText';
import MultibleChoose from './testBlocks/multibleChoose';
import FillInTheBlank from './testBlocks/fillInTheBlank';
import ConnectLetters from './testBlocks/connectLetters';
import Ordering from './testBlocks/ordering';
import TrueOrFalse from './testBlocks/true_or_false';
import PDF from './testBlocks/pdf';
import ConnectVariants from './testBlocks/connectVariants';
import ConnectPhotoVariants from './testBlocks/connectPhotoVariants';
import TextPoPOryadky from './testBlocks/textPoPoriyadky';
import BigTextOrStatiya from './testBlocks/bigTextOrStatiya';
import { Switch } from '@/components/ui/switch';
import FillWordsInTheBlankDropDown from './testBlocks/fillWordsInTheBlankDropDown';
import PechatWordsInTheBlankDropDown from './testBlocks/pechatWordsInTheBlankDorpDown';
import FillWordsInTheBlankTextMenu from './testBlocks/FillWordsInTheBlankTextMenu';
import WritingTask from './testBlocks/writingTask';
import Video from './testBlocks/video';

type CurrRasdel = {
	id: string; lessonId: string; name: string 
}

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

type Props = {
	tests: Test[] | null,
	user: User,
	course: courseData | null,
	lessonId: string,
	rasdelId: string,
	isSwithOn: boolean,
	setSwith: any,
	fetchTest: () => void
}

const TestBox = ({tests, user, course, lessonId, rasdelId, isSwithOn, setSwith, fetchTest} : Props) => {
	return (
		<div className='grid md:grid-cols-2 xl:grid-cols-3 w-full justify-between'>
						{tests?.map((test, index) => (
							<div key={test.id} className='border mt-5 relative flex flex-col justify-between rounded-xl p-3 pt-5 min-w-[330px] max-w-[700px] shadow-lg border-purple-50'>
								<div className='absolute top-0 left-0 m-[0.125rem] text-xs px-1 rounded-sm bg-blue-300 text-blue-500'>{index + 1}</div>
							{test.questionType === "AUDIOCHOOSE" && (
								<AudioChoose
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							)}
							{test.questionType === "RECORD_AUDIO" &&
								<RecordAudio
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "WORDS_TO_LEARN" &&
								<WordsToLearn
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "ONLY_TEXT"&& 
								<OnlyText
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							} 
							{test.questionType === "MULTIPLE_CHOICE" && 
								<MultibleChoose 
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "FILL_IN_THE_BLANK" && 
								<FillInTheBlank
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "CONNECT_LETTERS" && 
								<ConnectLetters
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "ORDERING" && 
								<Ordering
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "TRUE_OR_FALSE" && 
								<TrueOrFalse
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "PDF" && 
								<PDF
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "CONNECT_VATIANTS" && 
								<ConnectVariants
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "CONNECT_PHOTO_VARIANTS" && 
								<ConnectPhotoVariants
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "TEXT_PO_PORYADKY" && 
								<TextPoPOryadky
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "BIG_TEXT_OR_STATIYA" && 
								<BigTextOrStatiya
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "FILL_WORDS_IN_THE_BLANK_DROPDOWN" && 
								<div className='relative'>
									<div className='absolute left-[-100px] top-[-21px] h-20 w-20 bg-gray-100 shadow-lg rounded-lg border-gray-300 border-[2px] p-2 flex flex-col items-center justify-center'>
										<h1 className='text-center text-gray-500 text-xs font-semibold pb-2'>Сменить тип</h1>
										<Switch
											checked={isSwithOn}
											onClick={() => setSwith((prev: any) => !prev)}
										/>
									</div>
									{isSwithOn ?
									
									<FillWordsInTheBlankDropDown
										test={test} 
										userId={user.id} 
										courseUserId={course?.userId ? course?.userId : ""}
										updateVisov={() => fetchTest()} 
									/> 
									: 
									<PechatWordsInTheBlankDropDown
										test={test} 
										userId={user.id} 
										courseUserId={course?.userId ? course?.userId : ""}
										updateVisov={() => fetchTest()} 
									/>}
									
								</div>
							}

							{test.questionType === "FILL_WORDS_IN_THE_TEXT_MENU" && 
								<FillWordsInTheBlankTextMenu
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}
							{test.questionType === "WRITING_TASK" && (
								<WritingTask
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							)}		
							{test.questionType === "VIDEO" && 
								<Video
									test={test} 
									userId={user.id} 
									courseUserId={course?.userId ? course?.userId : ""}
									updateVisov={() => fetchTest()} 
								/>
							}		
						</div>
					))}
		</div>
	)
}

export default TestBox