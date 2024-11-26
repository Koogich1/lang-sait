"use client"

import { useParams } from 'next/navigation'
import LeftPart from '../components/leftPart'
import RightPart from '../components/rightPart'

const Page = () => {
	const { friendId } = useParams()

	return (
		<div className='w-full flex gap-2 px-4'>
			<LeftPart />
			<RightPart friendId={friendId as string} />
		</div>
	)
}

export default Page