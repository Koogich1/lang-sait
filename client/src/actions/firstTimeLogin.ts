"use server"

import * as z from 'zod';
import { AuthError } from 'next-auth';
import bcrypt from "bcryptjs"

import { LoginSchema, RegisterSchema } from '@/app/schemas';

import { signIn } from '@/firstTimeAuth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { 
	generateVerificationToken, 
	generateTwoFactorToken 
} from '@/lib/tokens';
import { getUserByEmail } from '@/data/user';
import { 
	sendVerificationEmail,
	sendTwoFactorTokenEmail
} from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { db } from '@/lib/db';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export const firstTimeLogin = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email не существует" };
  }

  // Сравнение пароля
  if (existingUser.password) {
    const passwordsMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordsMatch) {
      return { error: "Неверный пароль" };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Успешный вход" };
  } catch (error) {
    return { error: "Ошибка входа: " + error};
  }
};