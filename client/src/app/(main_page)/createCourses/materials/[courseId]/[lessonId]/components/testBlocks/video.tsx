"use client"

import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateWritingTasqModal from "@/app/(main_page)/createCourses/components/modal/testCreateModal/updateWritingTasqModal";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import UpdateVideo from "@/app/(main_page)/createCourses/components/modal/videoTest/updateVideo";
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

const Video: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  return (
    <div>
			<div className='w-full flex items-center justify-between relative pb-5'>
				<h1 className='font-semibold text-lg text-[#60439a]'>{test.audioHeader}</h1>
				<UpdateVideo test={test} updateVisov={() => updateVisov()}/>
			</div>
			<video src={test.question} controls></video>
		</div>
  )
}

export default Video;
