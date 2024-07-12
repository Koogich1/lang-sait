"use client"

import { useEffect, useState } from "react"
import getUserWithoutMe from "../getUserWithoutMe"
import UserBox from "./userBox"

type UserRole = "ADMIN" | "USER" | "TEACHER";

type User = {
  id: string;
  name: string;
  surname: string;
  email: string;
  emailVerified: string | null; // Update with appropriate type
  favourites: any[]; // Update with appropriate type
  image: string | null; // Update with appropriate type
  password: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  teacherId: string | null; // Update with appropriate type
  favouritesTeachers: string; // Update with appropriate type
  allUserImage: any[]; // Update with appropriate type
};

const UsersList = () => {
	const [users, setUsers] = useState<User[]>([]); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/user/allNM');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Ошибка получения данных пользователя:', error);
      }
    };

    fetchUser();
  }, []);

	return (
		<div className="h-full">
			{users && users.map((user:any) => (
				<UserBox
					key={user.id}
					data={user}
				/>
			))}
		</div>
	)
}

export default UsersList