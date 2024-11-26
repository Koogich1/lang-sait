"use client"

import { useEffect, useState } from 'react';
import userImg from '@/actions/getImageUser';
import Image from 'next/image';


const LogoUpload = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
		const fetchUser = async () => {
			const img = await userImg()
			if(img){
				setImage(img)
			}
		};
		fetchUser();
	}, []);

  if(!image)return

	return(
		<div className='w-full h-full'>
			<Image src={image.toString()} alt="Profile Picture" className="w-full h-full rounded-full" width={100} height={100}/>
		</div>
	)
}

export default LogoUpload