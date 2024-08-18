"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import OrderBlock from "../OrderBlock";
import UpdateTrueOrFalse from "@/app/(main_page)/createCourses/components/modal/UpdateTest/trueOrFalse";

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

const TrueOrFalse: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {

  return (
    <div>
    	<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
      <ul className='py-3 text-gray-500 font-semibold relative flex flex-col gap-1 items-center w-full'>
				{test.options.map((option) => (
				<div key={option.id} className='flex justify-between items-center w-full border border-gray-100 rounded-lg'>
					<h1 className="px-2 py-2 text-gray-400">{option.text}</h1>
					<h1 className={`px-2 py-2 ${option.isCorrect ? "bg-green-200 rounded-lg border-2 border-green-400 text-green-500" : "bg-red-200 rounded-lg border-2 border-red-400 text-red-500"}`}>{option.isCorrect ? "Истина": "Ложь"}</h1>
				</div>
				))}
				{userId === courseUserId && 
					<UpdateTrueOrFalse test={test} updateVisov={() => updateVisov()}/>
				}
			</ul>
		</div>
  )
}

export default TrueOrFalse;
