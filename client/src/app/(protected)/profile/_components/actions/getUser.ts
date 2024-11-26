"use server"

import { getUserById } from '@/data/user'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'

const GetUser = async() => {

	const curentUser = await currentUser()
	if(!curentUser){return}

	const teacherForUser = await db.teacher.findFirst({
		where: {
			userId: curentUser.id
		}
	})

	if(!teacherForUser){
		return
	}

	return {
		user:{
			id: curentUser?.id,
			name: curentUser?.name,
			surname: curentUser?.surname,
			mail: curentUser?.email,
			favourites: curentUser?.favourites,
			image: curentUser?.image,
			role: curentUser.role,
			teacherUser:{
				id: teacherForUser?.id,
			}
		}
};
}

export default GetUser