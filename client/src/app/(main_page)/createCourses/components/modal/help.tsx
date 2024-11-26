"use client"

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from "next/link";
import { useState } from "react"
import { FaPlus } from "react-icons/fa6"
import { IoCloseOutline } from "react-icons/io5";

const HelpModal = () => {
	const [ open, setOpen ] = useState(false)

	return (
		<Dialog open={open}>
			<DialogTrigger 
			className='flex gap-5 items-center h-8 p-2 bg-gray-100 rounded-sm border border-gray-200 cursor-pointer hover:bg-gray-200 transition-all font-semibold text-gray-400'
			onClick={()=> {setOpen(true)}}
			>
				Помощь<div className='w-6 h-6 rounded-full bg-white flex items-center justify-center'>?</div>
			</DialogTrigger>
				<DialogContent className="p-6">
					<DialogHeader>
					<DialogTitle className="text-xl font-bold text-gray-500">Это схема вашего расписания</DialogTitle>
					<DialogDescription>
					<div className="leading-6">Исходя из этой информации, ваше расписание автоматически создается и обновляется на троечную недель вперед. Это предоставляет вашим ученикам возможность видеть ваши доступные часы занятий. Чтобы сделать ваш график более гибким, вы можете легко добавить или удалить <Link href={"/learning/lesson"} className="bg-[#835BD2] p-1 border-purple-400 rounded-sm hover:bg-[#714fb7] text-white transition-all m-1">временные слоты на конкретные дни</Link>.</div>
						<div 
						className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
						onClick={() => {setOpen(false)}}
						>
							<IoCloseOutline  className="text-2xl text-white"/>
						</div>
					</DialogDescription>
					</DialogHeader>
					<div className="flex justify-between gap-3">
						<Button 
							variant='violetSelect' 
							className="text-base font-medium w-1/2"
							onClick={() => {setOpen(false)}}
						>Понятно!</Button>
						<Button variant='shadow2' className="w-1/2 text-base text-gray-400">Написать в поддержку</Button>
					</div>
			</DialogContent>
		</Dialog>
	)
}

export default HelpModal