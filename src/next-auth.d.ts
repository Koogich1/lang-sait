import { UserRole } from "@prisma/client";
import NextAuth, {type DefaultSession} from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
	role: UserRole
	surname: Surname
	isTwoFactorEnabled: boolean
};

declare module "next-auth" {
	interface Session{
		user: ExtendedUser;
		surname: ExtendedUser;
	}
}