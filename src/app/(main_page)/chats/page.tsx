"use client"

import React, { useEffect, useState } from 'react';
import MainHeader from '../header';
import EmptyState from './components/emptyState';
import SideBar from './components/SideBarUsers';

const page = () => {
  return (
    <div className='h-full w-full'>
      <MainHeader />
      <div className='w-full flex h-full px-[5%] gap-5 p-5'>
        <SideBar />
        <EmptyState />
      </div>
    </div>
  );
};

export default page;