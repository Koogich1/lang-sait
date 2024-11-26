"use client"

import UpdateAudioModal from "@/app/(main_page)/createCourses/components/modal/audio_record/audioRecord";
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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

const RecordAudio: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  return (
    <div>
    	<div className='relative'>
				<h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>{test.audioHeader ? test.audioHeader : "Введите название"}</h3>
				<AudioPlayer src={test.question} className='w-full my-3'></AudioPlayer>
				{userId === courseUserId && 
          <UpdateAudioModal test={test} updateVisov={() => updateVisov()} />
        }
			</div> 
      <ul className='py-3 text-gray-500 font-semibold relative'>
        {test.options.map((option) => (
          <li key={option.id} className='flex gap-3 h-9 border-t items-center border-gray-100 rounded-lg '>
            <input
              className='w-5 h-5 rounded-xl cursor-pointer transition-all'
              type="checkbox"
              onChange={() => {}}
            />
            <div className={`flex w-full justify-between`}>
              <h1 className='text-gray-400'>{option.text}</h1>
              <h1 className={` ${option.isCorrect ? "bg-green-200 border-green-300 border-2 rounded-xl px-3 text-green-500 font-semibold text-sm" : "bg-red-200 border-red-300 border-2 rounded-xl px-3 text-red-500 font-semibold text-sm"}`}>{option.isCorrect ? "верный" : "неверный"}</h1>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default RecordAudio;
