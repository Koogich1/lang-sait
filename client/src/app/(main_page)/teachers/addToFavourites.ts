"use server"

import { getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"

const AddToFavourites = async(teacherId: string) => {
	const user = await currentUser()
	if(!user?.id){return}
	const userById = await getUserById(user?.id)

	if(!userById?.favourites){
		return
	}

	const updatedFavourites = [...userById?.favourites, teacherId]

	await db.user.update({
		where: {
			id: userById?.id,
		},
		data: {
			favourites: updatedFavourites
		}
	})
}

export async function gettAllFavouritesTeachers() {
	const user = await currentUser()
	if(!user?.id){return}
	const userById = await getUserById(user?.id)

	if(!userById?.favourites){
		return
	}

	return(userById.favourites)
}

export default AddToFavourites