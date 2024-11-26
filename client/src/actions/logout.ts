"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  // Можно убрать какие-либо данные о юзере и пр серверные штуки
  await signOut();
}