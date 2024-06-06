"use client"

import * as z from "zod";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { ResetSchema } from "@/app/schemas";


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
import { reset } from "@/actions/reset";

const ResetForm = () => {

	const [error, setError] = useState<string | undefined>('');
	const [success, setSuccess] = useState<string | undefined>('');
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof ResetSchema>>({
		resolver: zodResolver(ResetSchema),
		defaultValues: {
			email: ""
		}
	})

	const onSubmit = ( values: z.infer<typeof ResetSchema>) => {
		setError("");
		setSuccess("");

		console.log(values)


		startTransition(() => {
			reset(values)
				.then((data) => {
					setError(data?.error)
					setSuccess(data?.success)
				});
		});
	}


	return (
		<CardWrapper
		headerLabel='Забыли пароль?'
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
						<FormError message={error}/>
						<FormSuccess message={success}/>
						<Button 
						variant="violetSelect" 
						className="w-full font-semibold text-sm"
						disabled={isPending}>
							Отправить email
						</Button>
					</div>
				</form>
			</Form>
		</CardWrapper>
	)
}

export default ResetForm
