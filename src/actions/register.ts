"use server"

import * as z from 'zod';
import bcrypt from "bcryptjs"

import { db } from '@/lib/db';

import { RegisterSchema } from '@/app/schemas';
import { getUserByEmail } from '@/data/user';

import { generateVerificationToken } from '@/lib/tokens';

import { sendVerificationEmail } from '@/lib/mail';

export const register:any = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values) 
 
	if(!validatedFields.success){
		return {error: "Invalid fields!"};
	}

	const {
		email,
		password,
		name,
		surname
	} = validatedFields.data;

	const hasherdPassword = await bcrypt.hash(password, 10);

	const existingUser = await getUserByEmail(email);

	if(existingUser){
		return{ error: "Email уже исопльзуется"};
	};

	await db.user.create({
		data: {
			name,
			surname,
			email,
			password: hasherdPassword,
			image: "https://storage.yandexcloud.net/langschoolacynberg/images/user.png",
			teacherId: "cly6yadjz00015vyv0oydfbs0",
		}
	});

	const verificationToken = await generateVerificationToken( email )

	await sendVerificationEmail(
		verificationToken.email,
		verificationToken.token,
	)

	return { success: "Письмо подтверждения отправлено"};
};