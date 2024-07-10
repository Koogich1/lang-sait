"use client"

import { useEffect, useState } from "react"
import getUserWithoutMe from "../getUserWithoutMe"
import UserBox from "./userBox"

type UserRole = "ADMIN" | "USER" | "TEACHER"


const UsersList = () => {
	const [users, setUsers] = useState<{ 
    id: string;
    name: string | null;
    surname: string | null;
    email: string | null;
    emailVerified: Date | null;
    favourites: string[];
    image: string | null;
    password: string | null;
    role: UserRole;
    isTwoFactorEnabled: boolean;
    teacherId: string | null;
    favouritesTeachers: string;
  }[]>([]);

	useEffect(() => {
		const usersData = async() => {
			const fetchData = await getUserWithoutMe()
			if(fetchData){
				setUsers(fetchData)
			}
		}
		usersData()
	}, [])
	return (
		<div className="h-full bg-red-100">
			{users.map((user) => (
				<UserBox
					key={user.id}
					data={user}
				/>
			))}
		</div>
	)
}

export default UsersList