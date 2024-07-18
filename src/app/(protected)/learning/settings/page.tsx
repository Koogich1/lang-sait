"use client"

import * as  z from "zod";

import _ from "lodash"

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea"

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { settingsSchema } from "@/app/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

import UpdateProfilePhoto from "../components/updateProfilePhoto";
import getUserByTeacherId from "@/actions/getUserByTeacherId";
import { updateUser } from "./actions/updateUser";
import { updateTeacher } from "./actions/updateTeacher";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import LanguageBox from "./components/languageBox";

type Teacher = {
  id: string;
  teacherId: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
    language: any[];
    levelLanguage: string;
  };
};

const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();

	const [user, setUser] = useState<Teacher | null>(); 

	useEffect(() => {
		const userFetch = async() => {
			const userData = await getUserByTeacherId()
			if(userData){
				setUser(userData)
			}
		}
		userFetch()
	},[])

	const form = useForm({
    defaultValues: {
      name: user?.userInfo.name|| "",
      surname: user?.userInfo.surname || "",
			bio: user?.teacherInfo.aboutMe,
			language: undefined,
    },
  });

  useEffect(() => {
    form.reset({
      name: user?.userInfo.name|| "",
      surname: user?.userInfo.surname || "",
      bio: user?.teacherInfo.aboutMe,
			language: undefined,
    });
  }, [user]);

	if(!user?.teacherInfo.language){
		return
	}

  const onSubmit = (values: any) => {
		console.log(values)
		startTransition(async () => {
			try {
				console.log(values.name)
				const userUpdateResult = await updateUser(values.name, values.surname);
				const teacherUpdateResult = await updateTeacher(values.bio, values.language, user?.teacherInfo.language);
	
				if ('success' in userUpdateResult && 'success' in teacherUpdateResult) {
					setSuccess('Settings updated successfully!');
					update()
				} else {
					setError('Failed to update settings');
				}
			} catch (error) {
				setError('An error occurred while updating settings');
			}
		});
	};
	

	return(
		<div className="w-full min-h-[80vh] bg-white rounded-xl shadow-lg p-6 mt-5 flex justify-between">
				<UpdateProfilePhoto />
				<div className="w-[70%] px-5">
					<Form {...form}>
						<form 
						className="space-y-3 flex flex-col"
						onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid flex-flex-col text-lg text-gray-600">
								<div className="w-full h-[1px] bg-gray-100 mb-1 mt-1"></div>
								<FormField 
									control={form.control}
									name="name"
									render={({ field }) =>
										(
										<FormItem className="flex justify-between items-center w-full">
											<FormLabel className="text-base flex font-semibold text-gray-500 w-[10%] pt-2">Имя</FormLabel>
											<FormControl className="w-[75%] h-10">
												<Input 
													className="transition-all rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
												{...field}
												placeholder='Александр'
												disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="w-full h-[1px] bg-gray-100 mt-3 mb-1"></div>
								<FormField 
									control={form.control}
									name="surname"
									render={({ field }) => (
										<FormItem className="flex justify-between items-center">
											<FormLabel className="text-base font-semibold text-gray-500 w-[10%] pt-2">Фамилия</FormLabel>
											<FormControl className="w-[75%] h-10">
												<Input 
												className="transition-all rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
												{...field}
												placeholder='Федоров'
												disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="w-full h-[1px] bg-gray-100 mt-3 mb-1"></div>
								<FormField 
									control={form.control}
									name="bio"
									render={({ field }) => (
										<FormItem className="flex justify-between items-center">
											<FormLabel className="text-base font-semibold text-gray-500 w-[10%] pt-2">Фамилия</FormLabel>
											<FormControl className="w-[75%] min-h-[130px]">
												<Textarea 
												className="transition-all rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
												{...field}
												placeholder='Напишите о себе'
												disabled={isPending}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="w-full h-[1px] bg-gray-100 mt-3 mb-1"></div>
								<FormField 
									control={form.control}
									name="language"
									render={({ field }) => (
										<FormItem className="flex justify-between items-center">
											<FormLabel className="text-base font-semibold text-gray-500 w-[10%] pt-2">Язык</FormLabel>
											<FormControl className="w-[75%]">
												<Select onValueChange={field.onChange}>
													<SelectTrigger className="w-[75%]">
														<SelectValue placeholder="Выберете язык, который хотите добавить" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="China">Китайский</SelectItem>
														<SelectItem value="Korean">Корейский</SelectItem>
														<SelectItem value="English">Английский</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div>
								<h1 className="text-base font-semibold text-gray-500 w-[full] pt-2">Мои языки:</h1>
								<LanguageBox />
							</div>
							<div className="w-full h-[1px] bg-gray-100 mt-3 mb-1"></div>
							<FormError message={error}/>
							<FormSuccess message={success}/>
							<Button
								disabled={isPending}
								variant="violetSelect"
								type="submit"
								className="text-sm font-semibold"
								>
								Сохранить
							</Button>
						</form>
					</Form>
				</div>
		</div>
	)
}

export default SettingsPage