"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import UpdateConnectModal from "../../../../../components/modal/connectModal/updateConnectModal"
import UpdateConnectModalPhoto from "@/app/(main_page)/createCourses/components/modal/connectModal/updateConnectPhotoModal";
import Image from "next/image";

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

const ConnectPhotoVariants: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
	
  return (
    <div>
    	<div className='flex w-full justify-between relative'>
				<h3 className='font-semibold text-lg 0 max-w-[80%]'>{test.question}</h3>
				<UpdateConnectModalPhoto test={test} updateVisov={() => updateVisov()}/>
			</div>
      <>
				<div className='flex min-w-[600px] justify-between pt-3'>
					{/* Контейнер с ответами */}
						<div className='flex flex-col gap-1 text-xs font-medium text-blue-500 w-[70%]'>
							{test.options.map((data) => (
								<div key={data.id} className='px-3 py-1 border border-blue-300 bg-blue-100 rounded-lg'>
								{data.text}
									</div>
								))}
							</div>

						{/* Разделитель (если нужен) */}
						<div className='bg-gray-300 w-px mx-2'></div>

						{/* Контейнер с вариантами */}
							<div className='flex flex-col gap-1 text-xs items-center justify-center text-green-500 font-medium w-[30%]'>
							{test.answers.map((data) => (
								<Image width={1000} alt="text" height={1000} src={data.text} key={data.id} className="w-[6rem] h-[6rem] object-cover rounded-lg shadow-sm" />
							))}
						</div>
						</div>
					</>
    </div>
  )
}

export default ConnectPhotoVariants;