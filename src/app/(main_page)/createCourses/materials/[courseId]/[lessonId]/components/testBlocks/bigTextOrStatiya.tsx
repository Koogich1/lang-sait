"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTextOrStatiya from "@/app/(main_page)/createCourses/components/modal/UpdateTest/updateTextOrStatyia";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Textarea } from "@/components/ui/textarea";
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

const BigTextOrStatiya: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
  return (
    <div>
    	<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.question}</h3>
      <ul className='relative'>
				<div className='py-3 text-gray-500 font-semibold relative flex gap-1 items-center w-full flex-col'>
					<Textarea className='w-fill min-h-20'/>
				</div>
				{userId === courseUserId && 
					<UpdateTextOrStatiya test={test} updateVisov={() => updateVisov()}/>
				}
			</ul>
    </div>
  )
}

export default BigTextOrStatiya;
