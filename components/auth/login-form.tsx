"use client"

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
	Form,
	FormControl,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { CardWrapper } from './card-wrapper'
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";

const LoginForm = () => {

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();


	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
				email: "",
				password: "",

		},
	})

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values)
				.then((data) => {
					setError(data ? data.error : '');;
					setSuccess(data ? data.success : '');
				})
		});
	}


	return (
		<CardWrapper
		headerLabel='Добро пожаловать'
		backButtonLabel='Нет аккаунта?'
		backButtonHref='/sign-in/register'
		showSocial
		>
			<div className="w-[100%] mt-7 bg-[#fff]">
				<Form {...form}>
					<form 
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-3"
					>
						<div className="space-y-2">
							<FormField 
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Email
										</FormLabel>
										<FormControl>
											<Input 
											disabled={isPending}
											{...field}
											placeholder="LangSchool@mail.ru"
											type="email"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Пароль
										</FormLabel>
										<FormControl>
											<Input 
											disabled={isPending}
											{...field}
											placeholder="********"
											type="password"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormError 
							message={error}
						/>
						<FormSuccess 
							message={success}
						/>
						<Button
						type="submit"
						className="w-full bg-[#3e236c]"
						>
							Войти
						</Button>
					</form>
				</Form>
			</div>
		</CardWrapper>
	)
}

export default LoginForm