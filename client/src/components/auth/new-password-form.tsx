"use client"

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { NewPasswordSchema } from "@/app/schemas";
import { useSearchParams } from "next/navigation";


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
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof NewPasswordSchema>>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: ""
		}
	})

	const onSubmit = ( values: z.infer<typeof NewPasswordSchema>) => {
		setError("");
		setSuccess("");

		startTransition(() => {
			newPassword(values, token)
				.then((data) => {
					setError(data?.error)
					setSuccess(data?.success)
				});
		});
	}


	return (
		<CardWrapper
		headerLabel='Введите новый пароль'
		backButtonLabel='Вернуться к аунтефикации'
		backButtonHref='/auth/login'
		>
			<Form {...form}>
				<form 
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-full text-[#835BD2]"
				>
					<div className="space-y-4">
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
								<FormMessage />
							</FormItem>
						)}
						/>
						<FormError message={error}/>
						<FormSuccess message={success}/>
						<Button 
						variant="violetSelect" 
						className="w-full font-semibold text-sm"
						disabled={isPending}>
							Изменить пароль
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default NewPasswordForm
