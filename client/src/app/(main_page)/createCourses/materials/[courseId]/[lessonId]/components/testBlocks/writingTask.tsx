"use client"

import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateWritingTasqModal from "@/app/(main_page)/createCourses/components/modal/testCreateModal/updateWritingTasqModal";
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

const WritingTask: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  return (
    <div className="relative">
			{userId === courseUserId && 
					<UpdateWritingTasqModal test={test} updateVisov={() => updateVisov()}/>
			}
    	<div>
				<div
					dangerouslySetInnerHTML={test.question ? { __html: test.question } : undefined}
					className='px-[3rem] pb-3 prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0 prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"'
				/>
			</div>
      <div className='relative'>
				<ul>
					{test.textBlocks.map((data) => (
						<>
							<li 
								className='py-2 border-t prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0 prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"' 
								key={data.id}
								dangerouslySetInnerHTML={data.text ? { __html: data.text} : undefined}
							/>
						</>
					))}
				</ul>
			</div>
    </div>
  )
}

export default WritingTask;
