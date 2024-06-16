"use client"

import * as  z from "zod";

import { Button } from "@/components/ui/button";
import Header from "../_components/header";
import { settings } from "@/actions/settings";
import { useEffect, useState, useTransition } from "react";
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
import { currentUser } from "@/lib/auth";
import { ExtendedUser } from "@/next-auth";

const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await currentUser();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUser();
  }, []);

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      role: user?.role || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      role: user?.role || "",
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    });
  }, [user]);

  const onSubmit = (values: any) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Что-то пошло не так!"));
    });
  };


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
											{user?.role}
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