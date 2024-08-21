"use client"

import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateFillInTheBlank from "@/app/(main_page)/createCourses/components/modal/Fill_Words_DropDown/updateFillInTheBlank";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";

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

interface AudioChooseProps {
  test: Test;
  userId: string; // Pass user ID for permission checks
  courseUserId: string | null; // Pass the course user ID for permission checks
  updateVisov: () => void; // Function to update visibility
}

const FillInTheBlank: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  return (
    <div>
    	<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
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
					{userId === courseUserId && 
						<UpdateFillInTheBlank test={test} updateVisov={() => updateVisov()}/>
					}
					</div>
				))}
			</div>
		</div>
  )
}

export default FillInTheBlank;