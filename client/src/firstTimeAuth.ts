import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";

import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const {
	handlers: {GET, POST},
	auth,
	signIn,
	signOut,
} = NextAuth ({
	pages:{
		signIn: "/auth/login",
		error: "/auth/error"
	},
	events:{
		async linkAccount({user}) {
			await db.user.update({
				where: {id: user.id},
				data:  {emailVerified: new Date()}
			})
		}
	},
	callbacks:{
		async signIn({user, account}){

			if(account?.provider !== "credentials"){
				return true
			}

			if (!user.id) {
				return false;
			}
			const existingUser = await getUserById(user.id);

			if(existingUser){
				return(true)
			}else{
				return false
			}
			},

		async session({ token, session }){

			session.user.surname = token.surname;

			if(token.sub && session.user){
				session.user.id = token.sub;
			};

			if(token.role && session.user){
				session.user.role = token.role as UserRole;
			}

			if(session.user){
				session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
			}

			if(session.user){
				session.user.name = token.name
			}
			if (token.email) {
        session.user.email = token.email;
			}
		
			return session;
		},

		async jwt ({ token }) {
			if(!token.sub) return token;
			
			const existingUser = await getUserById(token.sub)

			if(!existingUser) return token

			token.name = existingUser.name;
			token.email = existingUser.email;
			token.role = existingUser.role;
			token.surname = existingUser.surname;
			token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token;
		}
	},
	adapter: PrismaAdapter(db),
	session: {strategy: "jwt"},
	...authConfig
})