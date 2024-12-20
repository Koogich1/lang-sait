import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Corean = () => {
	return (
		<div className="bg-[#ffe2ef] max-w-[700px] p-4 mt-5 gap-3 overflow-hidden relative min-h-[210px] flex flex-col justify-between rounded-xl shadow-lg">
				<Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
				<h1 className="text-[#b82761] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
					КОРЕЙСКИЙ ЯЗЫК
				</h1>
				<div className="z-50 text-[#b82761] text-lg font-medium leading-6" style={{fontFamily: "Belepotan"}}>
					<p>- Уровень: Начальный HSK1 - Продвинутый</p>
					<p>- Сроки изучения: 6 месяцев </p>
					<p>- нулевой и/или начальный уровнень</p>
				</div>
				<Link href={"/"} className="z-50">
					<Button  className="z-100 w-[150px] bg-white text-[#b82761] text-base font-semibold hover:bg-[#b82761] hover:text-white">
						Подробнее
					</Button>
				</Link>
		</div>
	)
}

export default Corean