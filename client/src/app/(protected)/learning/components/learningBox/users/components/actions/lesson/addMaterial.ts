"use server"

import { db } from "@/lib/db";
import { BookedLesson, customCourse } from "@prisma/client";

type Props = {
	courseInfo: string;
	lesson: string;
}

const AddMaterial = async({courseInfo, lesson}: Props) => {

	console.log(courseInfo + "  " + lesson)

	try{
		const data = await db.bookedLesson.update({
			where:{
				id: lesson
			},
			data:{
				Materials:{
					push: courseInfo
				}
			}
		})
		if(data){
			return true
		}
		return false
	}catch(e){
		console.log(e)
		return false
	}
}

export default AddMaterial