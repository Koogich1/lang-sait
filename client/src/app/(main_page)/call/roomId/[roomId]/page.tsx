"use client";

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useParams } from 'next/navigation';
import initializeSocket from '@/lib/socket';
import { User } from '@prisma/client';
import { currentUser } from '@/lib/auth';

const Room = () => {
	const { roomId } = useParams();

	


	

	return (
		<div className='z-[100] flex gap-2 mt-10 pb-20'>
			<div>
				<h2>Participants:</h2>
				<ul>
					
				</ul>
			</div>
		
		</div>
	);
};

export default Room;
