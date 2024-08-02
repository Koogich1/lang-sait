import React from 'react'
import FilterMaterials from '../../components/modal/filterMaterials'
import MaterialsBox from './materialsBox'
import { HiMagnifyingGlass } from "react-icons/hi2";
import { RingLoader } from 'react-spinners';

const Katalog = () => {
	return (
		<div className='min-h-[70vh] flex flex-col'>
			<div className='flex flex-col items-center justify-center gap-5 text-xl font-bold min-h-[60vh] text-gray-400'>
				В разработке
				<RingLoader />
			</div>
		</div>
	)
}

export default Katalog