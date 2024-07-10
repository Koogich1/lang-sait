"use client"

import { useEffect, useState } from "react"
import CardProfile from "../_components/card-profile"
import Header from "../_components/header"
import { currentUser } from "@/lib/auth"
import type { ExtendedUser } from "@/next-auth"
import { ClipLoader } from "react-spinners"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const UserProfile = () => {
	const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
		const fetchUser = async () => {
			const user = await currentUser();
			if (user) {
				setUser(user); 
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

	return(
		<div>
			<div>
				<Header 
					header="Профиль"
				/>
			</div>
			<CardProfile
			/>
			<Link href={"/chats"}>
				<Button>
					Чат
				</Button>
			</Link>
		</div>
	)
}

export default UserProfile