"use server"

import { db } from "@/lib/db"

const findLanguages = async(teacherId: string) => {
	const languages = await db.language.findMany({
		where:{
			teachers:{
				some:{
					id: teacherId
				}
			}
		}
	})
	return languages
}

export default findLanguages