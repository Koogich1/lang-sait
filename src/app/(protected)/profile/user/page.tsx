"use server"

import CardProfile from "../_components/card-profile"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"

const UserProfile = async () => {
	const user = await currentUser()

	return(
		<div>
			<div>
				<Header 
					header="Профиль"
				/>
			</div>
			<CardProfile
			user={user}
			/>
		</div>
	)
}

export default UserProfile