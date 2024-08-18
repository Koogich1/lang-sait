"use client";

import ConnectLettersModal from "@/app/(main_page)/createCourses/components/modal/UpdateTest/сonnectLettestModal";
import { Answer, Option, QuestionType, TextBlock } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
};

interface AudioChooseProps {
  test: Test;
  userId: string;
  courseUserId: string | null;
  updateVisov: () => void;
}

const ConnectLetters: React.FC<AudioChooseProps> = ({ test, userId, courseUserId, updateVisov }) => {
  const [letters, setLetters] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  useEffect(() => {
    setLetters(shuffleArray(test.question.split("")));
  }, [test.question]);

  const shuffleArray = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = letters.findIndex(letter => letter === active.id);
      const newIndex = letters.findIndex(letter => letter === over?.id);

      const newLetters = [...letters];
      newLetters.splice(oldIndex, 1);
      newLetters.splice(newIndex, 0, letters[oldIndex]);
      setLetters(newLetters);
    }

    setActiveId(null);
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <div className="relative">
      <ConnectLettersModal test={test} updateVisov={updateVisov}/>
      <h3 className='font-semibold text-lg text-gray-600 max-w-[80%]'>Составьте слово из букв</h3>
      <span className='text-base font-semibold text-gray-400'>Загаданное слово: {test.question}</span>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext items={letters} strategy={verticalListSortingStrategy}>
          <div className='flex gap-1 py-3 text-gray-500 font-semibold relative '>
            {letters.map((letter, index) => (
              <SortableLetter key={letter} id={letter} text={letter.toLowerCase()} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay>
          {activeId ? <SortableLetter id={activeId} text={activeId.toLowerCase()} /> : null}
        </DragOverlay>
      </DndContext>
      {userId === courseUserId && <ConnectLettersModal test={test} updateVisov={() => updateVisov()} />}
    </div>
  );
};

const SortableLetter = ({ id, text }: { id: string; text: string; }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: 'transform 200ms ease', // Плавный переход при перемещении
    zIndex: 1, // Размещаем над другими элементами
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-8 w-8 bg-green-200 flex justify-center items-center border-2 border-green-400 text-green-500 font-semibold rounded-lg my-1"
    >
      {text}
    </div>
  );
};

export default ConnectLetters;