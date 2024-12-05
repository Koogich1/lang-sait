"use server"

import { db } from '@/lib/db'

const fetchCustomCourse = async(courseId: string) => {
	return await db.customCourse.findFirst({
		where:{
			id: courseId
		}
	})
}

export default fetchCustomCourse