"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Answer, QuestionType, User, Option } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaTrashCan } from "react-icons/fa6";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import updateTest from "../../actions/updateTest";
import fetchCurrTest from "../../actions/fetchCurrTest";
import deleteOptions from "../../actions/deleteOptions";
import createNewMultipleChoose from "../../actions/createNewMultipleChoose";
import deleteSimpleTest from "../../actions/test/deleteTest";
import { currentUser } from "@/lib/auth";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    message: "Не более 350 символов",
  }),
});

type Test = {
  id: string;
  lessonId: string;
  littleRasdelId: string;
  question: string;
  questionType: QuestionType;
  audioHeader: string | null;
  options: Option[];
  answers: Answer[];
  audioName?: string | null;
};


const UpdateAudioUpload = ({ test, updateVisov }: { test: Test, updateVisov: () => void }) => {
  const [testInfo, setTestInfo] = useState(test);
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: testInfo.question,
      option: testInfo.options.map((data) => data.text), // массив строк
      isTrue: testInfo.options.map((data) => data.isCorrect.toString()), // массив булевых строк
      answer: testInfo.answers.map((data) => data.text),
      poriyadNum: testInfo.answers.map((data) => data.order?.toString()),
      audioName: test.audioHeader ? test.audioHeader : "",
    },
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await currentUser();
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  const fechCurrTestInfo = async () => {
    const data = await fetchCurrTest(test.id);
    if (data) {
      setTestInfo(data);
      form.reset({
        question: data.question,
        audioName: data?.audioHeader || "",
        option: data.options.map((data) => data.text),
        isTrue: data.options.map((data) => data.isCorrect.toString()),
        answer: data.answers.map((data) => data.text),
        poriyadNum: data.answers.map((data) => data.order?.toString()),
      });
    }
  };

	const addNewOption = async () => {
		// Получение нового варианта
		const newOption = await createNewMultipleChoose(testInfo.id);
	
		if (newOption) { // Проверяем, что новый вариант был успешно создан
			setTestInfo((prev) => ({
				...prev,
				options: [...prev.options, newOption], // Добавляем новый вариант к существующим
			}));
	
			// Обновление формы с новым вариантом
      form.setValue("question",form.getValues("question"))
			form.setValue("option", [...form.getValues("option"), newOption.text]);
			form.setValue("isTrue", [...form.getValues("isTrue"), newOption.isCorrect.toString()]);
		}
	};
	
  
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const file = data.file;

    const optionsToUpdate = data.option.map((text, index) => ({
      id: testInfo.options[index].id,
      text,
      isCorrect: data.isTrue[index] === "true",
    }));

    const answersToUpdate = data.answer.map((text, index) => ({
      id: testInfo.answers[index]?.id,
      text,
      order: data.poriyadNum[index] ? parseInt(data.poriyadNum[index]) : undefined,
    }));

    // Проверяем, выбран ли файл
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('question', data.question);
      formData.append('testId', testInfo.id);
      // Добавьте другие необходимые поля, такие как optionsToUpdate и answersToUpdate,
      // если это нужно на сервере, например, в JSON-формате.
      try {
        const response = await fetch('/api/user/addFiles', { // Путь к вашему API
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (result.success) {
          // Обновляем тест с URL файла
          await updateTest({
            options: optionsToUpdate,
            answers: answersToUpdate,
            testId: testInfo.id,
          });

          setOpen(false); // Закрытие модального окна
          updateVisov(); // Обновление данных
        } else {
          console.error('Ошибка загрузки файла на сервер:', result.error);
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    } else {
      // Если файл не выбран, просто обновляем тест
      await updateTest({
        name: data.question,
        audioName: data.audioName,
        options: optionsToUpdate,
        answers: answersToUpdate,
        testId: testInfo.id,
      });
      setOpen(false);
			fechCurrTestInfo()
      updateVisov();
    }
		fechCurrTestInfo()
		updateVisov()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className={`p-2 mt-3 bg-purple-200 hover:bg-[#835BD2] text-[#835BD2] hover:text-white transition-all text-lg absolute top-[-50px] right-0 rounded-lg cursor-pointer ${testInfo && testInfo.questionType === "AUDIOCHOOSE" ? "top-[-10rem]" : ""}`}>
          <FaPen className="text-base" />
        </div>
      </DialogTrigger>
      <DialogContent className="text-gray-500">
        <DialogHeader className="text-xl font-semibold text-[#6345a0] pt-[0.85rem]">
          <DialogTitle></DialogTitle>
          Редактировать упражнение
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="w-full h-[1px] bg-gray-100" />
            <FormField
                control={form.control}
                name="audioName"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between my-3">
										<FormLabel className="w-1/3 text-xl font-semibold text-gray-400">Задание:</FormLabel>
										<FormControl className="w-2/3 text-lg">
											<Input placeholder="" {...field} className="flex justify-center items-center text-gray-400"/>
										</FormControl>
										<FormMessage />
									</FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel className="w-1/3 text-lg font-semibold text-gray-400">Добавьте аудиозапись:</FormLabel>
                  <FormControl className="w-2/3 text-lg">
                    <div className="relative">
                      <input
                        type="file"
                        accept="audio/mpeg"
                        onChange={(e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            form.setValue('file', e.target.files[0]); // Сохраняем файл в форму
                          }
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Скрываем стандартный Input
                      />
                      <button
                        type="button"
                        className="py-2 px-3 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                      >
                        {field.value ? field.value.name : "Выберите файл"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full h-[1px] bg-gray-100 mt-4 mb-4" />
            <ScrollArea className=" w-full h-[250px] rounded-md border p-2">
              {testInfo.options && testInfo.options.map((data, index) => (
                <div className="flex gap-3" key={index}>
                  <FormField
                    key={data.id}
                    control={form.control}
                    name={`option.${index}`} // Динамические имена для массива
                    render={({ field }) => (
                      <FormItem className={`flex items-center justify-between ${testInfo.questionType === "FILL_IN_THE_BLANK" ? "w-[100%]" : "w-[75%]"}`}>
                        <FormLabel className="w-1/4 text-xs font-medium text-gray-400">{`Ответ: ${index + 1})`}</FormLabel>
                        <FormControl className=" w-3/4 text-xs font-medium text-gray-500">
                          <Textarea placeholder="" className="min-h-10"{...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    key={data.id + 1}
                    control={form.control}
                    name={`isTrue.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between w-[25%] mt-2">
                        <FormControl>
                          <div className=""> 
                            <Select onValueChange={field.onChange} defaultValue={data.isCorrect.toString()}>
                              <SelectTrigger className={`text-xs w-[105px] ${data.isCorrect ?  "bg-green-200 text-green-500 border-2 border-green-400 font-semibold" : "bg-red-200 text-red-500 border-2 border-red-400 font-semibold" }`}>
                                <SelectValue placeholder="Выберите правильный ответ" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="false">неверный</SelectItem>
                                <SelectItem value="true">верный</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div 
                    onClick={() => {
                      deleteOptions(data.id);
                      fechCurrTestInfo();
                      updateVisov(); // ВОТ ТУТ НАДО ПОСЛЕ ФОРМУ ОБНОВИТЬ
                    }} 
                    className="w-5 h-5 mt-2 bg-red-200 text-red-400 border border-red-500 rounded-sm text-2xl flex items-center justify-center cursor-pointer hover:bg-red-300 hover:text-red-700 hover:border-red-700 transition-all"
                  >
                    <IoCloseOutline />
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div 
              className="w-full h-12 mt-3 bg-gray-50 border-2 border-dashed rounded-lg border-gray-300 text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:text-gray-500 transition-all"
              onClick={() => {
                addNewOption()
              }}
            >
              <h1 className="text-base font-semibold">
                Добавить вариант
              </h1>
            </div>
            <div className="w-full h-[1px] bg-gray-100 mt-4 mb-4" />
            <DialogDescription className="flex gap-3 mt-3">
              <Button type="submit" variant='violetSelect' className="w-1/2">
                Подтвердить
              </Button>
              <Button type='button' variant={"shadow2"} className="w-1/2"
                onClick={() => {
                  setOpen(false);
                  updateVisov()
                }}
              >
                Отменить
              </Button>
            </DialogDescription>
            <div 
              className='absolute top-0 right-0 m-6 h-10 cursor-pointer w-10 flex items-center justify-center bg-red-300 border-2 text-xl border-red-500 rounded-xl text-red-500 hover:bg-red-400 hover:border-red-600 hover:text-red-600 transition-all'
              onClick={() => {
                deleteSimpleTest({ testId: test.id, littleRasdelId: test.littleRasdelId });
                updateVisov();
              }}
            >
              <FaTrashCan />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAudioUpload;
