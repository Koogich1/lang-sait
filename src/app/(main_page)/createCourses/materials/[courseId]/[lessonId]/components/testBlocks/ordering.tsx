"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import OrderBlock from "../OrderBlock";

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

const Ordering: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};
  return (
    <div>
    	<h3 className='font-semibold text-lg text-[#6d4caf] max-w-[80%]'>{test.question}</h3>
			<OrderBlock answers={test.answers} test={test} visov={() => updateVisov()} currRasdel={test.littleRasdelId ? test.littleRasdelId : ""}/>
    </div>
  )
}

export default Ordering;
