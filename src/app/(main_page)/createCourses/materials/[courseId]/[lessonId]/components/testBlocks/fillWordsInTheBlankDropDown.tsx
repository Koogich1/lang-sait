import UpdateDropDown from "@/app/(main_page)/createCourses/components/modal/Fill_Words_DropDown/updateDropDown";
import { useState } from "react";
import { Answer, CorrectAnswer, Option, QuestionType, TextBlock } from "@prisma/client";
import { DndContext, useDraggable, useDroppable, DragOverlay } from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { IoReload } from "react-icons/io5";

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

const FillWordsInTheBlankDropDown: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const initialAnswers = test.answers;
  const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(test.question.split(/(\[\])/g).filter(part => part === '[]').length).fill(null));
  const [availableAnswers, setAvailableAnswers] = useState<Answer[]>(initialAnswers);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggingAnswer, setDraggingAnswer] = useState<Answer | null>(null);

  const renderFilledText = (text: string) => {
    const parts = text.split(/(\[\])/g);
    return parts.map((part, idx) => {
      if (part === '[]') {
        return <DroppableAnswer key={idx} index={idx} />;
      } else {
        return (
          <span className='font-medium text-gray-500 text-base leading-9' key={idx}>
            {part}
          </span>
        );
      }
    });
  };

  const DroppableAnswer: React.FC<{ index: number }> = ({ index }) => {
    const { setNodeRef } = useDroppable({ id: `droppable-${index}` });

    return (
      <div ref={setNodeRef} className='inline-block mr-2'>
        {selectedAnswers[index] ? (
          <span className='font-medium text-blue-500 py-1 px-4 border-2 border-blue-400 rounded-lg bg-blue-200'>
            {selectedAnswers[index]}
          </span>
        ) : (
          <span className='border-2 px-2 py-1 rounded-lg bg-blue-100 border-blue-400 font-semibold text-blue-500 cursor-pointer hover:bg-blue-200 transition-all'>
            Блок...
          </span>
        )}
      </div>
    );
  };

  const DraggableAnswer: React.FC<{ answer: Answer }> = ({ answer }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
      id: answer.id,
    });

    return (
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className={`border-2 px-3 py-1 rounded-lg ${activeId === answer.id ? 'hidden' : 'bg-blue-100'} border-blue-400 font-semibold text-blue-500 cursor-pointer hover:bg-blue-200 transition-all`}
        onMouseDown={() => {
          setActiveId(answer.id);
          setDraggingAnswer(answer);
        }}
        onMouseLeave={() => {
          setActiveId(null);
          setDraggingAnswer(null);
        }}
      >
        {answer.text}
      </div>
    );
  };

  const handleDrop = (event: any) => {
    if (event.over) {
      const droppedId = event.active.id;
      const index = event.over.id.split('-')[1];

      const droppedAnswer = availableAnswers.find(answer => answer.id === droppedId);
      if (!droppedAnswer) return;

      const droppedAnswerText = droppedAnswer.text;

      setSelectedAnswers(prev => {
        const updatedAnswers = [...prev];
        updatedAnswers[index] = droppedAnswerText || null;
        return updatedAnswers;
      });

      setAvailableAnswers(prev => prev.filter(answer => answer.id !== droppedId));
      setDraggingAnswer(null);
  
      console.log(`Dropped answer "${droppedAnswerText}" on blank ${index}`);
    } else {
      setActiveId(null);
      setDraggingAnswer(null);
    }
  };

  const handleDragCancel = () => {
    setDraggingAnswer(null);
    setActiveId(null);
  };

  const resetAnswers = () => {
    setSelectedAnswers(Array(test.question.split(/(\[\])/g).filter(part => part === '[]').length).fill(null));
    setAvailableAnswers(initialAnswers);
  };

  return (
    <DndContext onDragEnd={handleDrop} onDragCancel={handleDragCancel} >
      <div className='flex relative top-0 flex-col'>
        <UpdateDropDown test={test} updateVisov={() => updateVisov()} />
        <div className='flex flex-col gap-3'>
          <h1 className='text-xl font-semibold text-gray-600'>{test.audioHeader}</h1>
          <div className="w-full h-[1px] bg-gray-100 my-1" />
          <h3 className='mr-10'>{renderFilledText(test.question)}</h3>
        </div>
        <div className="w-full h-[1px] bg-gray-100 my-3" />
          <button onClick={resetAnswers} className="absulute right-0 bg-gray-300 top-0 w-9 h-9 p-0 text-white flex items-center justify-center rounded-lg hover:bg-red-600 transition-all mb-4">
            <IoReload className="text-2xl text-gray-400"/>
          </button>
        <div className="flex gap-1">
          {availableAnswers.length > 0 ? (
            availableAnswers.map((answer) => (
              <DraggableAnswer key={answer.id} answer={answer} />
            ))
          ) : (
            <span className='text-gray-500'>Нет доступных ответов</span>
          )}
        </div>

        <DragOverlay>
          {draggingAnswer ? (
            <div className="border-2 px-3 py-1 rounded-lg bg-blue-200 border-blue-400 font-semibold text-blue-500">
              {draggingAnswer.text}
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default FillWordsInTheBlankDropDown;