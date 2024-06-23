import { Button } from "@/components/ui/button"
import "../../../../app/globals.css"
import Image from "next/image"
import Link from "next/link"
import "./moveFree.css"

const CoursesBlock = () => {
	return (
		<div className="max-w-[1000px] min-h-[600px] h-auto mt-8">
			<ul className="flex justify-start gap-2 border-gray-100">
				<li><Button variant='menu'>Хиты</Button></li>
				<li><Button variant='menu'>Новые курсы</Button></li>
				<li><Button variant='menu'>Рекомендуем</Button></li>
				<li><Button variant='menu'>Выбор аудитории</Button></li>
				<li><Button variant='menu'>Пакет курсов</Button></li>
			</ul>
			<div className="bg-[#f20520] max-w-[700px] p-4 mt-5 overflow-hidden relative min-h-[210px] flex flex-col justify-between rounded-xl shadow-lg">
				<Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
				<h1 className="text-[#f7e627] text-3xl z-50" style={{fontFamily: "Belepotan"}}>
					Китайский язык
				</h1>
				<div className="z-50 text-white" style={{fontFamily: "Belepotan"}}>
					<p>- Уровень: Начальный HSK1 </p>
					<p>- Сроки изучения: 6 месяцев </p>
					<p>- нулевой и/или начальный уровнень</p>
				</div>
				<Link href={"/"} className="z-50">
					<Button className="z-100 w-[150px] bg-white text-[#f20520] text-base font-semibold hover:bg-gray-200">
						Подробнее
					</Button>
				</Link>
					<div className="absolute right-[-65px] top-[30px] w-[300px]">
						<div className="absolute text-center flex items-center justify-center z-50 h-[50px] bg-[#f7e627] marquee">  {/* Добавлен класс marquee */}
							<h1 className="text-[#f20520] whitespace-nowrap text-xl z-50 track" style={{fontFamily: "Belepotan"}}> 
								SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE   SALE
							</h1>
						</div>
				</div>
			</div>
		</div>
	)
}

export default CoursesBlock