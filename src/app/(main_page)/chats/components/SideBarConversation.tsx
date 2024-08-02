"use client"

import useConversation from '@/actions/useConversation';
import { FullConversationType } from '@/types'
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { HiMiniUserPlus } from 'react-icons/hi2';
import ConversationBox from './conversationBox';

interface ConversationListProps {
	initialItems: any;
}

const SideBarConversations = ({initialItems}: ConversationListProps) => {
	const[items, setItems] = useState(initialItems)
	const router = useRouter()

	const {conversationId, isOpen} = useConversation()
	
	return (
		<div className='bg-white rounded-lg shadow-md w-1/4 p-3 flex flex-col'>	
			<div className='flex justify-between items-center'>
				<div className='flex justify-between text-xl font-bold text-gray-600'>
					Сообщения
				</div>
				<div>
					<div className='h-8 w-8 bg-gray-100 flex items-center justify-center rounded-full'>
						<HiMiniUserPlus size={20} className='text-gray-600'/>
					</div>
				</div>
			</div>
			<div>
				{items.map((item:any, key:any) => (
					<div key={key}>
						<ConversationBox
						data={item.id}
						selected={conversationId === item.id}
						/>
					</div>
				))}
			</div>
    </div>
	)
}

export default SideBarConversations