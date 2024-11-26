import React from 'react'
import LeftPart from '../components/leftPart'
import RightPart from '../components/rightPart'

const page = ({params} : {params: {friendId:string}}) => {
	return (
		<div className='w-full flex gap-2 px-4'>
			<LeftPart />
			<RightPart friendId={params.friendId} />
		</div>
	)
}

export default page