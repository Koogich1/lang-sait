'use client'

import Users from './users/usersBox'
import Groups from './groups/groupBox'
import Applications from './applications/applications'

import React, { useState } from 'react';

const YourComponent = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("users");

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
					onClick={() => handleMenuItemClick('users')}
					className={`
						${selectedMenuItem === "users" ? "border-b-2 border-purple-600" : ""}
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg
					`}
				>
					Ученики
				</li>
        <li 
					onClick={() => handleMenuItemClick('groups')}
					className={`
						${selectedMenuItem === "groups" ? "border-b-2 border-purple-600" : ""} 
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg
					`}
				>	
					Группы
				</li>
        <li 
					onClick={() => handleMenuItemClick('applications')}
					className={`
						${selectedMenuItem === "applications" ? "border-b-2 border-purple-600" : ""}
						pb-2 hover:bg-gray-100 transition p-2 px-5 cursor-pointer rounded-t-lg
					`}
				>
					Заявки
				</li>
      </ul>
			<div className='w-full h-[1px] bg-gray-200'></div>
      {selectedMenuItem === 'users' && <Users />}
      {selectedMenuItem === 'groups' && <Groups />}
      {selectedMenuItem === 'applications' && <Applications />}
    </div>
  );
};

export default YourComponent;