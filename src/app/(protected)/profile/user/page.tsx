"use client"

import { useEffect, useState } from "react"
import CardProfile from "../_components/card-profile"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"
import type { ExtendedUser } from "@/next-auth"
import { ClipLoader } from "react-spinners"
import { auth } from "@/auth"
import { useRouter } from "next/navigation"

const UserProfile = () => {
	const [user, setUser] = useState<ExtendedUser | null>(null);
	const router = useRouter()

  useEffect(() => {
		const fetchUser = async () => {
			const userinfo = await currentUser();
			if(userinfo) {
				setUser(userinfo); 
			}
		};
	
		fetchUser();
	}, []);

  if (!user) {
    return(
			<div className="w-full h-[100vh] flex items-center justify-center">
				<ClipLoader color="#835BD2" size={100}/>
			</div>
		)
  }

	if(user.role === "MODERATOR"){
		router.push("/createCourses")
	}

	return(
		<div>
			<div>
				<Header 
					header="Профиль"
				/>
			</div>
			<CardProfile
			/>
		</div>
	)
}

export default UserProfile