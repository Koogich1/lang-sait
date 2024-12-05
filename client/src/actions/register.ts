"use server"

import * as z from 'zod';
import bcrypt from "bcryptjs"

import { db } from '@/lib/db';

import { RegisterSchema } from '@/app/schemas';
import { getUserByEmail } from '@/data/user';

import { generateVerificationToken } from '@/lib/tokens';

import { sendVerificationEmail } from '@/lib/mail';
import { firstTimeLogin } from './firstTimeLogin';

export const register: any = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values); 
 
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    email,
    password,
    name,
    surname
  } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email уже используется" };
  }

  await db.user.create({
    data: {
      name,
      surname,
      email,
      password: hashedPassword,
      image: "https://storage.yandexcloud.net/langschoolacynberg/images/user.png",
    }
  });

  try {
    const loginResponse = await firstTimeLogin({
      email,
      password,
      name,
      surname,
    });
    return { success: "Регистрация успешна", loginResponse };
  } catch (error) {
    return { error: "Ошибка при входе: " + error };
  }
};
