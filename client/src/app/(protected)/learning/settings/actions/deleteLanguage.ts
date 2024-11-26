"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const deleteLanguage = async(languageId: string) => {
	await db.language.delete({
		where:{
			id: languageId
		}
	})
}

export default deleteLanguage