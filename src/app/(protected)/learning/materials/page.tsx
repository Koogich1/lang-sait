'use client'

import Katalog from './katalog/katalog';
import Personal from './personal/personal';

import React, { useState } from 'react';

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
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg
					`}
				>
					Личные
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