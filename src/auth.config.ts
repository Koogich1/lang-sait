import bcrypt from "bcryptjs"
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import VK from "next-auth/providers/vk"
import Yandex from "next-auth/providers/yandex"

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export default {
	providers: [
		VK({
			clientId: process.env.VK_CLIENT_ID,
			clientSecret: process.env.VK_CLIENT_SECRET,
		}),
		Yandex,
		Credentials({
			async authorize(credentials){
				const validatedFields = LoginSchema.safeParse(credentials);

				if(validatedFields.success){
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email)
					if(!user || !user.password) return null

					const passwordMatch = await bcrypt.compare(
						password,
						user.password
					)

					if (passwordMatch) return user
				}

				return null;
			}
		})
	],
} satisfies NextAuthConfig