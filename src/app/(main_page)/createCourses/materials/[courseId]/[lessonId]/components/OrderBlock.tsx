"use client";

import UpdateOrdering from "@/app/(main_page)/createCourses/components/modal/UpdateTest/updateOrdering";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Option, QuestionType } from "@prisma/client";
import React, { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Answer = {
  id: string;
  testId: string;
  text: string;
  order: number | null;
};

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  audioHeader: string | null;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
};

const OrderBlock = ({ answers, test, visov, currRasdel }: { answers: Answer[], test: Test, visov: () => void, currRasdel: string }) => {
  const [items, setItems] = useState<Answer[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Инициализация items с перемешанными ответами
  useEffect(() => {
    const shuffled = [...answers].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, [answers]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over?.id);

      const newItems = [...items];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, items[oldIndex]);
      setItems(newItems);
    }

    setActiveId(null);
  };

  // Функция для проверки правильного порядка
  const isCorrectOrder = (item: Answer, index: number) => {
    return item.order === index + 1; // Позиции начинаются с 1
  };

  return (
    <div className="mt-1 relative py-4">
      <UpdateOrdering test={test} updateVisov={() => visov()} />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((data: Answer, index: number) => (
            <SortableItem 
              key={data.id} 
              id={data.id} 
              text={data.text} 
              isActive={activeId === data.id} 
              isCorrect={isCorrectOrder(data, index)} 
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeId ? <SortableItem id={activeId} text={items.find(item => item.id === activeId)?.text!} isActive={false} isCorrect={false}/> : null}
        </DragOverlay>
      </DndContext>

      <div className="pt-3 flex gap-2">
        <Input type="text" className="h-9 w-20" placeholder="321" />
        <Button
          className="bg-green-300 text-green-700 font-semibold h-9 p-0 px-2 hover:bg-green-400 hover:text-green-900"
          variant={"shadow2"}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

const SortableItem = ({ id, text, isActive, isCorrect }: { id: string; text: string; isActive: boolean; isCorrect: boolean }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    backgroundColor: isCorrect ? 'lightgreen' : 'white', // Цвет элемента в зависимости от корректности
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border-2 text-blue-400 border-blue-300 font-semibold text-base p-2 my-1 ${isActive ? "bg-blue-100" : ""} ${isCorrect ? "text-green-600 border-green-500" : ""} rounded-lg`}
    >
      {text}
    </div>
  );
};

export default OrderBlock;
