"use server"

import * as z from 'zod';
import { AuthError } from 'next-auth';
import bcrypt from "bcryptjs"

import { LoginSchema } from '@/app/schemas';

import { signIn } from '@/auth';
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
import { useCurrentUser } from '@/hooks/use-current-user';


export const login = async (values: z.infer<typeof LoginSchema>,
	callbackUrl?: string | null,
) => {
	const validatedFields = LoginSchema.safeParse(values) 
 
	if(!validatedFields.success){
		return {error: "Invalid fields!"};
	}

	const { email, password, code } = validatedFields.data;

	const existingUser = await getUserByEmail(email);

	if (!existingUser){
		return { error: "Email не существует" }
	}

	if (!existingUser.emailVerified){

		const verificationToken = await generateVerificationToken( email )

		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token,
		)

		return { success: "Письмо подтверждения отправлено"}
	}

	if(existingUser.password){
		const passwordsMatch = await bcrypt.compare(password, existingUser.password)

		if(!passwordsMatch){
			return{ error: "Неверный пароль"}
		}
	}
	
	if(!existingUser.isTwoFactorEnabled && existingUser.email){
		if (code){ 
			const twoFactorToken = await getTwoFactorTokenByEmail(
				existingUser.email
			)
			if(!twoFactorToken){
				return {error: "Код отсутвует"}
			}
			if (twoFactorToken.token !== code){
				return { error: "Неверный код"}
			}
			const hasExpired = new Date(twoFactorToken.expires) < new Date();

			if(hasExpired){
				return { error: "Код устарел"};
			}

			await db.twoFactorToken.delete({
				where: {id: twoFactorToken.id}
			})

			const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

			if (existingConfirmation){
				await db.twoFactorConfirmation.delete({
					where: { id: existingConfirmation.id }
				})
			}

			await db.twoFactorConfirmation.create({
				data: {
					userId: existingUser.id,
				}
			})
		} else{

			const twoFactorToken = await generateTwoFactorToken(existingUser.email)
			await sendTwoFactorTokenEmail(
				twoFactorToken.email,
				twoFactorToken.token,
			)
			return {twoFactor: true}
		}
	}

	
	try{
		await signIn("credentials", {
			email,
			password,
			redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
		})
	}catch(error){
		if (error instanceof AuthError){
			switch(error.type){
				case "CredentialsSignin":
					return {error: "Неверные учетные данные!"}
				default:
					return {error: "Что-то пошло не так!"}
			}
		}
		throw error;
	}
};