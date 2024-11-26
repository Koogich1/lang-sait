"use client"

import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { z } from "zod"

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
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import createRasdel from '../../actions/createRasdel'
 
const FormSchema = z.object({
  rasdelName: z.string().min(3, {
    message: "Название раздела должно содержать минимум 3 символа",
  }),
})

type Props = {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  visov: () => void;
	courseId: string;
}

const CreateRasdelModal = ({openModal, setOpenModal, visov, courseId}: Props) => {

	const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rasdelName: "",
    },
  })



	async function onSubmit(data: z.infer<typeof FormSchema>) {
    await createRasdel(courseId, data.rasdelName)
		form.reset()
		visov()
		setOpenModal(false)
  }


	return (
		<Dialog open={openModal} onOpenChange={setOpenModal}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle><p className='text-2xl font-light text-gray-500'>Введите название раздела</p></DialogTitle>
				</DialogHeader>
				<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="">
					<FormField
						control={form.control}
						name="rasdelName"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="" className='w-full' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-3 mt-5'>
						<Button className='font-medium w-1/2' variant={"violetSelect"} type='submit'>Подтвердить</Button>
						<Button className='font-medium w-1/2' variant={"shadow2"} type='button' onClick={() => {setOpenModal(false)}}>Отменить</Button>
					</div>
				</form>
			</Form>
			</DialogContent>
		</Dialog>
	)
}

export default CreateRasdelModal