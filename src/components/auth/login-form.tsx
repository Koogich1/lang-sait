"use client"

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { LoginSchema } from "@/app/schemas";


import {
	Form,
	FormControl,
	FormItem,
	FormField,
	FormLabel,
	FormMessage,
} from "../ui/form"

import { CardWrapper } from './card-wrapper'
import { Input } from "../ui/input"
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const  LoginForm = () => {

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
 
	const [showTwoFactor, setShowTwoFactor] = useState(false)
	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	})

	const onSubmit = ( values: z.infer<typeof LoginSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			login(values, callbackUrl)
				.then((data) => {
					if(data?.error){
						form.reset();
						setError(data.error);
					};
					if(data?.success){
						form.reset();
						setSuccess(data.success);
					};

					if (data?.twoFactor){
						setShowTwoFactor(true)
					}
				})
				.catch(() => setError("Что-то пошло не так!"))
		});
	}


	return (
		<CardWrapper
		headerLabel = "LangSchool"
		backButtonLabel='Нет аккаунта?'
		backButtonHref='/auth/register'
		showSocial
		>
			<Form {...form}>
				<form 
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full text-[#835BD2]"
				>
					<div className="space-y-4">
						{showTwoFactor && 
								<FormField
								control={form.control}
								name="code"
								render={({field}) => (
									<FormItem>
										<FormLabel>
											2FA код
										</FormLabel>
										<FormControl>
											<Input 
											{...field}
											disabled={isPending}
											placeholder="12345678"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						}
						{ !showTwoFactor &&
							<>
								<FormField
								control={form.control}
								name="email"
								render={({field}) => (
									<FormItem>
										<FormLabel>
											Email
										</FormLabel>
										<FormControl>
											<Input 
											{...field}
											disabled={isPending}
											placeholder="lang-school@mail.com"
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
									render={({field}) => (
										<FormItem>
											<FormLabel>
												Пароль
											</FormLabel>
											<FormControl>
												<Input 
												{...field}
												disabled={isPending}
												placeholder="******"
												type="password"
												/>
											</FormControl>
											<Button variant='info'
											className="border-none p-0 m-0 h-1 pt-5 hover:underline">
												<Link href='/auth/reset'>
													Забыли пароль?
												</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						}
						<FormError message={error}/>
						<FormSuccess message={success}/>
						<Button 
						variant="violetSelect" 
						className="w-full font-semibold text-sm"
						disabled={isPending}>
						{showTwoFactor ? "Подтвердить" : "Войти"}
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}
