import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const English = () => {
	return (
		<div className='relative max-w-[700px]'>
			<Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-50px] z-10 w-[45%] bottom-[-20px]"/>
			<Image src={"/hat.png"} width={500} height={500} alt="dragonBg" className="absolute left-[-25px] z-50 w-[80px] top-[-10px] rotate-[340deg]"/>
			<div className="bg-[#4865d8] max-w-[700px] p-4 mt-5 overflow-hidden relative min-h-[210px] flex flex-col justify-between rounded-xl shadow-lg">
					<h1 className="text-white text-3xl z-50" style={{fontFamily: "Corean"}}>
						АНГЛИЙСКИЙ ЯЗЫК
					</h1>
					<div className="z-50 text-white text-lg font-medium leading-6" style={{fontFamily: "Corean"}}>
						<p>- Уровень: Начальный HSK1 </p>
						<p>- Сроки изучения: 6 месяцев </p>
						<p>- нулевой и/или начальный уровнень</p>
					</div>
					<Link href={"/"} className="z-50">
						<Button className="z-100 w-[150px] bg-[#2744b8] border-2 border-white text-white text-base font-semibold hover:bg-white hover:text-[#2744b8]" style={{fontFamily: "Corean"}}>
							Подробнее
						</Button>
					</Link>
			</div>
		</div>
	)
}

export default English