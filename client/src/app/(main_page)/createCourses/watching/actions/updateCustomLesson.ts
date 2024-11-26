"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"

type Props = {
	id: string;
	name: string;
	photoUrl?: string;
}

const updateCustomLesson = async({name, photoUrl, id} : Props) => {
	await db.customCourse.update({
		where:{
			id: id
		},
		data:{
			name: name,
			imageSrc: photoUrl,
		}
	})
}

export default updateCustomLesson