"use server"

import { db } from "@/lib/db";
import { Answer, Option, QuestionType } from "@prisma/client";

type data = {
	option: string[];
	text: string;
	question: string;
	isTrue: string[];
}

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
	audioHeader: string | null;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
	audioName?: string | null;
};

const updateFillWordsMultibleOptions = async(optionId: string, optionText: string) => {
	await db.option.update({
		where:{
			id: optionId,
		},data: {
			text: optionText
		}
	})
	
}

export default updateFillWordsMultibleOptions