'use client'

import Katalog from './katalog/katalog';
import Personal from './personal/personal';
import { FaInfo } from "react-icons/fa6";
import React, { useEffect, useState } from 'react';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { User } from '@prisma/client';
import { currentUser } from '@/lib/auth';

const Page = () => {
	const [selectedMenuItem, setSelectedMenuItem] = useState("personal");

  const handleMenuItemClick = (menuItem:any) => {
    setSelectedMenuItem(menuItem);
  };

	return (
    <div className='w-full p-6 bg-white text-gray-600 rounded-xl shadow-lg mt-3'>
      <h1 className='text-2xl font-bold'>
        Обучение
      </h1>
      <ul className='flex text-lg font-semibold mt-4'>
        <li 
					onClick={() => handleMenuItemClick('personal')}
					className={`
						${selectedMenuItem === "personal" ? "border-b-2 border-purple-600" : ""}
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg flex items-center gap-2
					`}
				>
						<h1>Мои курсы </h1>
						<HoverCard>
							<HoverCardTrigger asChild>
								<div className='w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center'>
								<FaInfo className='text-gray-600 text-xs'/>
								</div>
							</HoverCardTrigger>
							<HoverCardContent className='text-sm font-medium text-gray-400'>
								Окно, где вы можете <span className='font-semibold text-gray-500'>создавать</span> и <span className='font-semibold text-gray-500'>редактировать</span> уже созданные вами курсы!
							</HoverCardContent>
						</HoverCard>
				</li>
        <li 
					onClick={() => handleMenuItemClick('katalog')}
					className={`
						${selectedMenuItem === "katalog" ? "border-b-2 border-purple-600" : ""} 
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg
					`}
				>	
					Каталог
				</li>
      </ul>
			<div className='w-full h-[1px] bg-gray-200'></div>
      {selectedMenuItem === 'katalog' && <Katalog />}
      {selectedMenuItem === 'personal' && <Personal />}
    </div>
  );
}

export default Page