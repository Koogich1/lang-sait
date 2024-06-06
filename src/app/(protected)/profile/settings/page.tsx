"use client"

import * as  z from "zod";

import { Button } from "@/components/ui/button";
import Header from "../_components/header";
import { settings } from "@/actions/settings";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { Switch } from "@/components/ui/switch";

import{
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { UserRole } from "@prisma/client";

const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>()
	const [success, setSuccess] = useState<string | undefined>()
	const {update} = useSession()
	const [isPending, startTransition] = useTransition()
	
	const user = useCurrentUser()

	const form = useForm<z.infer<typeof settingsSchema>>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			name: user?.name || undefined,
			surname: user?.surname || undefined,
			email:  user?.email || undefined,
			password: undefined,
			newPassword: undefined,
			role: user?.role || undefined,
		}
	})

	const onSubmit = (values: z.infer<typeof settingsSchema>) => {
		startTransition(() => {
			settings(values)
			.then((data)=> {
				if (data.error){
					setError(data.error)
				}
				if(data.success){
					update()
					setSuccess(data.success)
				}
			})
			.catch(() => setError("Что-то пошло не так!"))
		})
	}

	return(
		<div>
			<div>
				<Header 
					header="Настройки"
				/>
			</div>
			<div>
				<Form {...form}>
					<form 
					className="space-y-6"
					onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid pt-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-lg text-[#4D6785]">
							<FormField 
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input 
											{...field}
											placeholder='Александр'
											disabled={isPending}
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
										<FormLabel>Фамилия</FormLabel>
										<FormControl>
											<Input 
											{...field}
											placeholder='Федоров'
											disabled={isPending}
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
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input 
											{...field}
											type="email"
											placeholder='lang-school@mail.ru'
											disabled={isPending}
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
										<FormLabel>Пароль</FormLabel>
										<FormControl>
											<Input 
											{...field}
											type="password"
											placeholder='******'
											disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="newPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Новый пароль</FormLabel>
										<FormControl>
											<Input 
											{...field}
											type="password"
											placeholder='******'
											disabled={isPending}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Role</FormLabel>
										<Select
											disabled={isPending}
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Выберите роль"/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
											<SelectItem value={UserRole.USER}>
													Ученик
												</SelectItem>
												<SelectItem value={UserRole.TEACHER} disabled={true}>
													Учитель
												</SelectItem>
												<SelectItem value={UserRole.ADMIN} disabled={true}>
													Админ
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField 
								control={form.control}
								name="isTwoFactorEnabled"
								render={({ field }) => (
									<FormItem className="flex flex-row items-center justify-between rounded-xl border p-3 shadow-sm bg-white mt-8">
										<div className="space-y-0.5">
											<FormLabel>
												Двухфакторная Аунтефикация
											</FormLabel>
											<FormDescription>
												Добавить двухфакторную аутентификацию для вашего аккаунта
											</FormDescription>
										</div>
										<FormControl>
												<Switch 
													disabled={isPending}
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
											</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<FormError message={error}/>
						<FormSuccess message={success}/>
						<Button
						disabled={isPending}
						variant="violetSelect"
						type="submit">
							Сохранить
						</Button>
					</form>
				</Form>
			</div>
		</div>
	)
}

export default SettingsPage