"use client"


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaTrashCan } from "react-icons/fa6";

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
import { Button } from "@/components/ui/button";

type Props = {
  currRasdel: { id: string; lessonId: string; name: string } | null;
	visov: () => void;
};


const FormSchema = z.object({
	file: z.instanceof(File).optional()
});



const AddImageMaterial = ({currRasdel, visov}: Props) => {
	const [open, setOpen] = useState(false)

	if(!currRasdel){
		return
	}

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		console.log("работаю")
		const file = data.file
		const rasdelId = currRasdel?.id
		const lessonId = currRasdel?.lessonId
		if(!rasdelId){return}
		if(!lessonId){return}

		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('testId', rasdelId);
			formData.append("lessonId", lessonId)
			try {
				const response = await fetch('/api/user/addImages', { // Путь к вашему API
						method: 'POST',
						body: formData,
				});
				const result = await response.json();
				if(result.success){
					console.log(result)
					visov()
					setOpen(false)
				}
			} catch (e){
				console.log(e)
			}
		}
	}

	return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-1/2 flex items-center justify-center gap-3 h-20 border-2 border-dashed mt-5 hover:border-solid hover:border-purple-600 transition-all rounded-lg">
            <div className="h-6 w-6 bg-[#835BD2] rounded-lg">
                <FaPlus className="w-full h-full p-1 text-white"/>
            </div>
            <h1 className="text-lg font-semibold text-[#835BD2]">Добавить изображение</h1>
        </DialogTrigger>
        <DialogContent className="text-gray-600">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Добавление изображения</DialogTitle>
                <DialogDescription>
                    <Form {...form}>
                        {/* Переместите форму сюда */}
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                            <FormField
                                control={form.control}
                                name="file"
                                render={({ field }) => (
                                    <FormItem className="flex items-center justify-between">
                                        <FormLabel className="w-1/3 text-lg font-semibold text-gray-400">Выберите файл:</FormLabel>
                                        <FormControl className="w-2/3 text-lg">
                                            <Input
                                                type="file"
                                                accept="image/jpeg, image/png"
                                                onChange={(e) => {
                                                    if (e.target.files && e.target.files.length > 0) {
                                                        form.setValue('file', e.target.files[0]); // Сохраняем файл в форму
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-3 mt-4">
                                <Button 
                                    variant={"violetSelect"}
                                    className="w-1/2"
                                    type="submit" // Кнопка submit должна быть внутри формы
                                >
                                    Подтвердить
                                </Button>
                                <Button 
                                    variant={"shadow2"}
                                    onClick={() => {
                                        setOpen(false)
                                    }}
                                    className="w-1/2"
                                >
                                    Отменить
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
	);
}

export default AddImageMaterial