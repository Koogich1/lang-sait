"use client"
import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestPoPoriyadky from "@/app/(main_page)/createCourses/components/modal/UpdateTest/updateTextPoPoryiadky";
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

const TextPoPOryadky: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
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
				{shuffleArray(test.answers.map((data, id) => (
					<div key={id}>
						<h1 className='text-base font-semibold text-gray-400'>Предложение: {data.order}</h1>
						<h1 className='w-full p-2 border border-gray-100 rounded-lg text-gray-400 font-medium text-sm'>{data.text}</h1>
					</div>
				)))}
				{/* Правильный текст */}
				<div className='mt-4 p-2 border border-blue-200 rounded-lg'>
					<h1 className='font-semibold text-gray-600'>Правильный порядок:</h1>
					<p className='text-gray-400 text-sm flex flex-col gap-3'>
					{test.answers
						.filter(data => data.order !== null) // Фильтрация, чтобы убрать null
						.sort((a, b) => (a.order || 0) - (b.order || 0)) // Сортируем с проверкой на null
						.map((data) => (<span key={data.id}>{data.text}</span>))
					}
				</p>
				</div>
				{userId === courseUserId && 
					<UpdateTestPoPoriyadky test={test} updateVisov={() => updateVisov()}/>
				}
			</ul>
    </div>
  )
}

export default TextPoPOryadky;