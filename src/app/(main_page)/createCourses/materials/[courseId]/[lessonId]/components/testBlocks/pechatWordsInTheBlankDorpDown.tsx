import UpdateDropDown from "@/app/(main_page)/createCourses/components/modal/Fill_Words_DropDown/updateDropDown";
import { useState } from "react";
import { Answer, Option, QuestionType, TextBlock } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";
import { Input } from "@/components/ui/input";

type Test = {
  id: string;
  lessonId: string;
  audioHeader: string | null;
  littleRasdelId: string;
  question: string;
  textBlocks: TextBlock[];
  answers: Answer[];
  options: Option[];
  questionType: QuestionType;
};

interface PechatWordsInTheBlankDropDownProps {
  test: Test;
  userId: string;
  courseUserId: string | null;
  updateVisov: () => void;
}

const PechatWordsInTheBlankDropDown: React.FC<PechatWordsInTheBlankDropDownProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const initialAnswers = test.answers;
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(test.question.split(/(\[\])/g).filter(part => part === '[]').length).fill(null));
  const [availableAnswers, setAvailableAnswers] = useState<Answer[]>(initialAnswers);

  const renderFilledText = (text: string) => {
    let colvo = 1;
    const parts = text.split(/(\[\])/g);
    return parts.map((part, idx) => {
      if (part === '[]') {
        return (
          <div key={idx} className='inline-block mr-2'>
            <input
							className="w-[120px] h-8 text-gray-500 font-semibold p-2 border rounded-lg"
							placeholder="Напишите..."
						>
						</input>
          </div>
        );
      } else {
        return (
          <span className='font-medium text-gray-500 text-base leading-9' key={idx}>
            {part}
          </span>
        );
      }
    });
  };

  const resetAnswers = () => {
    setSelectedAnswers(Array(test.question.split(/(\[\])/g).filter(part => part === '[]').length).fill(null));
    setAvailableAnswers(initialAnswers);
  };

  return (
    <div className='flex flex-col'>
      <UpdateDropDown test={test} updateVisov={() => updateVisov()} />
      <div className='flex flex-col gap-3'>
        <h1 className='text-xl font-semibold text-gray-600'>{test.audioHeader}</h1>
        <div className="w-full h-[1px] bg-gray-100 my-1" />
        <h3 className='mr-10'>{renderFilledText(test.question)}</h3>
      </div>
      <div className="w-full h-[1px] bg-gray-100 my-3" />
      <div className="font-semibold text-gray-500 pb-1">Порядок правильных ответов:</div>
      <div className="grid grid-cols-3 gap-1 text-center sm:grid-cols-5 md:grid-cols-5 ">
          {availableAnswers.map((answer) => (
            <div key={answer.id} className="py-1 rounded-lg bg-blue-100 border-blue-400 font-semibold text-blue-500 text-center">
              {answer.order}) {answer.text}
            </div>
          )) }
      </div>
    </div>
  );
};

export default PechatWordsInTheBlankDropDown;