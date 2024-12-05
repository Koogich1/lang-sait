"use client"

import { Answer, CorrectAnswer, courseData, Option, QuestionType, TextBlock, User } from '@prisma/client';
import React, { useCallback, useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  rectIntersection,
} from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TestVariants from '../../components/testVariants';
import { HashLoader } from 'react-spinners';
import updateTestPosition from '@/app/(main_page)/createCourses/components/actions/test/updateTestPosition';
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

type Props = {
  tests: Test[] | null,
  user: User,
  course: courseData | null,
  lessonId: string,
  rasdelId: string,
  isSwithOn: boolean,
  setSwith: any,
  fetchTest: () => void
}



const RasstavitTextBox = ({ tests, user, course, lessonId, rasdelId, isSwithOn, setSwith, fetchTest }: Props) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [items, setItems] = useState<Test[]>([]);
  const [loading, setLoading] = useState(false)


	const omit = (obj:any, keys:any) => {
		const newObj = { ...obj };
		keys.forEach((key: any) => delete newObj[key]);
		return newObj;
	};

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  useEffect(() => {
    if (tests) {
      setItems(tests);
    }
  }, [tests]);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);

      const newItems = [...items];
      // Обновляем порядок элементов
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
      setItems(newItems);

			const updatedItems = newItems.map((item, index) => ({
        ...item,
        position: index, // Обновляем позицию
      }));
			
			try {
				setLoading(true)
        await Promise.all(updatedItems.map(data => 
          updateTestPosition({ rasdelId: data.id, position: data.position })
        ));
				setLoading(false)
      } catch(e) {
        console.log(e);
      }

      // Здесь можно добавить вызов API для обновления позиции в БД
      await fetchTest(); // Обновляем данные после перетаскивания
    }

    setActiveId(null);
  };

  if(loading){
		return(
			<div className='min-h-[8rem] w-full flex flex-col items-center justify-center gap-2 text-gray-400'>
				<p>Подождите обновление данных...</p>
				<HashLoader color='#9ca3af'/>
			</div>
		)
	}

  return (
    <div className='border mt-5 flex flex-col justify-between rounded-xl p-3 pt-5 min-w-[330px] max-w-[700px] shadow-lg border-purple-50'>
      <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col">
          {items.map((test) => (
              <SortableItem 
                key={test.id} // Уникальный ключ
                id={test.id} 
                questionType={test.questionType} 
                {...omit(test, ['id', 'questionType'])} // Передаем все поля, кроме id и questionType
                user={user} 
                course={course} 
                fetchTest={fetchTest} 
                isSwithOn={isSwithOn} 
                setSwith={setSwith} 
                test={test}
              />	
          ))}
        </div>
      </SortableContext>
    </DndContext>
    </div>
  );
};


const SortableItem: React.FC<{
  id: string; 
  questionType: QuestionType; 
  user: User; 
  course: courseData | null; 
  fetchTest: () => void; 
  isSwithOn: boolean; 
  setSwith: any; 
  test: Test;
  lessonId: string; // Добавить lessonId
  rasdelId: string; // Добавить rasdelId
}> = ({ id, questionType, user, course, fetchTest, isSwithOn, setSwith, test, lessonId, rasdelId }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border mt-2 rounded-lg p-3 bg-white shadow-sm"
    >
      <TestVariants 
        testik={test} 
        user={user} 
        course={course} 
        lessonId={lessonId} 
        rasdelId={rasdelId} 
        isSwithOn={isSwithOn} 
        setSwith={setSwith} 
        fetchTest={fetchTest} 
      />
    </div>
  );
};


export default RasstavitTextBox;
