"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { IoCloseOutline } from "react-icons/io5"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import UpdateDayOfWeek from "../../settings/_weekSchema/actions/updateDayOfWeek"
import { toast } from "react-toastify";

const items = [
  { id: "00:00", label: "00:00" },
  { id: "01:00", label: "01:00" },
  { id: "02:00", label: "02:00" },
  { id: "03:00", label: "03:00" },
  { id: "04:00", label: "04:00" },
  { id: "05:00", label: "05:00" },
  { id: "06:00", label: "06:00" },
  { id: "07:00", label: "07:00" },
  { id: "08:00", label: "08:00" },
  { id: "09:00", label: "09:00" },
  { id: "10:00", label: "10:00" },
  { id: "11:00", label: "11:00" },
  { id: "12:00", label: "12:00" },
  { id: "13:00", label: "13:00" },
  { id: "14:00", label: "14:00" },
  { id: "15:00", label: "15:00" },
  { id: "16:00", label: "16:00" },
  { id: "17:00", label: "17:00" },
  { id: "18:00", label: "18:00" },
  { id: "19:00", label: "19:00" },
  { id: "20:00", label: "20:00" },
  { id: "21:00", label: "21:00" },
  { id: "22:00", label: "22:00" },
  { id: "23:00", label: "23:00" },
] as const;

const FormSchema = z.object({
  items: z.array(z.string())
})

const formatDayOfWeek = (day:any) => {
	const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
	const dayIndex = days.indexOf(day);
	const russianDays = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
	return russianDays[dayIndex]; // Или другой желаемый формат
};



const ChangeSchema = ({ day, slots }: { day: string, slots: string[] }) => {
	const [ open, setOpen ] = useState(false)

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			items: Array.isArray(slots) ? Array.from(slots) : []
		},
	})

	function onSubmit(data: z.infer<typeof FormSchema>) {
		try{
			const selectedItems = data['items']; // Получаем выбранные часы из данных
		
			// Преобразуем объекты в массив значений
			const selectedHours = items // используем items, которые представляют все часы
				.filter(item => selectedItems.includes(item.id)) // фильтруем выбранные часы
				.map(selectedItem => selectedItem.label); // извлекаем метки выбранных часов

			UpdateDayOfWeek({ day, slots: selectedHours })

			const notify = () => toast(
				<p className="flex flex-col">
					<span>В {day} схема расписания успешно обновлена!</span>
					<span>Слоты обновятся после перезагрузки страницы</span>
				</p>
			);
			notify();

			setOpen(false)
		} catch(error){
			console.log(error)
		}
	}

	const handleClearAll = () => {
    form.setValue('items', []); // Сбросить массив выбранных элементов чекбоксов
};

	return (
		<Dialog open={open}>
			<DialogTrigger>
				<div className='text-sm p-2 h-9 w-full mt-3 text-white bg-[#835BD2] rounded-md hover:bg-[#714fb5] transition-all' onClick={() => {setOpen(true)}}>Изменить</div>
			</DialogTrigger>
				<DialogContent>
					<div 
							className="w-6 h-6 bg-red-400 rounded-sm cursor-pointer hover:bg-red-500 absolute right-0 top-0 m-5"
							onClick={() => {setOpen(false)}}
							>
							<IoCloseOutline  className="text-2xl text-white"/>
					</div>
					<DialogHeader>
					<DialogTitle className="text-gray-600">{formatDayOfWeek(day)}</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="">
							<FormField
								control={form.control}
								name="items"
								render={() => (
									<FormItem className="grid grid-cols-3 justify-end space-y-0 gap-3 ml-0 sm:ml-9">
										{items.map((item) => (
											<FormField
												key={item.id}
												control={form.control}
												name="items"
												render={({ field }) => {
													return (
														<FormItem
															key={item.id}
															className="flex items-center justify-center space-x-3 space-y-0 border w-[6rem] h-10 rounded-lg gap-0 cursor-pointer"
														>
															<FormControl>
																<Checkbox
																	checked={field.value?.includes(item.id)}
																	onCheckedChange={(checked) => {
																		return checked
																			? field.onChange([...field.value, item.id])
																			: field.onChange(
																					field.value?.filter(
																						(value) => value !== item.id
																					)
																				)
																	}}
																/>
															</FormControl>
															<FormLabel className="text-sm font-normal cursor-pointer">
																{item.label}
															</FormLabel>
														</FormItem>
													)
												}}
											/>
										))}
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex gap-3 mt-4">
								<Button 
									type="submit" 
									className="w-1/2 text-base font-medium"
									variant='violetSelect'
								>
									Сохранить
								</Button>
								<Button 
								className="w-1/2 border-2 text-gray-300 border-gray-300 font-bold"
								type="button" 
								onClick={handleClearAll}
								variant="shadow2"
								>
									Очистить
								</Button>
							</div>
						</form>
					</Form>
			</DialogContent>
		</Dialog>
	)
}

export default ChangeSchema