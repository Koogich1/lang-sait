'use server'

import { db } from "@/lib/db"
import { languagePrefers } from "@prisma/client"

type Props = {
	level: string,
	languageId: string,
}

const updateUserLanguage = async({level, languageId}: Props) => {
	await db.language.update({
		where:{
			id: languageId,
		},
		data:{
			level: level,
		}
	})
}

export default updateUserLanguage