"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import UpdateConnectModal from "../../../../../components/modal/connectModal/updateConnectModal"

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

const ConnectVariants: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
  return (
    <div>
    	<div className='flex w-full justify-between relative'>
				<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
				<UpdateConnectModal test={test} updateVisov={() => updateVisov()}/>
			</div>
      <>
				<div className='flex min-w-[600px] justify-between pt-3'>
					{/* Контейнер с ответами */}
						<div className='flex flex-col gap-1 text-xs font-medium text-gray-500 w-[50%]'>
							{test.answers.map((data) => (
								<div key={data.id} className='px-3 py-1 border border-gray-200 rounded-lg'>
									{data.text}
								</div>
							))}
						</div>

						{/* Разделитель (если нужен) */}
						<div className='bg-gray-300 w-px mx-2'></div>

						{/* Контейнер с вариантами */}
						<div className='flex flex-col gap-1 text-xs font-medium text-gray-500 w-[50%]'>
						{test.options.map((data) => (
							<div key={data.id} className='px-3 py-1 border border-gray-200 rounded-lg'>
								{data.text}
									</div>
								))}
							</div>
						</div>
					</>
    </div>
  )
}

export default ConnectVariants;