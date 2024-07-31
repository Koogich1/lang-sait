"use client";

import { Option, QuestionType } from "@prisma/client";
import { useState } from "react";

type Answer = {
  id: string;
  testId: string;
  text: string;
  order: number | null;
}

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
};

const ChooseBlock = ({ test }: { test: Test }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<{ [key: string]: string | null }>({});

  const handleCheckboxChange = (testId: string, optionId: string) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [testId]: prev[testId] === optionId ? null : optionId,
    }));
  };

  return (
    <ul className='py-3 text-gray-500 font-semibold'>
      {test.options.map((option) => (
        <li key={option.id} className='flex gap-3 h-9 border-t items-center border-gray-100 rounded-lg'>
          <input
            className='w-5 h-5 rounded-xl cursor-pointer transition-all'
            type="checkbox"
            checked={selectedAnswer[test.id] === option.id}
            onChange={() => handleCheckboxChange(test.id, option.id)}
          />
          -
          <div className={`flex w-full justify-between`}>
            <h1>{option.text}</h1>
            <h1 className={` ${option.isCorrect ? "bg-green-200 border-green-300 border-2 rounded-xl px-3 text-green-500 font-semibold text-sm" : "bg-red-200 border-red-300 border-2 rounded-xl px-3 text-red-500 font-semibold text-sm"}`}>
              {option.isCorrect ? "верный" : "неверный"}
            </h1>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ChooseBlock;
