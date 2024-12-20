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

import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IoIosWarning } from "react-icons/io"
import { useState } from "react"
import { IoLanguage } from "react-icons/io5"
import { HiArrowDown } from "react-icons/hi"
import { RingLoader } from "react-spinners"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"

type Page = "Languages" | "NewCourses" | "Reccomended" | "PeapleChoose" | "Packet";

const FormSchema = z.object({
  Languages: z.string(),
  NewCourses: z.string(),
  Reccomended: z.string(),
  PeapleChoose: z.string(),
  Packet: z.string(),
})

const CoursesBlock = () => {
  const [activePage, setActivePage] = useState<Page>("Languages")
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  
  return (
    <div className="min-h-[600px] h-auto">
      <div className="flex text-gray-600 mt-3">
        <h1 className="text-2xl md:text-3xl font-medium">
          {activePage === "Languages" && "Доступные языки"}
          {activePage === "NewCourses" && "Наши курсы"}
          {activePage === "Reccomended" && "Советуем попробовать"}
          {activePage === "PeapleChoose" && "Аудитория предпочитает"}
          {activePage === "Packet" && "Выгодно и много"}
        </h1>
        <HiArrowDown className="text-2xl lg:text-3xl ml-2 mt-1"/>
      </div>
      <div className="border-b border-gray-100 pb-5">
				<ul className="hidden md:grid grid-cols-4 w-full lg:grid-cols-5 gap-2 mt-8">
					<li>
						<Button 
							variant='menu' 
							className={`rounded-lg font-medium border w-full text-white shadow-sm ${activePage === "Languages" ? 'border-green-600 bg-green-600 text-white hover:bg-green-700' : "text-green-600 border-green-600 hover:bg-green-100"}`}
							onClick={() => setActivePage("Languages")}
						>
							<div className="flex gap-1 items-center">
								<IoLanguage className={`text-xl ${activePage === "Languages" ? "text-white": "text-green-500"}`}/>
								<p>Языки</p>
							</div>
						</Button>
					</li>
					<li>
						<Button 
							variant='menu' 
							className={`rounded-lg font-medium shadow-sm w-full border ${activePage === "NewCourses" ? 'border-red-600 bg-red-600 text-white hover:bg-red-700' : "text-red-600 border-red-600 hover:bg-red-100"}`}
							onClick={() => setActivePage("NewCourses")}
						>
							<div className="flex gap-1 items-center">
								<Image src={"/new.png"} alt="new" width={50} height={50} className="w-5 h-5" />
								<p>Новые курсы</p>
							</div>
						</Button>
					</li>
					<li>
						<Button 
							variant='menu' 
							className={`rounded-lg font-medium shadow-sm w-full border ${activePage === "Reccomended" ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700' : "text-blue-600 border-blue-600 hover:bg-blue-100"}`}
							onClick={() => setActivePage("Reccomended")}
						>
							<div className="flex gap-1 items-center">
								<AiFillLike className="text-blue-500"/>
								<p>Рекомендуем</p>
							</div>
						</Button>
					</li>
					<li>
						<Button 
							variant='menu' 
							className={`rounded-lg font-medium shadow-sm border w-full ${activePage === "PeapleChoose" ? 'border-gray-600 bg-gray-600 text-white hover:bg-gray-700' : "text-gray-600 border-gray-600 hover:bg-gray-200"}`}
							onClick={() => setActivePage("PeapleChoose")}
						>
							<div className="flex gap-1 items-center">
								<FaPeopleGroup className="text-gray-400"/>
								<p>Аудитория</p>
							</div>
						</Button>
					</li>
					<li>
						<Button 
							variant='menu' 
							className={`rounded-lg font-medium shadow-sm border w-full ${activePage === "Packet" ? 'border-yellow-500 bg-yellow-500 text-white hover:border-yellow-700 hover:bg-yellow-700' : "text-yellow-600 border-yellow-600 hover:bg-yellow-100"}`}
							onClick={() => setActivePage("Packet")}
						>
							<div className="flex gap-1 items-center">
								<FaMoneyBillTrendUp className="text-yellow-400"/>
								<p>Пакет курсов</p>
							</div>
						</Button>
					</li>
				</ul>
				<Form {...form}>
					<form>
						<Select onValueChange={(value) => {
							switch(value) {
								case "LANGUAGES":
									setActivePage("Languages");
									break;
								case "NEWCOURSES":
									setActivePage("NewCourses");
									break;
								case "RECOMENDED":
									setActivePage("Reccomended");
									break;
								case "PEAPLECHOOSE":
									setActivePage("PeapleChoose");
									break;
								case "POCKET":
									setActivePage("Packet");
									break;
								default:
									break;
							}
						}}>
							<SelectTrigger className="w-[200px] md:hidden border-gray-400 text-gray-400 text-base font-medium mt-5">
								<SelectValue placeholder={
									<div className="flex gap-1 items-center">
										<IoLanguage className="text-green-500 text-xl"/>
										<p>Языки</p>
									</div>
								}/>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="LANGUAGES" className="text-base flex flex-row">
									<div className="flex gap-1 items-center">
										<IoLanguage className="text-green-500 text-xl"/>
										<p>Языки</p>
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
										<p>Аудитория</p>
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
					</form>
				</Form>
			</div>
      {activePage === "Languages" &&
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-5">
          <Chinesee />
          <Corean />
          <English />
        </div>
      }
      {
        activePage === "NewCourses" && 
        <div className="w-full h-[470px] flex items-center justify-center flex-col gap-2">
          <div className="text-gray-400 font-semibold text-lg">
            Пока курсов нет...
          </div>
          <RingLoader />
          <div className="text-gray-400 font-medium text-base">
            Обязательно сообщим вам о появлении новых курсов!
          </div>
        </div>
      }
      {
        activePage === "Reccomended" && 
        <div>
          <h1 className="text-xl font-medium text-pink-500 mt-2">Самый большой и проработанный материал на сайте:</h1>
          <Corean />
        </div>
      }
      {
        activePage === "PeapleChoose" && 
        <div className="w-full h-[460px] flex items-center justify-center flex-col gap-2">
          <RingLoader />
        </div>
      }
      { activePage === "Packet" &&
        <div className="w-full h-[460px] flex-col gap-2 mt-5">
          <div className="border-[2px] px-3 py-1 border-yellow-200 w-[450px] items-center flex flex-col rounded-lg">
            Выгодный пакет:
            <ul className="flex flex-col gap-2">
              <li className="text-base">при покупке 5+ уроков скидка состовляет...</li>
              <li>при покупке 10+ уроков скидка состовляет...</li>
              <li>при покупке 15+ уроков скидка состовляет...</li>
            </ul>
          </div>
        </div>
      }
    </div>
  )
}

export default CoursesBlock
