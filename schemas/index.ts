import * as z from "zod"

export const LoginSchema = z.object({
	email: z.string().email({
	}),
	password: z.string().min(1, {
	})
}) 

export const RegisterSchema = z.object({
	email: z.string().email({
	}),
	password: z.string().min(8, {
		message: "Минимум 8 символов"
	}),
	name: z.string().min(1),
	surname: z.string().min(1),
}) 