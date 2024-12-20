"use client"

import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; 
import { LoginSchema } from "@/app/schemas";
import ReCAPTCHA from "react-google-recaptcha";
import {
    Form,
    FormControl,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { CardWrapper } from './card-wrapper';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [error, setError] = useState<string | undefined>('');
    const [success, setSuccess] = useState<string | undefined>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

    const boxRefs = [useRef(null), useRef(null), useRef(null)]; // Массив рефов для кубов

    // Переносим анимацию в useEffect
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
    }, []); // Оставьте пустой массив зависимостей, чтобы анимация происходила один раз при монтировании

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        
        if (!recaptchaValue) {
            setError("Пожалуйста, пройдите проверку reCAPTCHA.");
            return; // Проверка, если reCAPTCHA не пройдена
        }

        const finalValues = {
            ...values,
            recaptcha: recaptchaValue // Добавление значения reCAPTCHA к значениям формы
        };

        startTransition(() => {
            login(finalValues, callbackUrl)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    }
                    if (data?.success) {
                        form.reset();
                        setSuccess(data.success);
                    }
                    if (data?.twoFactor) {
                        setShowTwoFactor(true);
                    }
                })
                .catch(() => setError("Что-то пошло не так!"));
        });
    };

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
        throw new Error("RECAPTCHA_SITE_KEY не установлена в переменных окружениях.");
    }

    return (
        <CardWrapper
            headerLabel="Acyberg"
            backButtonLabel='Нет аккаунта?'
            backButtonHref='/auth/register'
            showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full text-[#835BD2]">
                    <div className="space-y-4">
                        {showTwoFactor &&
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem className="transition-all flex items-center justify-center flex-col">
                                        <FormLabel className="text-center leading-5 pb-2 font-light text-base">Введите <span className="font-semibold">код</span>, который был <span className="font-semibold">отправлен на вашу почту!</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-[#c9b0fa] placeholder:text-gray-300 text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
                                                disabled={isPending}
                                                placeholder="12345678"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        }
                        {!showTwoFactor &&
                            <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem ref={boxRefs[0]} className="opacity-0">
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="lang-school@mail.com"
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
                                        <FormItem ref={boxRefs[1]} className="opacity-0">
                                            <FormLabel>Пароль</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    disabled={isPending}
                                                    placeholder="******"
                                                    className="border-[#c9b0fa] text-[#835BD2] focus:border-[#835BD2] focus:ring-2 focus:ring-[#c9b0fa] transition duration-300 ease-in-out"
                                                    type="password"
                                                />
                                            </FormControl>
                                            <Button variant='info' className="border-none p-0 m-0 h-1 pt-5 hover:underline">
                                                <Link href='/auth/reset'>Забыли пароль?</Link>
                                            </Button>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        }
                        {showTwoFactor ? "" :
                        
                        <ReCAPTCHA // Убираем реф, так как не нужен для v2
                            sitekey={siteKey}
                            onChange={setRecaptchaValue} // Устанавливаем значение при успешном прохождении reCAPTCHA
                            size="normal" // Устанавливаем видимую капчу
                            className=""
                        />
                        
                        }
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button 
                            ref={boxRefs[2]}
                            variant="violetSelect" 
                            className="w-full font-semibold text-sm opacity-0"
                            disabled={isPending}
                        >
                            {showTwoFactor ? "Подтвердить" : "Войти"}
                        </Button>
                    </div>
                </form>
            </Form>
        </CardWrapper>
    );
};
