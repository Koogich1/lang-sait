"use server"

import { db } from "@/lib/db"

const findUserLanguages = async(userId: string) => {
	const languages = await db.language.findMany({
		where:{
			user:{
				some:{
					id: userId
				}
			}
		}
	})
	return languages
}

export default findUserLanguages