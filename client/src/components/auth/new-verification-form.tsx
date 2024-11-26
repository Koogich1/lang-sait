"use client"

import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useCallback, useEffect, useState} from "react";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm= () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const searchParams = useSearchParams();

	const token = searchParams.get("token");
	
	const onSubmit = useCallback(()=> {
		if(success || error) return;

		if(!token){
			setError("Токен не существует")
			return
		};

		newVerification(token)
		.then((data) => {
			setSuccess(data.success)
			setError(data.error)
		})
		.catch(()=> {
			setError("Что-то пошло не так!")
		})
	}, [token, success, error])

	useEffect(()=> {
		onSubmit()
	}, [onSubmit])

 return(
	<CardWrapper
		headerLabel="Подтвердите Email, письмо подтверждения отправлено на вашу почту!"
		backButtonLabel="Вернуться к авторизации" 
		backButtonHref="/auth/login"
	>
		<div className="flex items-center w-full justify-center">
			{!success && !error &&(
				<BeatLoader 
				className="p-5"
				/> 
			)}
			<FormSuccess message={success}/>
			{!success && (
				<FormError message={error}/>
			)}
		</div>
	</CardWrapper>
 )
}
