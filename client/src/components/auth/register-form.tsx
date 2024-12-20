"use client";

import * as z from "zod";
import { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { CardWrapperReg } from './card-wrapper-reg';
import { RegisterSchema } from "@/app/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import ReCAPTCHA from "react-google-recaptcha";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { firstTimeLogin } from "@/actions/firstTimeLogin";

const RegisterForm = () => {
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();
    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [registerForm, setRegisterForm] = useState(true)

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            surname: "",
            name: "",
        },
    });

    const boxRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ]; // Массив рефов для элементов формы

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");

        startTransition(() => {
            register(values)
                .then((data: any) => {
                    setError(data.error);
                    setSuccess(data.success);
                    if (data.success) {
                        router.push('/profile/user');
                    }
                });
        });
        setRegisterForm(false)
    };

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        throw new Error("RECAPTCHA_SITE_KEY не установлена в переменных окружениях.");
    }

    useEffect(() => {
        const timeline = gsap.timeline();
        
        // Скрываем кубы перед их появлением
        boxRefs.forEach(boxRef => {
            gsap.set(boxRef.current, { opacity: 0 });
        });

        boxRefs.forEach((boxRef, index) => {
            timeline.to(boxRef.current, { 
                opacity: 1, 
                duration: .5, 
                delay: index * 0.0001, // Задержка для последовательного появления
                ease: "power2.in" 
            });
        });
    }, []);


    return (
        <>
            <CardWrapperReg
            headerLabel={registerForm ? `Создание учетной записи` : "Вход в учетную запись"}
            backButtonLabel='Уже есть аккаунт'
            backButtonHref='/auth/login'
            showSocial
        >
            <div className="w-full mt-7 bg-[#fff] text-[#835BD2]">
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
                                    <FormItem ref={boxRefs[0]}>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isPending}
                                                {...field}
                                                placeholder="Дмитрий"
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
                                    <FormItem ref={boxRefs[1]}>
                                        <FormLabel>Фамилия</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isPending}
                                                {...field}
																								className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
                                    <FormItem ref={boxRefs[2]}>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                disabled={isPending}
                                                {...field}
                                                placeholder="LangSchool@mail.ru"
												className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
                                    <FormItem ref={boxRefs[3]}>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <Input 
																								className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
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
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <ReCAPTCHA
                            sitekey={siteKey}
                            onChange={setRecaptchaValue}
                            size="normal"
                            className="w-full"
                        />
                        <p className="text-gray-400 text-sm gap-2">
                            Нажимая кнопку подтвердить, вы принимаете 
                            <Link href="/politika_konfidentisalnosti">
                                <span className="text-[#835BD2] cursor-pointer hover:underline"> Политику конфиденциальности</span>
                            </Link>, а также 
                            <Link href="/soglasie_na_obrabotky_konfidencialnih_dannih">
                                <span className="text-[#835BD2] cursor-pointer hover:underline"> согласие на обработку персональных данных</span>
                            </Link>
                        </p>

                        <Button
                            type="submit"
                            className="w-full text-sm font-semibold"
                            variant="violetSelect"
                            disabled={!recaptchaValue}
                        >
                            Создать аккаунт
                        </Button>
                    </form>
                </Form>
            </div>
        </CardWrapperReg>
        </>
    );
}

export default RegisterForm;
