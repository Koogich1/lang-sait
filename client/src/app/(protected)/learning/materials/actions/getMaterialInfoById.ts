"use server"

import { db } from '@/lib/db'

const getMaterialInfoById = async(id:string) => {
	return await db.courseData.findUnique({
		where:{
			id: id
		}
	})
}

export default getMaterialInfoById