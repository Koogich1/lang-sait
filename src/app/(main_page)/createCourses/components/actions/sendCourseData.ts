'use server'

import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

type Props = {
	name: string;
	aboutCourse: string;
	language: string;
	photoUrl: string;
}

const sendCourseData = async({name, aboutCourse, language, photoUrl}: Props) => {
	const user = await currentUser()
	if(!user){
		return
	}
	console.log(name, language, aboutCourse, user.id)
	try{
		await db.courseData.create({
			data:{
				userId: user.id,
				name: name,
				aboutCourse: aboutCourse,
				language: language,
				photoUrl: photoUrl,
			}
		})
	}catch(e){
		console.log(e)
	}
}

export default sendCourseData