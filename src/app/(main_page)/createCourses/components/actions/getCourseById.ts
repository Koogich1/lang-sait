"use server"

import { db } from "@/lib/db"

const getCourseById = async(courseId:string) => {
	
	try {
    console.log('Fetching course with ID:', courseId);
    const data = await db.courseData.findUnique({
			where:{
				id: courseId
			}
		})
		return data
  } catch (error) {
    console.error('Error fetching course:', error);
  }
}

export default getCourseById