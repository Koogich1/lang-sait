"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react"
import { FaPen, FaPlus, FaQuestion } from "react-icons/fa6";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button"
import { currentUser } from "@/lib/auth";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css'; 
import updateBigText from "../../actions/test/updateBigText";
import deleteSimpleTest from "../../actions/test/deleteTest";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import updateInputTest from "../../actions/test/inputWordsIntext/updateInputTest";
import addAnswer from "../../actions/test/inputWordsIntext/addAnswer";
import deleteAnswer from "../../actions/test/inputWordsIntext/deleteAnswer";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import updateVideoTest from "../../actions/test/videoTest/updateVideoTest";
import updatePdfTest from "../../actions/test/pdf/updatePdfTest";

const FormSchema = z.object({
  question: z.string().max(1000, {
    message: "Не более 1000 символов",
  }),
	video: z.string(),
});

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
	audioHeader: string | null;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
	audioName?: string | null;
};

const UpdatePdfModal = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [ content, setContent ] = useState(test.question);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: test.question,
			video: test.audioHeader ? test.audioHeader : ""
		}
	});

	const [open, setOpen] = useState(false)

	useEffect(() => {
		const fetchUser = async() => {
			const data = await currentUser()
			if(data){
				setUser(data)
			}
		}
		fetchUser()
	},[])

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		await updatePdfTest({testId: test.id, question: data.question, src: data.video})
		updateVisov()
	}


	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
				<div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-20px] right-0 rounded-lg cursor-pointer`}>
						<FaPen className="text-base"/>
					</div>
				</DialogTrigger>
				<DialogContent className="text-gray-500 max-w-[450px]">
					<DialogHeader className="text-xl font-semibold text-gray-600">
						<DialogTitle className="text-xl text-[#835BD2] flex justify-between pb-2">
							<h2>
								Изменить текст
							</h2>
							<div 
								className="w-8 h-8 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
								onClick={() => {
									deleteSimpleTest({testId: test.id, littleRasdelId: test.littleRasdelId})
									updateVisov()
									setOpen(false)
								}}
							>
								<FaTrashCan className="text-xl"/>
							</div>
						</DialogTitle>
						<div className="w-full h-[1px] bg-gray-100" />
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
							<h1 className="text-lg font-semibold">
								Задание
							</h1>
							<FormField
								control={form.control}
								name="question"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea placeholder="" className="text-base font-semibold text-gray-400"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h1 className="text-lg font-semibold pt-2">
								Ссылка на pdf с облака
							</h1>
							<FormField
								control={form.control}
								name="video"
								render={({ field }) => (
									<FormItem className="pb-2">
										<FormControl>
											<Input placeholder="" className="text-base font-semibold text-gray-400"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="w-full h-[1px] bg-gray-100" />
							<div className="flex justify-between gap-2 pt-2">
								<Button 
									variant={"violetSelect"} 
									className="w-1/2"
									onClick={() => {
										updateVisov()
										setOpen(false)
									}}
								>
									Подтвердить
								</Button>
								<Button 
									variant={"shadow2"} 
									className="w-1/2" 
									onClick={() => {
										setOpen(false)
									}}
								>
									Отменить
								</Button>
							</div>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		)	
}


export default UpdatePdfModal