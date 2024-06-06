"use server"

import * as z from "zod"
import bcrypt from "bcryptjs"

import { db } from "@/lib/db"
import { settingsSchema } from "@/app/schemas"
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"  
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const settings = async (
	values: z.infer<typeof settingsSchema>
) => {
	const user = await currentUser()

	if(!user) {
		return {error: "Неавторизован"}
	}

	if (user === null || user === undefined) {
		return { error: "Неавторизован" };
	}
	
	if (!user.id) {
		return { error: "ID пользователя отсутствует" };
	}
	
	const dbUser = await getUserById(user.id);

	if (dbUser === null) {
		return { error: "Неавторизован" };
	}
	

	if(values.email && values.email !== user.email){
		const existingUser = await getUserByEmail(values.email)

		if(existingUser && existingUser.id !== user.id){
			return { error: "Email уже используется" }
		}
		
		const verificationToken = await generateVerificationToken(values.email)
		await sendVerificationEmail(
			verificationToken.email,
			verificationToken.token
		)

		return { success: "Письмо верификации отправлено" }
	}
	if (values.password && values.newPassword && dbUser?.password){
		const passwordMatch =  await bcrypt.compare(
			values.password,
			dbUser.password,
		)
		if(!passwordMatch){
			return {error: "Неверный пароль"}
		}

		const hashedPassword = await bcrypt.hash(
			values.newPassword,
			10
		);
		values.password = hashedPassword;
		values.newPassword = undefined;
	}

	await db.user.update({
		where: {id: dbUser.id},
		data: {
			...values
		}
	})

	return {success: "Настройки обновлены!"}
}