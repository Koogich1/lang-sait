"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { callStore } from '@/lib/useStore'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {
	open: boolean,
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function CallComponent ({open, setOpen}: Props) {
	const {active, setActive, callData, setCallData} = callStore(state => ({
		active: state.active,
		setActive: state.setActive,
		callData: state.callData,
		setCallData: state.setCallData
	}))
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{callData?.from.name}</DialogTitle>
					<div>
						{!active && (
							<div className='flex items-center justify-center my-2'>
								<Image src={callData?.from.profilePic ?? "https://storage.yandexcloud.net/langschoolacynberg/images/user.png"} alt={callData?.from.name ?? ""} width={100} height={100} className='rounded-full'/>
							</div>
						)}
						<div className='mt-10 flex justify-center items-center'>
							<div className='w-16 h-16 rounded-full bg-red-500 flex items-center justify-center'>
								<Phone strokeWidth={3} className='text-white' />
							</div>
						</div>
					</div>
				</DialogHeader>
				
			</DialogContent>
		</Dialog>
	)
}

export default CallComponent