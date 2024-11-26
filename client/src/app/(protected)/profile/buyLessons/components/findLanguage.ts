"use server"

import { db } from "@/lib/db"

type Props = {
	userid: string,
	teacherId: string
}

const findLanguage = async({userid, teacherId}: Props) => {
	return await db.language.findFirst({
		where:{
			userId: userid,
			teacherId: teacherId
		}
	})
}

export default findLanguage