"use client"

import _ from "lodash"

import { Button } from "@/components/ui/button";
import Header from "../_components/header";
import { settings } from "@/actions/settings";
import { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

import { User } from "@prisma/client";
import { currentUser } from "@/lib/auth";
import ChangePhoto from "./components/modal/changePhoto";
import LanguageBox from "./components/languages/languageUserBox";


const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<User | null>(null);
	const [open, setOpen] = useState(false)

	const fetchUser = async () => {
		const userData = await currentUser();
		if(userData){
			setUser(userData)
		}
	};

  useEffect(() => {
    fetchUser();
  }, []);

  // Используем числовое значение по умолчанию
  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      age: user?.age || 0, // Убедитесь, что age это число
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
      age: user?.age || 0, // Убедитесь, что age это число
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    });
  }, [user]);

  const onSubmit = (values: any) => {
		// Преобразуем age из строки в число
		const updatedValues = {
			...values,
			age: values.age ? parseInt(values.age, 10) : undefined // Преобразование в число
		};
		
		console.log(values.age)
		console.log(typeof(values.age))
	
		startTransition(() => {
			settings(updatedValues)
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

	if (!user) {
		return null; // Возвращаем null, если пользователь не загружен
	}

	return (
		<>
			<Header user={user} header="Настройки" />
			<div className="bg-white shadow-lg rounded-lg mt-3">
				<div className="p-3 flex gap-2 flex-col lg:flex-row">
					<div className="w-[250px] flex flex-col justify-center items-center gap-3 p-2 pb-3 border border-gray-200 rounded-sm ">
						<h1 className="text-lg font-semibold text-[#835BD2]">Изображение профиля</h1>
						<div className="w-[150px] h-[150px]">
							{user.image && <img src={user.image} alt="Profile Picture" className="w-full h-full rounded-full" />}
						</div>
						<Button 
							className="text-sm font-semibold p-5 mt-3"
							variant='violetSelect'
							onClick={() => setOpen(true)}
						>
							Измнить
						</Button>
					</div>
					<div className="w-[300px] flex flex-col justify-between items-start gap-3 p-2 pb-3 border border-gray-200 rounded-sm ">
						<h1 className="text-lg font-semibold text-[#835BD2]">Изучаю язык(и):</h1>
						<div className="w-full">
							<LanguageBox />
						</div>
					</div>
					<ChangePhoto open={open} setOpenModal={setOpen} user={user} visov={fetchUser} />
				</div>
				<div>
					<Form {...form}>
						<form 
							className="space-y-3 pb-3"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<div className="px-3 grid pt-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-lg text-gray-600 gap-x-4">
								<FormField 
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base font-medium text-gray-400">Имя</FormLabel>
											<FormControl>
												<Input 
													{...field}
													placeholder='Александр'
													disabled={isPending}
													className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
											<FormLabel className="text-base font-medium text-gray-400">Фамилия</FormLabel>
											<FormControl>
												<Input 
													{...field}
													placeholder='Федоров'
													disabled={isPending}
													className="border-[#c9b0fa]  placeholder:text-gray-300  text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField 
									control={form.control}
									name="age"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base font-medium text-gray-400">Возраст</FormLabel>
											<FormControl>
												<Input 
													{...field}
													placeholder='12'
													type="number" // Изменение на тип number
													disabled={isPending}
													onChange={event => field.onChange(+event.target.value || null)}
													className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
											<FormLabel className="text-base font-medium text-gray-400">Email</FormLabel>
											<FormControl>
												<Input 
													{...field}
													type="email"
													placeholder='lang-school@mail.ru'
													disabled={isPending}
													className="border-[#c9b0fa] text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
											<FormLabel className="text-base font-medium text-gray-400">Пароль</FormLabel>
											<FormControl>
												<Input 
													{...field}
													type="password"
													placeholder='******'
													disabled={isPending}
													className="border-[#c9b0fa]  placeholder:text-gray-300  text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
											<FormLabel className="text-base font-medium text-gray-400">Новый пароль</FormLabel>
											<FormControl>
												<Input 
													{...field}
													type="password"
													placeholder='******'
													disabled={isPending}
													className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormError message={error} />
							<FormSuccess message={success} />
							<Button
								disabled={isPending}
								variant="violetSelect"
								type="submit"
								className="text-sm font-semibold m-3 mt-5"
							>
								Сохранить
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	)
}

export default SettingsPage;