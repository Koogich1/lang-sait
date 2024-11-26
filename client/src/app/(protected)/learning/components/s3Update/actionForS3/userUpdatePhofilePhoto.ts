"use server"

import { db } from "@/lib/db"

const userUpdatePhofilePhoto = async(userId: string, s3FilePath: string) => {
	await db.user.update({
		where:{
			id: userId
		},
		data:{
			image: s3FilePath
		}
	})
}

export default userUpdatePhofilePhoto