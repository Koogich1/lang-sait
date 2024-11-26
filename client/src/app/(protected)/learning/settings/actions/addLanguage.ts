"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Language, languagePrefers, languageVariants } from "@prisma/client"
import { connect } from "http2"

type Props ={
	language: languageVariants,
	level: string,
	prefers: languagePrefers,
	teacherId: string
  userId: string
}

const addLanguage = async ({ language, level, prefers, teacherId, userId}: Props) => {
  const user = await currentUser();
  if (user) {
    await db.language.create({
      data: {
        level: level,
        prefers: prefers,
        language: language,
        userId: user.id,
        teachers: {
          connect: {
            id: teacherId // Используйте переданный teacherId
          }
        }
      }
    });
  }
};

export default addLanguage