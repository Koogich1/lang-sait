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
import { FaPen } from "react-icons/fa6";

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

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
  option: z.array(z.string().max(50, {
    message: "Не более 50 символов",
  })),
  isTrue: z.array(z.string()),
	answer: z.array(z.string().max(350, {
		message: "Не более 1000 символов",
	})),
	poriyadNum: z.array(z.string().max(2, {
		message: "Не более 350 символов",
	})),
	file: z.instanceof(File).optional().refine((file) => {
    if (!file) return true; // Если файл не выбран, пропускаем проверку
    return file.type === 'audio/mpeg'; // Проверяем тип файла
  }, {
    message: 'Пожалуйста, загрузите файл формата mp3.',
  }),
	audioName: z.string().max(350, {
		message: "Не более 350 символов"
	})
});


type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType;
  options: Option[];
  answers: Answer[];
	audioName?: string | null;
};


const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });


const UpdateBigTextModal = ({test, updateVisov} : {test: Test, updateVisov: () => void}) => {

	const [user, setUser] = useState<User | null>(null)
	const [ content, setContent ] = useState(test.question);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
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

	const handleEditorChange = (newContent: any) => {
    setContent(newContent);
  };

	const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }],
      ['clean'],
    ],
  };

  const quillFormats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
  ];

	return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
				<div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-50px] right-0 rounded-lg cursor-pointer`}>
						<FaPen className="text-base"/>
					</div>
				</DialogTrigger>
				<DialogContent className="text-gray-500 max-w-[900px]">
					<DialogHeader className="text-xl font-semibold text-gray-600">
						<DialogTitle className="text-2xl text-gray-400 flex justify-between">
							<h2>
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
					</DialogHeader>
					<div className="flex flex-col gap-3">
						<QuillEditor
							value={content}
							onChange={handleEditorChange}
							modules={quillModules}
							formats={quillFormats}
							className="w-full h-full mt-1 bg-white rounded-xl pb-[4.7rem]"
						/>
						<div className="flex justify-between gap-2">
							<Button 
								variant={"violetSelect"} 
								className="w-1/2"
								onClick={() => {
									updateBigText({testId: test.id, text: content})
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
					</div>
				</DialogContent>
			</Dialog>
		)	
}


export default UpdateBigTextModal