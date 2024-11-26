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

const UpdateVideo = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [ content, setContent ] = useState(test.question);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			question: test.audioHeader ? test.audioHeader : "",
			video: test.question
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
		await updateVideoTest({testId: test.id, question: data.question, src: data.video})
		updateVisov()
	}


	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-20px] right-0 rounded-lg cursor-pointer`}>
						<FaPen />
					</div>
				</DialogTrigger>
				<DialogContent className="text-gray-500 max-w-[500px]">
					<DialogHeader className="text-xl font-semibold text-gray-400">
						<DialogTitle className="text-2xl text-gray-500 flex justify-between pb-2">
							<h2 className="text-xl text-[#6345a0]">
								Изменить текст
							</h2>
							<div 
								className="w-10 h-10 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
								onClick={() => {
									deleteSimpleTest({testId: test.id, littleRasdelId: test.littleRasdelId})
									updateVisov()
									setOpen(false)
								}}
							>
								<FaTrashCan className="text-2xl"/>
							</div>
						</DialogTitle>
						<div className="w-full h-[1px] bg-gray-100"></div>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
							<h1 className="text-base font-medium">
								Задание
							</h1>
							<FormField
								control={form.control}
								name="question"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea placeholder="" className="text-xs font-medium p-1 text-gray-400 min-h-10"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<h1 className="text-base font-medium pt-2">
								Ссылка на видео с облака
							</h1>
							<FormField
								control={form.control}
								name="video"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input placeholder="вставьте ссылку..." className="text-xs min-h-5 p-2 h-9 font-medium text-gray-400"{...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-2">
								<div className="w-full h-[1px] bg-gray-100 "/>
							</div>
							<div className="flex justify-between gap-2 pt-2a">
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


export default UpdateVideo