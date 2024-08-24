"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaPen, FaPlus, FaQuestion, FaTrashCan } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import updateAnswer from "../../actions/test/updateConnect/updateAnswer";
import updateOption from "../../actions/test/updateConnect/updateOption";
import updateQuestion from "../../actions/test/updateConnect/updatequestion";
import { ClipLoader } from "react-spinners";
import addBlock from "../../actions/test/updateConnect/addBlock";
import { ScrollArea } from "@/components/ui/scroll-area";
import deleteAnswerOptionCorrect from "../../actions/test/connectTrueVariants/deleteAnswerOptionCorrect";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import deleteSimpleTest from "../../actions/test/deleteTest";
import addImageBlock from "../../actions/test/updateConnect/addImageBlock";

const FormSchema = z.object({
  question: z.string().max(350, { message: "Не более 350 символов" }),
  answer: z.array(z.string().max(350, { message: "Не более 1000 символов" })),
  option: z.array(z.string().max(350, { message: "Не более 1000 символов" })),
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


const UpdateConnectModalPhoto = ({ test, updateVisov }: { test: Test; updateVisov: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [openOptionModal, setOpenOptionModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: test.question,
      answer: test.answers.map((data) => data.text),
      option: test.options.map((data) => data.text),
    },
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await currentUser();
      if (data) setUser(data);
    };
    fetchUser();
  }, []);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      await updateQuestion(test.id, data.question);
      await Promise.all(
        test.options.map((option, index) => updateOption(option.id, data.option[index]))
      );
      console.log("успех");
      updateVisov();
    } catch (error) {
      console.error("Ошибка обновления:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      const fileURL = URL.createObjectURL(selectedFile);
      setPreviewImage(fileURL);
    }
  };

  const handleImageSend = async () => {
    if (!selectedOption || !previewImage) {
      alert("Пожалуйста, выберите изображение и опцию.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(previewImage);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("testId", test.id);
      formData.append("currOption", selectedOption.id);

      const result = await fetch('/api/user/addImageAnswerConnect', {
        method: 'POST',
        body: formData,
      });
      
      if (!result.ok) throw new Error("Ошибка при загрузке изображения.");

      const data = await result.json();
      console.log("Изображение успешно загружено", data);
    } catch (error) {
      console.error("Ошибка при загрузке изображения:", error);
    } finally {
      setLoading(false);
      updateVisov();
    }
    setOpenOptionModal(false)
  };

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
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-20px] right-0 rounded-lg cursor-pointer`}>
            <FaPen className="text-base"/>
          </div>
        </DialogTrigger>
        <DialogContent className="text-gray-500 max-w-[700px]">
          <DialogHeader className="text-xl font-semibold text-gray-600">
            <DialogTitle className="text-2xl text-gray-500 flex justify-between pb-2">
              <h2>Изменить текст</h2>
              <div 
                className="w-10 h-10 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
                onClick={() => {
                  deleteSimpleTest({testId: test.id, littleRasdelId: test.littleRasdelId});
                  updateVisov();
                  setOpen(false);
                }}
              >
                <FaTrashCan className="text-2xl"/>
              </div>
            </DialogTitle>
            <div className="w-full h-[1px] bg-gray-100"></div>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
              <h1 className="text-lg font-semibold">Задание</h1>
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="shadcn" className="text-base font-medium text-gray-400" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 items-center pt-3">
                <h1 className="text-lg font-semibold">Ответы</h1>
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <div className="w-6 h-6 rounded-full bg-blue-200 text-blue-400 flex items-center justify-center cursor-pointer hover:bg-blue-300 hover:text-blue-500 transition-all">
                      <FaQuestion />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    Напишите несколько ответов и текстов, которые необходимо соединить!
                  </HoverCardContent>
                </HoverCard>
              </div>
              <ScrollArea className="w-full h-[250px] rounded-md border p-2 relative">
                <div className="flex justify-between">
                  <div className="w-3/4 space-y-3">
                    {test.options.map((option, index) => (
                      <div className="flex items-center pt-4 relative" key={option.id}>
                        <span className="text-lg font-bold w-6 h-6 bg-green-300 rounded-md text-green-600 flex justify-center items-center">{index + 1}</span>
                        <FormField
                          control={form.control}
                          name={`option.${index}`}
                          render={({ field }) => (
                            <FormItem className="w-full m-0 text-gray-400">
                              <FormControl>
                                <Input 
                                  placeholder={`Ответ`} 
                                  className="text-xs font-semibold text-gray-400 m-0 w-full" 
                                  {...field} 
                                  onClick={() => {
                                  }}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div 
                          className="w-7 h-7 bg-red-300 border-2 border-red-500 rounded-lg absolute z-50 right-3 flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
                          onClick={() => {
                            setLoading(true)
                            deleteAnswerOptionCorrect(option.order ? option.order : 1, test.id);
                            updateVisov();
                            setLoading(false)
                          }}
                        >
                          <FaTrashCan className="text-base"/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center w-1/4">
                    {test.answers.map((answer) => (
                      <div className="flex justify-center w-full" key={answer.id}>
                        <div className="bg-blue-400 rounded-lg">
                          <img 
                            src={answer.text} 
                            alt="" 
                            className="w-[5rem] h-[5rem] rounded-lg object-cover hover:opacity-30 transition-all cursor-pointer" 
                            onClick={() => {
                              setSelectedOption(answer);
                              setOpenOptionModal(true);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <div 
                className="w-full py-[0.6rem] rounded-lg bg-green-200 flex justify-center items-center text-green-600 gap-3 font-bold text-base border-[3px] border-green-500 hover:bg-green-500 hover:text-white transition-all cursor-pointer"
                onClick={() => {
                  addImageBlock(test.id);
                  updateVisov();
                }}
              >
                Добавить 
                <FaPlus className="w-6 h-6 bg-green-400 p-[0.255rem] rounded-lg" />
              </div>
              <div className="flex justify-between gap-2 pt-4">
                <Button 
                  variant={"violetSelect"} 
                  className="w-1/2"
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Подтвердить
                </Button>
                <Button 
                  variant={"shadow2"} 
                  className="w-1/2" 
                  onClick={() => setOpen(false)}
                >
                  Отменить
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={openOptionModal} onOpenChange={setOpenOptionModal}>
        <DialogContent className="flex items-center justify-center flex-col">
          {selectedOption && (
            <div>
              <DialogHeader className="w-full flex items-center">
                <DialogTitle className="text-xl font-semibold text-gray-400">Изменить изображение</DialogTitle>
              </DialogHeader>
              <div className="my-3 flex items-center justify-center flex-col gap-3">
                <img src={previewImage || selectedOption.text || ""} alt="" className="w-1/2 object-cover rounded-lg" />
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
                  onClick={handleImageSend}
                  className="w-1/2"
                  variant={"violetSelect"}
                >
                  Подтвердить изменения
                </Button>
                <Button 
                  variant={"shadow2"}
                  className="w-1/2"
                  onClick={() => setOpenOptionModal(false)}
                >
                  Отменить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );  
};

export default UpdateConnectModalPhoto;