"use client"

import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import UpdateConnectModal from "../../../../../components/modal/connectModal/updateConnectModal"
import { FaArrowRight } from "react-icons/fa6";

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

const WordsToLearn: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
	
  return (
    <div>
    	<div className='flex w-full justify-between relative'>
				<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
				<UpdateConnectModal test={test} updateVisov={() => updateVisov()}/>
			</div>
      <>
				<div className='flex min-w-[400px] justify-between pt-6 items-center gap-5'>
					{/* Контейнер с ответами */}
						<div className='flex flex-col gap-1 text-xs font-medium text-green-500 w-[50%]'>
							{test.answers.map((data) => (
								<div key={data.id} className='px-3 py-1 border border-green-300 bg-green-100 rounded-lg'>
									{data.text}
								</div>
							))}
						</div>
						<div className="flex flex-col gap-3 font-medium text-green-500">
							{test.answers.map((data) => (
								<FaArrowRight className="text-blue-400"/>
							))}
						</div>
						{/* Контейнер с вариантами */}
						<div className='flex flex-col gap-1 text-xs font-medium text-blue-500 w-[50%]'>
						{test.options.map((data) => (
							<div key={data.id} className='px-3 py-1 border border-blue-300 bg-blue-100 rounded-lg'>
								{data.text}
									</div>
								))}
							</div>
						</div>
					</>
    </div>
  )
}

export default WordsToLearn;