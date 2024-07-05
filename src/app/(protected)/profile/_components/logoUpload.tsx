"use client"

import { currentUser } from '@/lib/auth';
import uploadFile from './uploadFile';
import { useEffect, useState } from 'react';
import { ExtendedUser } from '@/next-auth';
import { getUserByEmail, getUserById } from '@/data/user';
import Image from 'next/image';

const LogoUpload = () => {
	const [user, setUser] = useState<ExtendedUser | null>(null);

  useEffect(() => {
		const fetchUser = async () => {
			const user = await currentUser();
			if(!user?.id){return}
			const userByEmail = await getUserById(user?.id)
			if (user) {
				setUser(userByEmail); 
			}
		};
	
		fetchUser();
	}, []);

	if(!user?.image){return}
	console.log(user.image.toString)

	return(
		<div>
			<Image src={user.image} alt='logo' width={100} height={100}/>
			{user.image}
		</div>
	)
}

export default LogoUpload