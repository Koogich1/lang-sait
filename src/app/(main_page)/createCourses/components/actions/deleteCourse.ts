"use server"

import { db } from "@/lib/db"

const deleteCourse = async(courseId: string) => {
	const deleteData = await db.courseData.delete({
		where:{
			id: courseId
		}
	})
	try{
		return deleteData
	} catch(e){
		console.log(e)
	}
}

export default deleteCourse