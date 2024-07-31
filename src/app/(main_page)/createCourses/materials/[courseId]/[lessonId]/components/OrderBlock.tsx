"use client";

import UpdateTestModal from "@/app/(main_page)/createCourses/components/modal/updateTestModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Option, QuestionType } from "@prisma/client";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

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
  questionType: QuestionType; // Это значение может быть enum или типом, определенным в Prisma
  options: Option[]; // Используем массив Option
  answers: Answer[];  // Используем массив Answer
};

const OrderBlock = ({ answers, test, visov, currRasdel}: { answers: Answer[], test: Test, visov: () => void, currRasdel: string}) => {
  const shuffledAnswers = shuffleArray([...answers]);

  return (
    <div className="mt-1 relative">
      <UpdateTestModal test={test} updateVisov={() => visov()}/>
      {shuffledAnswers.map((data: Answer, index: number) => (
        <div key={data.id} className="py-1">
          <h1 className="font-medium text-gray-400">Положение: {data.order}</h1>
          {index + 1}) {data.text}
        </div>
      ))}
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

export default OrderBlock;
