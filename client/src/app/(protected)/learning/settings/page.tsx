"use client"

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
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import Link from "next/link";
import UpdateWeekSchema from "./_weekSchema/page";
import { Language, User } from "@prisma/client";
import findLanguages from "./actions/findLanguages";
import ChangePhoto from "../../profile/settings/components/modal/changePhoto";
import { currentUser } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";
import AddImagesToTeacher from "./components/modal/addImagesToTeacher";
import Image from "next/image";
import ImageWatch from "./components/modal/imageWatch";

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
		images: string[];
		prise: number;
  };
};

const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
	const [open, setOpen] = useState<boolean>(false)
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
	const [user, setUser] = useState<Teacher | null>(); 
	const [updatedUser, setUpdatedUser] = useState<User>()

	const [teacherOpen, setTeacherOpen] = useState<boolean>(false)

	const[activeImage, setActiveImage] = useState<string>("")
	const[openImage, setOpenImage] = useState<boolean>(false)


	const fetchUser = async () => {
		const userData = await currentUser();
		if(userData){
			setUpdatedUser(userData)
		}
	};

	const userFetch = async() => {
		const userData = await getUserByTeacherId()
		if(userData){
			setUser(userData)
		}
	}
	

	useEffect(() => {
		userFetch()
		fetchUser()
	},[])

	const form = useForm({
		defaultValues: {
			name: user?.userInfo.name || "",
			surname: user?.userInfo.surname || "",
			bio: user?.teacherInfo.aboutMe || "",
			prise: user?.teacherInfo.prise || 3
		},
	});

  useEffect(() => {
    form.reset({
      name: user?.userInfo.name|| "",
      surname: user?.userInfo.surname || "",
      bio: user?.teacherInfo.aboutMe || "",
			prise: user?.teacherInfo.prise || 3
    });
  }, [user, form]);

  const onSubmit = (values: any) => {
		startTransition(async () => {
			try {
				const userUpdateResult = await updateUser(values.name, values.surname);
				const teacherUpdateResult = await updateTeacher(values.bio, values.prise);
	
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
	if(!updatedUser){
		return
	}
	
	if(!user){
		return
	}

	return(
		<>
		<ToastContainer
        position="bottom-left"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
		<div className="w-full bg-white rounded-xl shadow-lg p-6 mt-5">
			<div className="h-10 mb-2">
				<h1 className="text-3xl font-semibold text-[#835BD2]">Настройки</h1>
			</div>
			<div className="w-full h-[1px] bg-gray-100 mt-3 mb-2 "></div> 
				<div className="flex justify-between flex-col md:flex-row">
					<div className="flex flex-col items-start">
						<div className="w-[300px] max-h-[300px] flex flex-col justify-center items-center gap-1 p-2 pb-3 border border-gray-100 shadow-md rounded-sm ">
							<h1 className="text-xl font-semibold text-[#835BD2]">Изображение профиля</h1>
							<div className="w-[180px] h-[180px]">
								{user?.userInfo.image && <Image width={1000} height={1000} src={user.userInfo.image} alt="Profile Picture" className="w-full max-h- rounded-full" />}
							</div>
							<Button 
								className="text-sm font-semibold p-5 mt-3"
								variant='violetSelect'
								onClick={() => setOpen(true)}
							>
								Измнить
							</Button>
						</div>
						<div className="border border-gray-100 rounded-lg p-2 min-w-[300px] bg-white shadow-lg mt-3">
							<h1 className="text-lg font-medium text-[#835BD2] text-center">Галерея изображений</h1>
							<div>
								{user.teacherInfo.images.length > 0 
								?
								<div className="relative pb-11">
									<div className="min-h-[213px] relative grid grid-cols-3 gap-1 items-center justify-center">
										{user.teacherInfo.images.map((data) => (
											<div key={data} className="border shadow-sm" onClick={() => {
												setActiveImage(data)
												setOpenImage(true)
											}}>
												<Image src={data} alt="galary" width={100} height={100} className="w-[100px] h-[100px]"/>
											</div>
										))}
									</div>
									<Button 
										className="w-full font-medium absolute bottom-0" 
										variant={"violetSelect"}
										onClick={() => {setTeacherOpen(true)}}
									>
										Загрузить изобаржения
									</Button>
								</div>
								:
								<div className="min-h-[213px] relative flex items-center justify-center">
									<Skeleton className="h-[150px] mb-12 flex items-center justify-center w-full text-center text-gray-400 font-semibold">
										<p>Здесь могут быть<br/> ваши изображения..</p>
									</Skeleton>
									<Button 
										className="w-full font-medium absolute bottom-0" 
										variant={"violetSelect"}
										onClick={() => {setTeacherOpen(true)}}
									>
										Загрузить изобаржения
									</Button>
								</div>
							}
							</div>
						</div>
					</div>
					<ChangePhoto open={open} setOpenModal={setOpen} user={updatedUser} visov={userFetch} />
					<div className="md:w-[70%] w-full md:px-5 px-0">
						<Form {...form}>
							<form 
							className="space-y-3 flex flex-col"
							onSubmit={form.handleSubmit(onSubmit)}>
								<div className="grid flex-flex-col text-lg text-gray-600">
									<FormField 
										control={form.control}
										name="name"
										render={({ field }) =>
											(
											<FormItem className="flex justify-between items-center w-full">
												<FormLabel className="text-base flex font-semibold text-[#835BD2] w-[10%] pt-2">Имя</FormLabel>
												<FormControl className="w-[75%] h-10">
													<Input 
														className="transition-all placeholder:text-gray-200 rounded-lg text-gray-500 border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
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
												<FormLabel className="text-base font-semibold text-[#835BD2] w-[10%] pt-2">Фамилия</FormLabel>
												<FormControl className="w-[75%] h-10">
													<Input 
													className="transition-all placeholder:text-gray-200 text-gray-500 rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
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
												<FormLabel className="text-base font-semibold text-[#835BD2] w-[10%] pt-2 text-nowrap">Обо мне</FormLabel>
												<FormControl className="w-[75%] min-h-[130px]">
													<Textarea 
													className="transition-all placeholder:text-gray-200 text-gray-500 rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
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
										name="prise"
										render={({ field }) => (
											<FormItem className="flex justify-between items-center">
												<FormLabel className="text-base font-semibold text-[#835BD2] w-[10%] pt-2">Цена за урок</FormLabel>
												<FormControl className="w-[75%] h-10">
													<Input 
													className="transition-all placeholder:text-gray-200 text-gray-500 rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
													{...field}
													type="number"
													placeholder='899'
													readOnly
													onChange={event => field.onChange(+event.target.value || null)}
													disabled={isPending}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
									<div className="w-full h-[1px] bg-gray-100 mt-3 mb-1"></div>
									<div className="flex items-center justify-center mt-3">
										<LanguageBox/>
									</div>
								</div>
								<Button
									disabled={isPending}
									variant="violetSelect"
									type="submit"
									className="font-semibold"
									onClick={
										() => {
											const notify = () => toast(
												<p>Данные успешно обновлены</p>
											);
											notify();
										}
									}
								>
									Сохранить
								</Button>
							</form>
						</Form>
					</div>
				</div>
		</div>
		<AddImagesToTeacher open={teacherOpen} setOpenModal={setTeacherOpen} teacherId={user?.teacherId} visov={userFetch} />
		<ImageWatch openModal={openImage} setOpenModal={setOpenImage} activeImage={activeImage} images={user.teacherInfo.images} teacherId={user.teacherId}/>
	</>
	)
}

export default SettingsPage