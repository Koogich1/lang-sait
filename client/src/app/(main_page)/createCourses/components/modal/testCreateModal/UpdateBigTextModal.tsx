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
import addPhotoTOTextTasq from "../../actions/test/addPhotoTOTextTasq";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; 
import updatePhotoVariants from "../../actions/updatePhotoVariants";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { ClipLoader } from "react-spinners";
import Image from "next/image";

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

  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState(test.question);
  const [typePhoto, setTypePhoto] = useState(test.audioName);
  const [open, setOpen] = useState(false);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentOption, setCurrentOption] = useState<Option | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null); // Для превью изображения
	const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetchUser = async() => {
      const data = await currentUser()
      if(data) setUser(data);
    };
    fetchUser();
  }, []);


  const handleImageClick = (option: Option) => {
    setCurrentOption(option);
    setImagePreview(option.text); // Отображаем текущее изображение
    setOpenImageModal(true);
  };

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileURL = URL.createObjectURL(selectedFile);
      setImagePreview(fileURL); // Устанавливаем превью нового изображения
    }
  };

	const handleUpdateImage = async () => {
    if (!currentOption) {
        return;
    }

    if (imagePreview) {
        setLoading(true);
        
        // Получаем Blob из URL
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        
        // Создаем объект File
        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append("testId", test.id);
        formData.append("currOption", currentOption.id);
        
        try {
            const response = await fetch('/api/user/addOptionImage', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            // Обработка результата
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    } else {
        setLoading(false);
        alert("Ошибка при обновлении изображения");
    }
    updateVisov();
	};

	const handleAddOption = async() => {
		await addPhotoTOTextTasq(test.id)
		updateVisov()
	}

	const handleChangeVariant = async(variant: string) => {
		updatePhotoVariants(test.id, variant)
		setTypePhoto(variant)
		updateVisov()
	}

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

  if (loading) {
    return (
        <Dialog open={loading}>
            <DialogContent className="flex flex-col items-center justify-center w-full min-h-[60vh] min-w-[60vh] text-2xl font-bold text-gray-400">
                <h1>Обновление данных...</h1>
                <ClipLoader size="100" color="#835BD2" />
            </DialogContent>
        </Dialog>
    );
	}

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
							className="w-full min-h-[200px] mt-1 bg-white rounded-xl pb-[3rem]"
						/>
						<ScrollArea className="flex items-center justify-center h-[300px] border border-gray-300 rounded-lg p-3">
							<Select onValueChange={handleChangeVariant}>
								<SelectTrigger className="w-[180px] mb-3">
									<SelectValue placeholder={test.audioName} />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="obichniy">Друг под другом</SelectItem>
									<SelectItem value="row">В ряд</SelectItem>
								</SelectContent>
							</Select>
							{typePhoto === "row" && 
								<div className="grid grid-cols-3 gap-5 justify-center">
									{test.options.map((data, index) => (
										<div key={index} className="bg-blue-300 rounded-lg cursor-pointer" onClick={() => handleImageClick(data)}>
											<Image width={1000} height={1000} src={data.text} alt="" className="w-full hover:opacity-30 transition-all h-full object-cover rounded-lg"/>
										</div>
									))}
								</div>
							}
							{typePhoto === "obichniy" && 
								<div className="grid grid-cols-1 gap-5 justify-center w-2/5">
									{test.options.map((data, index) => (
										<div key={index} className="cursor-pointer bg-blue-300 rounded-lg" onClick={() => handleImageClick(data)}>
											<Image src={data.text} alt="" className="full hover:opacity-30 transition-all h-full object-cover rounded-lg"/>
										</div>
									))}
								</div>
							}
						</ScrollArea>
						<Button 
							variant={"violetSelect"}
							onClick={() => {
								handleAddOption()
							}}
							className="bg-green-600 hover:bg-green-700"
						>
							Добавить блок изображения
						</Button>
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
				  {/* Модальное окно для обновления изображения */}
					<Dialog open={openImageModal} onOpenChange={setOpenImageModal}>
        <DialogContent className="flex items-center justify-center flex-col">
          {currentOption && (
            <div>
              <DialogHeader className="w-full flex items-center">
                <DialogTitle className="text-xl font-semibold text-gray-400">Изменить изображение</DialogTitle>
              </DialogHeader>
              <div className="my-3 flex items-center justify-center flex-col gap-3">
                <Image width={1000} height={1000} src={imagePreview || ""} alt="" className="w-1/2 object-cover rounded-lg" />
               <div>
                <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    onClick={() => {
                      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
                      fileInput?.click();
                    }}
                    className="text-gray-500 font-semibold"
                    variant="shadow2"
                  >
                    Загрузить новое изображение
                  </Button>
               </div>
              </div>
              <div className="flex gap-2 items-center">
                <Button 
                  onClick={handleUpdateImage}
                  className="w-1/2"
                  variant={"violetSelect"}
                >
                  Подтвердить изменения
                </Button>
                <Button 
                  variant={"shadow2"}
                  className="w-1/2"
                  onClick={() => setOpenImageModal(false)}
                >
                  Отменить
                </Button>
              </div>
            </div>
          )}
        	</DialogContent>
      	</Dialog>
			</Dialog>
		)	
}


export default UpdateBigTextModal