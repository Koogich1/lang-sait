"use server"

import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db"

type Props = {
	name: string;
	aboutCourse?: string;
	photoUrl?: string;
}

const createLesson = async({name, aboutCourse, photoUrl} : Props) => {
	const user = await currentUser()
	if(user){
		await db.customCourse.create({
			data:{
				name: name,
				aboutCourse: aboutCourse,
				userId: user.id,
				imageSrc: photoUrl ?? ""
			}
		})
	}
}

export default createLesson