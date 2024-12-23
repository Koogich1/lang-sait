'use server'

import { sendEmailVerification } from "@/lib/mail"

type Props = {
	email: string, userId: string
}

const sendVerification = async({email, userId}: Props) => {
	sendEmailVerification(email, userId)
	
}

export default sendVerification