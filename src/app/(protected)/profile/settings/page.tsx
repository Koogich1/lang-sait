"use client"

import * as  z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import _ from "lodash"

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
import { HiOutlineXMark } from "react-icons/hi2";

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
import uploadFile from "@/lib/file-storage";
import updateUrlImgForUsers from "@/actions/testServerUpdateUrl";
import userImg from "@/actions/getImageUser";

const SettingsPage = () => {
	const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [user, setUser] = useState<ExtendedUser | null>(null);

	const [fileUpload, setFileUpload] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
	const [accept, setAccept] = useState(false)
	const [open, setOpen] = useState(false)

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
			setAccept(true)
			setOpen(true)
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
				if(!user?.id){
					return
				}
				const randNum = _.random(1000, 20000)
        const base64Data = reader.result as string; // Получаем base64 строку
        uploadFile(base64Data, "images/", `avatar_${user?.id + randNum}.jpg`) // Вставьте имя файла
          .then((response) => {
						if(!user.id){
							return
						}
            console.log('Файл успешно загружен:', response);
            setFileUpload(`Файл успешно загружен`);
            setFileName(`avatar_${user?.id + randNum}.jpg`);
          })
          .catch((error) => {
            console.error('Ошибка при загрузке файла:', error);
            setFileUpload(`Ошибка при загрузке файла "avatar.jpg"`);
          });
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  useEffect(() => {
    if (fileName) {
      const updateProfilePhoto = async () => {
        await updateUrlImgForUsers(fileName);
      }
      updateProfilePhoto();
    }
  }, [fileName]);

  useEffect(() => {
    const fetchUserImage = async () => {
      const img = await userImg();
      if (!img) {
        return
      }
      setUrl(img)
    }
    fetchUserImage();
  }, [])

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
			<h1 className="text-sm font-semibold text-gray-600 mt-5">Изображение профиля</h1>
				<div className="w-[150px] h-[150px] mt-3">
					{url && <img src={url} alt="Profile Picture" className="w-full h-full rounded-full"/>}
				</div>
				<Button 
					className="text-sm font-semibold p-5 mt-3"
					variant='violetSelect'
					onClick={() => setOpen(true)}
				>
					Измнить
				</Button>
				<Dialog open={open}>
					<DialogContent className="p-5">
						<DialogTitle>
							Выберете изображение
						</DialogTitle>
						<DialogHeader>
							<h1>{fileUpload && <p className="font-extrabold">{fileUpload}</p>}</h1>
							<Input type="file" onChange={onFileChange} className="w-full h-20"/>
						</DialogHeader>
						{selectedFile && (
							<div className="flex justify-center relative">
								<img
									src={URL.createObjectURL(selectedFile)}
									alt="Выбранное изображение"
									className="object-cover h-[300px] w-[300px] rounded-full"
								/>
							</div>
						)}
						<Button
							onClick={() => {setOpen(false)}}
							className='absolute right-0 m-5 h-8 w-3 bg-red-500 hover:bg-red-600'
						>
							X
						</Button>
						<div className={`flex gap-3 justify-end}`}>
							<Button 
							onClick={handleUpload}
							disabled={accept ? false : true}
							>
								Подтвердить
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<Form {...form}>
					<form 
					className="space-y-3"
					onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid pt-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 text-lg text-gray-600">
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
						</div>
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