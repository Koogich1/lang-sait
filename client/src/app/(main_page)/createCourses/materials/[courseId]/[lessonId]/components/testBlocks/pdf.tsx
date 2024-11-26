"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import OrderBlock from "../OrderBlock";
import UpdatePdfModal from "@/app/(main_page)/createCourses/components/modal/pdf/updatePdfModal";
import { FaFilePdf } from "react-icons/fa6";

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

const PDF: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {

  return (
    <div className='flex flex-col relative min-w-[360px]'>
			{userId === courseUserId && 
				<UpdatePdfModal test={test} updateVisov={() => updateVisov()}/>
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
  )
}

export default PDF;
