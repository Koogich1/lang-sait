"use client"

import UpdateFillWordsMultibleText from "@/app/(main_page)/createCourses/components/modal/UpdateTest/updateFillWordsMultibleTest";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";

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
  correctAnswers?: CorrectAnswer[];
};

interface AudioChooseProps {
  test: Test;
  userId: string;
  courseUserId: string | null;
  updateVisov: () => void;
}

const FillWordsInTheBlankTextMenu: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
    const parts = test.question.split(/(\[\])/g);
    
    const groupOptionsByOrder = () => {
        const groupedOptions: { [key: number]: Option[] } = {};
        test.options.forEach(option => {
            if (!option.order) {
                return;
            }
            const order = option.order;
            if (!groupedOptions[order]) {
                groupedOptions[order] = [];
            }
            groupedOptions[order].push(option);
        });
        return groupedOptions;
    };

    const groupedOptions = groupOptionsByOrder();
    let currentOrder = 1;

    const data = parts.map((part, idx) => {
        if (part === '[]') {
            const optionsForThisBlank = groupedOptions[currentOrder] || []; 
            currentOrder++;
            return (
                <DropdownMenu key={idx}>
                    <DropdownMenuTrigger asChild>
                        <button className="px-2 py-1 border-2 border-blue-400 bg-blue-100 font-semibold text-blue-500 rounded-lg hover:bg-blue-200 transition-all">
                            Выберите...
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white flex gap-2">
                        {optionsForThisBlank.map((option) => (
                            <DropdownMenuItem key={option.id} className={`px-2 py-1 font-semibold border-2 ${option.isCorrect ? "border-green-400 hover:text-green-500 hover:bg-green-200 bg-green-100": "border-red-400 hover:text-red-500 hover:bg-red-200 bg-red-100"}`}>
                                {option.text}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        } else {
            return (
                <span className='font-medium text-gray-500 text-base leading-10' key={idx}>
                    {part}
                </span>
            );
        }
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold text-[#6647a4]">{test.audioHeader}</h1>
                <UpdateFillWordsMultibleText test={test} updateVisov={() => updateVisov()} />
            </div>
            <div className="mt-3">{data}</div>
        </div>
    );
};

export default FillWordsInTheBlankTextMenu;
