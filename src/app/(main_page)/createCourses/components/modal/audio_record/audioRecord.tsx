"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Answer, Option, QuestionType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FaPen, FaTrashCan } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { IoIosMic, IoIosMicOff } from "react-icons/io";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import updateTest from "../../actions/updateTest";
import { Textarea } from "@/components/ui/textarea";
import createNewMultipleChoose from "../../actions/createNewMultipleChoose";

const FormSchema = z.object({
  question: z.string().max(350, {
    message: "Не более 350 символов",
  }),
	option: z.array(z.string().max(50, {
    message: "Не более 50 символов",
  })),
  isTrue: z.array(z.string()),
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

const UpdateAudioModal = ({ test, updateVisov }: { test: Test; updateVisov: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [content, setContent] = useState(test.question);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordTime, setRecordTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [open, setOpen] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
	const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
		defaultValues:{
			question: test.audioName ? test.audioName : "введите название",
			option: test.options.map((data) => data.text), // массив строк
			isTrue: test.options.map((data) => data.isCorrect.toString()),
		}
  });

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyserNode = context.createAnalyser();

    source.connect(analyserNode);
    analyserNode.fftSize = 2048;

    setAudioContext(context);
    setAnalyser(analyserNode);

		recorder.ondataavailable = (event) => {
			const blob = event.data; // Сохраните Blob
			setAudioBlob(blob);
			const url = URL.createObjectURL(blob);
			setAudioUrl(url); // Обновите ссылку для воспроизведения
		};

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
    setRecordTime(0);

    // Таймер обновления уровня громкости
    const timerInterval = setInterval(() => {
      setRecordTime((prev) => prev + 1);
      updateVolume(analyserNode);
    }, 1000); 

    recorder.onstop = () => {
      setIsRecording(false);
      clearInterval(timerInterval);
      context.close();
    };
  };

  const updateVolume = (analyserNode: AnalyserNode) => {
    const buffer = new Uint8Array(analyserNode.frequencyBinCount);
    analyserNode.getByteFrequencyData(buffer);
    const average = buffer.reduce((sum, value) => sum + value, 0) / buffer.length;

    // Плавная анимация громкости
    const normalizedVolume = average / 255;
    setVolume((prevVolume) => (prevVolume * 0.8) + (normalizedVolume * 0.2)); // Плавное сглаживание
  	};

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await currentUser();
      if (data) {
        setUser(data);
      }
    };
    fetchUser();
  }, []);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		const optionsToUpdate = data.option.map((text, index) => ({
			id: test.options[index].id,
			text,
			isCorrect: data.isTrue[index] === "true",
		}));

		if (audioBlob) {
			if(audioUrl){
				const formData = new FormData();
				formData.append('audioFile', audioBlob);
				formData.append('testId', test.id);
				try {
						const response = await fetch('/api/user/recordedAudio', { // Путь к вашему API
								method: 'POST',
								body: formData,
						});

						const result = await response.json();

						if (result.success) {
								// Обновляем тест с URL файла
						await updateTest({
							audioName: data.question,
							options: optionsToUpdate,
							testId: test.id,
						});

								setOpen(false); // Закрытие модального окна
								updateVisov(); // Обновление данных
						} else {
								console.error('Ошибка загрузки файла на сервер:', result.error);
						}
				} catch (error) {
						console.error('Ошибка при отправке запроса:', error);
				}
			}
	} else {
			await updateTest({
					audioName: data.question,
					options: optionsToUpdate,
					testId: test.id,
			});
			setOpen(false);
			updateVisov();
		}
		setOpen(false)
		updateVisov();
	}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="p-2 mt-3 bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-600 text-lg absolute top-[-23px] right-0 rounded-lg cursor-pointer">
          <FaPen />
        </div>
      </DialogTrigger>
      <DialogContent className="text-gray-500 max-w-[500px]">
        <DialogHeader className="text-xl font-semibold text-gray-600">
          <DialogTitle className="text-2xl text-gray-400 flex justify-between">
            <h2>Записать голос</h2>
            <div
              className="w-10 h-10 bg-red-300 border-2 border-red-500 rounded-lg flex items-center justify-center hover:bg-red-500 cursor-pointer transition-all text-red-500 hover:text-white"
              onClick={() => {
                updateVisov();
                setOpen(false);
              }}
            >
              <FaTrashCan className="text-2xl" />
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="w-full flex space-y-2 flex-col justify-center items-center">
					<h1>{isRecording ? 'Идет запись...' : 'Нажмите, чтобы начать запись'}</h1>

					{isRecording && (
						<div className="text-lg">
							Длительность записи: {recordTime} с
						</div>
					)}

					{ /*isRecording && (
						<div
							className="h-2 bg-blue-500"
							style={{ width: `${volume * 100}%`, transition: 'width 0.1s' }}
						/>
					)*/}

					<Button 
						className={`w-[8rem] h-[8rem] rounded-full flex items-center justify-center hover:bg-blue-200 text-5xl transition-all ${isRecording ? "bg-blue-300 text-blue-500" : "bg-gray-200 text-gray-500"}`}
						onClick={isRecording ? stopRecording : startRecording}
					>
						{isRecording ? <IoIosMic /> : <IoIosMicOff />}
					</Button>

					{audioUrl && <audio controls src={audioUrl} />}

				</div>
				<Form {...form}>
      		<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-1">
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder="shadcn" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
								)}
							/>
							{test.options && test.options.map((data, index) => (
									<div className="flex gap-3" key={index}>
										<FormField
											key={data.id}
											control={form.control}
											name={`option.${index}`} // Динамические имена для массива
											render={({ field }) => (
												<FormItem className={`flex items-center justify-between w-[100%]`}>
													<FormLabel className="w-1/3 text-lg font-semibold text-gray-600">{`Ответ ${index + 1}:`}</FormLabel>
													<FormControl className="w-2/3 text-lg">
														<Textarea placeholder="Введите ответ" {...field} />
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											key={data.id+1}
											control={form.control}
											name={`isTrue.${index}`}
											render={({ field }) => (
												<FormItem className="flex items-center justify-between w-[25%]">
														<FormControl className="text-lg">
																<Select onValueChange={field.onChange} defaultValue={data.isCorrect.toString()}>
																		<SelectTrigger>
																				<SelectValue placeholder="Выберите правильный ответ" />
																		</SelectTrigger>
																		<SelectContent>
																				<SelectItem value="false">неверный</SelectItem>
																				<SelectItem value="true">верный</SelectItem>
																		</SelectContent>
																</Select>
														</FormControl>
														<FormMessage />
												</FormItem>
										)}
								/>
							</div>
							))}
							<div className="w-full h-20 bg-gray-50 border-2 border-dashed rounded-lg border-gray-300 text-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 hover:text-gray-500 transition-all"
								onClick={() => {
									createNewMultipleChoose(test.id)
									updateVisov()
								}}
							>
								<h1 className="text-lg font-semibold">
									Добавить вариант
								</h1>
						</div>
							<div className="flex flex-col gap-3">
								<div className="flex justify-between gap-2 pt-3">
									<Button 
										variant={"violetSelect"} 
										className="w-1/2"
										type="submit"
										onClick={() => {
											updateVisov();
										// setOpen(false);
										}}
									>
										Подтвердить
									</Button>
									<Button 
										variant={"shadow2"} 
										className="w-1/2" 
										onClick={() => {
											setOpen(false);
										}}
									>
										Отменить
									</Button>
								</div>
							</div>
					</form>
				</Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAudioModal;