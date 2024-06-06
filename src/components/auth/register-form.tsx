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
} from "../ui/form"

import { CardWrapperReg } from './card-wrapper-reg'
import { RegisterSchema } from "@/app/schemas";
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register"

const RegisterForm = () => {

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();


	const form = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
				email: "",
				password: "",
				surname: "",
				name: "",
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
			backButtonHref='/auth/login'
			showSocial
		>
			<div className="w-[100%] mt-7 bg-[#fff] text-[#835BD2]">
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
										<FormMessage />
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
										<FormMessage />
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
										<FormMessage />
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
										<FormMessage />
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
						className="w-full text-sm font-semibold"
						variant="violetSelect"
						>
							Создать аккаунт
						</Button>
					</form>
				</Form>
			</div>
		</CardWrapperReg>
	)
}

export default RegisterForm