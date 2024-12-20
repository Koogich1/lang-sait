'use server'

import { sendEmailWerification } from "@/lib/mail"

type Props = {
	email: string, userId: string
}

const sendVerification = async({email, userId}: Props) => {
	sendEmailWerification(email, userId)
	
}

export default sendVerification