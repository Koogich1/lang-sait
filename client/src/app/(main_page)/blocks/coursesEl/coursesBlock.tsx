"use client"

import { Button } from "@/components/ui/button"
import "../../../../app/globals.css"
import Image from "next/image"
import Link from "next/link"
import "./moveFree.css"
import Chinesee from "./languages/chinesee"
import Corean from "./languages/corean"
import English from "./languages/English"
import { AiFillLike } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaMoneyBillTrendUp } from "react-icons/fa6";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IoIosWarning } from "react-icons/io"

const CoursesBlock = () => {
	return (
		<div className="min-h-[600px] h-auto mt-8">
			<ul className="hidden md:flex gap-2 max-w-[] border-b border-gray-100 pb-5">
				<li>
					<Button variant='menu' className="bg-[#835BD2] rounded-lg font-medium text-white shadow-sm hover:bg-[#6949a9]">
						<div className="flex gap-1 items-center">
							<IoIosWarning className="text-green-500 text-xl"/>
							<p>Хиты</p>
						</div>
					</Button>
				</li>
				<li>
					<Button variant='menu' className="text-[#835BD2] rounded-lg font-medium shadow-sm border border-[#835BD2]">
						<div className="flex gap-1 items-center">
							<Image src={"/new.png"} alt="new" width={50} height={50} className="w-5 h-5" />
							<p>Новые курсы</p>
						</div>
					</Button>
				</li>
				<li>
					<Button variant='menu' className="text-[#835BD2] rounded-lg font-medium shadow-sm border border-[#835BD2]">
						<div className="flex gap-1 items-center">
							<AiFillLike className="text-blue-500"/>
							<p>Рекомендуем</p>
						</div>
					</Button>
				</li>
				<li>
					<Button variant='menu' className="text-[#835BD2] rounded-lg font-medium shadow-sm border border-[#835BD2]">
						<div className="flex gap-1 items-center">
							<FaPeopleGroup className="text-gray-400"/>
							<p>Выбор аудитории</p>
						</div>
					</Button>
				</li>
				<li>
					<Button variant='menu' className="text-[#835BD2] rounded-lg font-medium shadow-sm border border-[#835BD2]">
						<div className="flex gap-1 items-center">
							<FaMoneyBillTrendUp className="text-yellow-400"/>
							<p>Пакет курсов</p>
						</div>
					</Button>
				</li>
			</ul>
			<Select>
				<SelectTrigger className="w-[200px] md:hidden border-[#835BD2] text-[#835BD2] text-base font-medium">
					<SelectValue placeholder="Хиты"/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="TOP" className="text-base flex flex-row">
						<div className="flex gap-1 items-center">
							<IoIosWarning className="text-green-500 text-xl"/>
							<p>Хиты</p>
						</div>
					</SelectItem>
					<SelectItem value="NEWCOURSES" className="text-base">
						<div className="flex gap-1 items-center">
							<Image src={"/new.png"} alt="new" width={50} height={50} className="w-5 h-5" />
							<p>Новые курсы</p>
						</div>
					</SelectItem>
					<SelectItem value="RECOMENDED" className="text-base">
						<div className="flex gap-1 items-center">
							<AiFillLike className="text-blue-500"/>
							<p>Рекомендуем</p>
						</div>
					</SelectItem>
					<SelectItem value="PEAPLECHOOSE" className="text-base">
						<div className="flex gap-1 items-center">
							<FaPeopleGroup className="text-gray-400"/>
							<p>Выбор аудитории</p>
						</div>
					</SelectItem>
					<SelectItem value="POCKET" className="text-base">
						<div className="flex gap-1 items-center">
							<FaMoneyBillTrendUp className="text-yellow-400"/>
							<p>Пакет курсов</p>
						</div>
					</SelectItem>
				</SelectContent>
			</Select>	
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5">
				<Chinesee />
				<Corean />
				<English />
			</div>
		</div>
	)
}

export default CoursesBlock