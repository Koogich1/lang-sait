"use server"

import { auth } from "@/auth";
import { User } from "@prisma/client";
import { db } from "./db";

export const currentUser = async (): Promise<User | null | undefined> => {
  const session = await auth()
  if (session?.user) {
    const user = await db.user.findFirst({
      where:{
        id: session.user.id
      }
    })
    return user
  }
};