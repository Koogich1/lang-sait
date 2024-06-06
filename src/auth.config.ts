import Credentials from "next-auth/providers/credentials"

import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./app/schemas";
import { getUserByEmail } from "./data/user";

export default{
	providers: [
		Credentials({
			async authorize(credentials){
				const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // user has no password if using other providers like Github/Google
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
				return null
			}
		})
	]
} satisfies NextAuthConfig