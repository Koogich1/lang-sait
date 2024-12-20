"use server"

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { Language, languagePrefers, languageVariants } from "@prisma/client"
import { connect } from "http2"

type Props ={
	language: languageVariants,
	level: string,
	userId: string
}

const addUserLanguage = async ({ language, level, userId }: Props) => {
  
  try{
    await db.language.create({
      data: {
        level: level,
        language: language,
        userId: userId,
        user: {
          connect: {
            id: userId // Используйте переданный teacherId
          }
        }
      }
    });
  } catch(e){
    console.log(e)
  }
};

export default addUserLanguage