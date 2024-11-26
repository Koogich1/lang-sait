'use server'

import { db } from "@/lib/db"
import { languagePrefers } from "@prisma/client"

type Props = {
	level: string,
	prefers: languagePrefers | null,
	languageId: string,
}

const updateLanguage = async({level, prefers, languageId}: Props) => {
	await db.language.update({
		where:{
			id: languageId,
		},
		data:{
			level: level,
			prefers: prefers
		}
	})
}

export default updateLanguage