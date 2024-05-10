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

import { CardWrapperReg } from './card-wrapper-reg'
import { RegisterSchema } from "@/schemas";
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";

const RegisterForm = () => {

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();


	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
				email: "",
				password: "",
				name: "",
				surname: "",
		},
	})

	const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			register(values)
				.then((data) => {
					setError(data.error);
					setSuccess(data.success);
				})
		});
	}


	return (
		<CardWrapperReg
			headerLabel='Создать учетную запись'
			backButtonLabel='Уже есть аккаунт'
			backButtonHref='/sign-in/login'
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
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Имя
										</FormLabel>
										<FormControl>
											<Input 
											disabled={isPending}
											{...field}
											placeholder="Дмитрий"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="surname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Фамилия
										</FormLabel>
										<FormControl>
											<Input 
											disabled={isPending}
											{...field}
											placeholder="Новиков"
											/>
										</FormControl>
									</FormItem>
								)}
							/>
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
							Зарегистрироваться
						</Button>
					</form>
				</Form>
			</div>
		</CardWrapperReg>
	)
}

export default RegisterForm