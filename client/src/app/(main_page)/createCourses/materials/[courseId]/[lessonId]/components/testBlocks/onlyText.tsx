"use client"

import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateBigTextModal from "@/app/(main_page)/createCourses/components/modal/testCreateModal/UpdateBigTextModal";
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

const OnlyText: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  return (
    <div className='relative'>
			<div className='absolute right-0 top-8'>
				{userId === courseUserId && 
					<UpdateBigTextModal test={test} updateVisov={() => updateVisov()}/>
				}
			</div>
			<div
				dangerouslySetInnerHTML={test.question ? { __html: test.question } : undefined}
				className="prose prose-p:m-0 prose-h1:m-0 prose-h2:m-0 prose-h3:m-0 prose-h4:m-0 prose-h5:m-0 prose-h6:m-0 prose-span:m-0 prose-li:m-0 prose-ul:m-0	prose-p:w-full prose-h1:w-full prose-h2:w-full prose-h3:w-full prose-h4:w-full prose-h5:w-full prose-h6:w-full prose-span:m-0 prose-li:w-full prose-ul:w-full w-full max-w-none leading-5"
			/>
      <div>
        <div className="mt-3 w-full flex items-center justify-center">
                {test.audioHeader === "row" && 
									<div className="grid grid-cols-3 gap-5 justify-center">
										{test.options.map((data, index) => (
											<div key={index} className="">
												<img src={data.text} alt="" className="w-full h-full object-cover rounded-lg"/>
											</div>
										))}
									</div>
								}
								{test.audioHeader === "obichniy" && 
									<div className="grid grid-cols-1 gap-5 justify-center">
										{test.options.map((data, index) => (
											<div key={index} className="">
												<img src={data.text} alt="" className="w-1/3 object-cover rounded-lg"/>
											</div>
										))}
									</div>
								}
        </div>
      </div>
		</div>
  )
}

export default OnlyText;
