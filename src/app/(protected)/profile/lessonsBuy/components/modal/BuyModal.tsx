"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import buyLessons from "../buyLessons"
import { IoCloseOutline } from "react-icons/io5"

 
const FormSchema = z.object({
  quantity: z.string().min(0, {
		message:"Нельзя купить меньше одного урока!)"
  }),
})
 

type Props = {
	teacherId: string | undefined,
	userId: string | undefined,
	lessons: number | undefined,
	name: string | null | undefined,
	surname: string | null | undefined,
	prise: number | undefined,
}



const BuyModal = ({teacherId, userId, lessons, name, surname, prise}: Props) => {
	const [payValue, setPayValue] = useState(0)
	const [open, setOpen] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
		defaultValues: {
			quantity:""
		}
  })

	if(!prise){return}

	const firstPrise = prise
	const secondPrise = Math.round(prise * 0.95) //скида 10%
	const thirdPrise = Math.round(prise * 0.85) //скида 10%

	const { formState: { errors } } = form;

	function onSubmit(data: z.infer<typeof FormSchema>) {
		if (+data.quantity === 0) {
			form.setError("quantity", {
					type: "manual",
					message: "Количество должно быть больше 0"
			});
			return;
		}
		if(!teacherId){
			return
		}
		buyLessons({ teacherId, lessons: data.quantity })
		setOpen(false)
  }


	return (
		<Dialog open={open}>
			<DialogTrigger>
				<div 
					className="text-base bg-[#835BD2] p-[0.5rem] flex w-[130px] transition-all justify-center items-center font-semibold cursor-pointer hover:bg-[#6d4baf] text-white rounded-lg"
					onClick={() => {setOpen(true)}} //Логика покупки
				>
					<h1>Приобрести</h1>
				</div>
			</DialogTrigger>
				<DialogContent>
						<div 
							className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
							onClick={() => {setOpen(false)}}
						>
							<IoCloseOutline  className="text-2xl text-white"/>
						</div>	
					<DialogHeader>
					<DialogTitle className="text-xl font-bold text-[#835BD2]">{name} {surname}</DialogTitle>
					</DialogHeader>
					<DialogDescription />
					<h1 className="text-base font-semibold text-gray-500 mt-1"><span>Куплено занятий: </span><span className="h-6 w-6 bg-gradient-to-tr from-violet-600 to-indigo-600 p-1 px-2 text-white rounded-lg">{lessons}</span></h1>
					<div className="flex items-center justify-start gap-3 relative">
						<h1 className="text-base font-normal text-gray-500">- Цена за урок:</h1>
						<div className="text-base font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md transition-all">{firstPrise}</div>
					</div>
					<div className="text-sm text-center flex justify-between items-center">
						<h1 className="text-base font-normal text-gray-500">- При покупке пакета уроков:</h1>
						<div className="text-base  relative font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md transition-all">
							<p className="absolute text-sm top-0 right-0 w-full mt-[-20px] text-[#835BD2] font-semibold">от 5 шт</p>
							{secondPrise}
						</div>
						<div className="text-base relative font-semibold bg-gradient-to-tr from-violet-600 to-indigo-600 text-white p-2 px-8 rounded-md transition-all">
							<p className="absolute top-0 right-0 mt-[-20px] mr-[-10px] text-3xl">🔥</p> 
							<p className="absolute text-sm top-0 right-0 w-full mt-[-20px] text-[#835BD2] font-semibold">от 15 шт</p>
							{thirdPrise}
						</div>
					</div>
					<Form {...form}>
						<div className="w-2/3 space-y-6"> {/* Изменили <form на <div */}
							<form onSubmit={form.handleSubmit(onSubmit)}> 
								<FormField
									control={form.control}
									name="quantity"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="text-base font-semibold text-gray-500">Количество занятий</FormLabel>
											<FormControl>
											<Input
													placeholder="Введите число занятий"
													{...field} // Передача связей от react-hook-form
													onChange={(e) => {
															const value = parseInt(e.target.value) || 0; // Преобразование в число
															field.onChange(e); // Обновление значения поля через react-hook-form
															if (value < 5) {
																	setPayValue(firstPrise);
															} else if (value < 15) {
																	setPayValue(secondPrise);
															} else {
																	setPayValue(thirdPrise);
															}
													}}
											/>
											</FormControl>
											<FormDescription>
											</FormDescription>
											<FormMessage>
												{errors.quantity && errors.quantity.message}
												<Button type="submit" variant='violetSelect' className="text-medium transition-all text-base text-white">Оплатить {+field.value > 0 && `${payValue * parseInt(field.value, 10)}₽` || ``}</Button>
											</FormMessage>
										</FormItem>
									)}
								/>
							</form>
						</div>
					</Form>
			</DialogContent>
		</Dialog>
	)
}

export default BuyModal