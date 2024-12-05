"use client"

import { Answer, CorrectAnswer, courseData, Option, QuestionType, TextBlock, User } from "@prisma/client"
import AudioChoose from "../[lessonId]/components/testBlocks/audioChoose"
import RecordAudio from "../[lessonId]/components/testBlocks/recordAudio"
import WordsToLearn from "../[lessonId]/components/testBlocks/words_to_learn";
import OnlyText from "../[lessonId]/components/testBlocks/onlyText";
import MultibleChoose from "../[lessonId]/components/testBlocks/multibleChoose";
import FillInTheBlank from "../[lessonId]/components/testBlocks/fillInTheBlank";
import ConnectLetters from "../[lessonId]/components/testBlocks/connectLetters";
import Ordering from "../[lessonId]/components/testBlocks/ordering";
import TrueOrFalse from "../[lessonId]/components/testBlocks/true_or_false";
import PDF from "../[lessonId]/components/testBlocks/pdf";
import ConnectVariants from "../[lessonId]/components/testBlocks/connectVariants";
import ConnectPhotoVariants from "../[lessonId]/components/testBlocks/connectPhotoVariants";
import TextPoPOryadky from "../[lessonId]/components/testBlocks/textPoPoriyadky";
import BigTextOrStatiya from "../[lessonId]/components/testBlocks/bigTextOrStatiya";
import FillWordsInTheBlankDropDown from "../[lessonId]/components/testBlocks/fillWordsInTheBlankDropDown";
import FillWordsInTheBlankTextMenu from "../[lessonId]/components/testBlocks/FillWordsInTheBlankTextMenu";
import WritingTask from "../[lessonId]/components/testBlocks/writingTask";
import Video from "../[lessonId]/components/testBlocks/video";

type Test = {
  id: string;
  lessonId: string;
  audioHeader: string | null;
  littleRasdelId: string;
  question: string;
  textBlocks: TextBlock[];
  questionType: QuestionType; // This can be an enum or a type defined in Prisma
  options: Option[]; // Use an array of Option
  answers: Answer[];  // Use an array of Answer
  correctAnswers?: CorrectAnswer[];
};

type Props = {
  testik: Test,
  user: User,
  course: courseData | null,
  lessonId: string,
  rasdelId: string,
  isSwithOn: boolean,
  setSwith: any,
  fetchTest: () => void
}

const TestVariants = ({ testik, user, course, fetchTest }: Props) => {
	return (
		<div className="relative">
      <div className="transition-all hover:bg-blue-400 opacity-70 w-[104.5%] h-full left-[-2.25%] absolute z-50 rounded-xl">
        
      </div>
			{testik.questionType === "AUDIOCHOOSE" && <AudioChoose test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
			{testik.questionType === "RECORD_AUDIO" && <RecordAudio test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "WORDS_TO_LEARN" && <WordsToLearn test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "ONLY_TEXT" && <OnlyText test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "MULTIPLE_CHOICE" && <MultibleChoose test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "FILL_IN_THE_BLANK" && <FillInTheBlank test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "CONNECT_LETTERS" && <ConnectLetters test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "ORDERING" && <Ordering test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "TRUE_OR_FALSE" && <TrueOrFalse test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "PDF" && <PDF test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "CONNECT_VATIANTS" && <ConnectVariants test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "CONNECT_PHOTO_VARIANTS" && <ConnectPhotoVariants test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "TEXT_PO_PORYADKY" && <TextPoPOryadky test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
			{testik.questionType === "BIG_TEXT_OR_STATIYA" && <BigTextOrStatiya test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "FILL_WORDS_IN_THE_BLANK_DROPDOWN" && (
        <div className='relative'>
          <FillWordsInTheBlankDropDown test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />
        </div>
      )}
      {testik.questionType === "FILL_WORDS_IN_THE_TEXT_MENU" && <FillWordsInTheBlankTextMenu test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "WRITING_TASK" && <WritingTask test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
      {testik.questionType === "VIDEO" && <Video test={ testik } userId={user.id} courseUserId={course?.userId ? course.userId : ""} updateVisov={fetchTest} />}
			</div>
	)
}

export default TestVariants