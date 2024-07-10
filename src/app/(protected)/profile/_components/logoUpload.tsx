"use client"

import { currentUser } from '@/lib/auth';
import uploadFile from './uploadFile';
import { useEffect, useState } from 'react';
import { ExtendedUser } from '@/next-auth';


const LogoUpload = () => {
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

  if(!user)return

	return(
		<div className='w-full h-full'>
			{`https://storage.yandexcloud.net/langschoolacynberg/images/avatar_${user.id}.jpg`}
			<img src={`https://storage.yandexcloud.net/langschoolacynberg/images/avatar_${user.id}.jpg`} alt="Profile Picture" className="w-full h-full rounded-full" width={100} height={100}/>
		</div>
	)
}

export default LogoUpload