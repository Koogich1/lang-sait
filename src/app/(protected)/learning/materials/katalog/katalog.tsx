import React from 'react'
import FilterMaterials from '../../components/modal/filterMaterials'
import MaterialsBox from './materialsBox'
import { HiMagnifyingGlass } from "react-icons/hi2";

const Katalog = () => {
	return (
		<div className='min-h-[70vh] flex flex-col'>
			<div className='w-full flex justify-between h-10 items-center mt-3 gap-3'>
				<input
					type="text"
					className="w-full h-12 px-3 transition-all rounded-lg border ring-[#cebeef] border-gray-300 focus:outline-none focus:ring focus:border-[#835BD2]"
					placeholder="Поиск курсов и уроков"
				/>
				<div className='h-12 w-16 rounded-lg bg-[#b493f5] hover:bg-[#835BD2] transition-all cursor-pointer'>
					<HiMagnifyingGlass />
				</div>
				<FilterMaterials />
			</div>
			<MaterialsBox />
		</div>
	)
}

export default Katalog