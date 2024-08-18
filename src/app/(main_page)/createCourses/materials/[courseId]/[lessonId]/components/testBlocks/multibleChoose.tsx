"use client"
import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import { useState, useEffect, useCallback } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import gsap from 'gsap';
import UpdateMultibleChoose from "@/app/(main_page)/createCourses/components/modal/UpdateTest/updateMultibleChoose";

type Test = {
  id: string;
  lessonId: string;
  audioHeader: string | null;
  littleRasdelId: string;
  question: string;
  textBlocks: TextBlock[];
  questionType: QuestionType; 
  options: Option[]; 
  answers: Answer[];
  correctAnswers?: CorrectAnswer[];
};

interface AudioChooseProps {
  test: Test;
  userId: string; 
  courseUserId: string | null; 
  updateVisov: () => void; 
}

const MultibleChoose: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});

  const handleCheckboxChange = (optionId: string, isCorrect: boolean) => {
    setSelectedOptions(prev => ({
      ...prev,
      [optionId]: !prev[optionId]
    }));

    // Select the element for animation
    const element = document.getElementById(`span-${optionId}`);
    if (element) {
      gsap.fromTo(
        element,
        { y: 0, rotation: 0 }, // Initial state
        {
          y: -10,               // Jump up
          rotation: 20,         // Rotate to the right
          duration: 0.1,
          scale: 1.8,
          ease: "power1.inOut",
          yoyo: true,           // Go back down
          repeat: 1,            // Repeat once
          onComplete: () => {
            gsap.to(element, { 
              scale: 1,
              y: 0,             // Reset position
              rotation: 0       // Reset rotation
            });
          }
        }
      );
    }
  };

  return (
    <div>
      <h3 className='font-semibold text-lg text-[#60439a] max-w-[80%]'>{test.question}</h3>
      <ul className='py-3 text-gray-500 font-semibold relative w-full'>
        {test.options.map((option) => (
          <li key={option.id} className='flex gap-2 h-9 border-b items-center border-[#e9dfff]'>
            <label htmlFor={`option-${option.id}`} className='flex items-center cursor-pointer'>
              <input
                id={`option-${option.id}`}
                type="checkbox"
                checked={selectedOptions[option.id] || false}
                onChange={() => handleCheckboxChange(option.id, option.isCorrect)}
                className={`w-[1.7rem] h-6 rounded-full cursor-pointer transition-all
                  ${selectedOptions[option.id] ? option.isCorrect ? 'bg-green-400 hover:border-green-600 hover:bg-green-500' : "bg-red-400 hover:bg-red-500 hover:border-red-600" : 'bg-white border-[1px] border-[#6848a6] hover:bg-purple-100'}`} 
                style={{ appearance: 'none', position: 'absolute', opacity: 0 }} // Hide the default checkbox
              />
              <span id={`span-${option.id}`} className={`flex items-center justify-center w-6 h-6 rounded-full border transition-all 
                ${selectedOptions[option.id] ? (option.isCorrect ? 'bg-green-400 border-green-500 hover:bg-green-600' : 'bg-red-400 border-red-500 hover:bg-red-600') : 'bg-white border-[#6848a6]'}`}>
                {selectedOptions[option.id] && <span className="text-white p-3 flex items-center justify-center">{option.isCorrect ? <FaCheck className="text-md" /> : <IoIosClose className="text-3xl"/>}</span>}
              </span>
              <h1 className='ml-2 text-[#6848a6] opacity-70 font-medium'>{option.text}</h1>
              <h1 className={`${option.isCorrect ? "bg-green-200 absolute right-0 border-green-300 border-2 rounded-xl px-1 text-green-500 font-semibold text-xs py-[3px]" : "bg-red-200 absolute right-0 border-red-300 border-2 rounded-xl px-1 text-red-500 font-semibold text-xs py-[3px]"}`}>
                {option.isCorrect ? "верный" : "неверный"}
              </h1>
            </label>
          </li>
        ))}
        {userId === courseUserId && 
          <UpdateMultibleChoose test={test} updateVisov={() => updateVisov()} />
        }
      </ul>
    </div>
  );
}

export default MultibleChoose;