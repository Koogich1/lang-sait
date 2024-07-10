"use server"

import { auth } from "@/auth";
import { User } from "@prisma/client";

export const currentUser = async (): Promise<User | null | undefined> => {
  const session = await auth()
  if (session?.user) {
    return session.user as User;
  } else {
    return null; // Возвращаем null, если session.user отсутствует
  }
};