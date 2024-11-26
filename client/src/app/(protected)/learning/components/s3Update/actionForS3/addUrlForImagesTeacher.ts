"use server"

import { db } from "@/lib/db"

const addUrlForImagesTeacher = async(teacherId: string, url: string) => {
	await db.teacher.update({
		where:{
			id: teacherId
		},
		data:{
			images:{
				push: url
			}
		}
	})
}

export default addUrlForImagesTeacher