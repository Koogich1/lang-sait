"use server"

import * as z from 'zod';


import { ResetSchema } from "@/app/schemas";
import { getUserByEmail } from "@/data/user";

import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
	const validatedFields = ResetSchema.safeParse(values)

	if (!validatedFields.success){
		return {error: "Введите существующий email!"}
	}

	const { email } = validatedFields.data;

	const existingUser = await getUserByEmail(email)

	if(!existingUser){
		return {error: "Email не найден"}
	}

	const passwordResetToken = await generatePasswordResetToken(email);
	await sendPasswordResetEmail(
		passwordResetToken.email,
		passwordResetToken.token,
	)

	return {success: "Письмо для сброса пароля отправлено"}
}