import { newPassword } from "@/actions/new-password"
import { UserRole } from "@prisma/client"
import * as z from "zod"

export const settingsSchema = z.object({
	name: z.optional(z.string()),
	surname: z.optional(z.string()),
	isTwoFactorEnabled: z.optional(z.boolean()),
	role: z.enum([UserRole.ADMIN, UserRole.USER, UserRole.TEACHER]),
	age: z.number().max(120, "Возраст не может превышать 120 лет"),
	email: z.optional(z.string().email()),
	password: z.optional(z.string().min(6)),
	newPassword: z.optional(z.string().min(6)),
})
	.refine((data)=> {
		if(data.password && !data.newPassword){
			return false;
		}

		return true
	},{
		message: "New password is required",
		path: ["newPassword"]
	}
)
.refine((data)=> {
	if(data.newPassword && !data.password){
		return false;
	}
	
	return true
},{
	message: "Password is required",
	path: ["password"]
}
)

export const NewPasswordSchema = z.object({
	password: z.string().min(6, {
		message: "Необходимо инимум 6 символов"
	}),
})

export const ResetSchema = z.object({
	email: z.string().email({
		message: "Требуется ввести Email!"
	}),
})

export const LoginSchema = z.object({
	email: z.string().email({
		message: "Требуется ввести Email!"
	}),
	password: z.string().min(1, {
		message: "Требуется ввести пароль!"
	}),
	code: z.optional(z.string()),
	recaptcha: z.string().optional(),
})

export const RegisterSchema = z.object({
	email: z.string().email({
		message: "Ввести Email"
	}),
	password: z.string().min(6, {
		message: "Минимум 6 символов"
	}),
	name: z.string().min(1, {
		message: "Введите Имя"
	}),
	surname: z.string().min(1, {
		message: "Введите Фамилию"
	}),
	code: z.optional(z.string()),
})