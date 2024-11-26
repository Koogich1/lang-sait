"use client"

import getUserByTeacherId from '@/actions/getUserByTeacherId';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { BeatLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { languageVariants, languagePrefers, Language, User } from "@prisma/client";
import findUserLanguages from './findUserLanguages';
import Image from 'next/image';
import Link from 'next/link';
import UpdateUserLanguageModal from './updageUserLanguageModal';
import { currentUser } from '@/lib/auth';
import addUserLanguage from './addLanguage';

type Teacher = {
  id: string;
  teacherId: string;
  userInfo: {
    image: string | null;
    name: string | null;
    surname: string | null;
  };
  teacherInfo: {
    aboutMe: string;
  };
};

type LanguageTranslation = {
  [key: string]: string;
};

const englishToRussian: LanguageTranslation = {
  English: 'Английский',
  China: 'Китайский',
  Korean: 'Корейский',
};

const LanguageBox = () => {
  const { update } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [languageChoose, setLanguageChoose] = useState(false);
  const [language, setLanguage] = useState<languageVariants | null>(null);
  const [level, setLevel] = useState<string>("");
  const [prefers, setPrefers] = useState<languagePrefers | null>(null);
  const contentRef = useRef(null);
  const [languages, setLanguages] = useState<Language[] | null>(null)
  const [updateMDL, setUpdateModal] = useState(false)

  const [activeLanguage, setActiveLanguage] = useState<Language | null>(null);

  useEffect(() => {
    const userFetch = async () => {
      const userData = await currentUser()
      if (userData) {
        setUser(userData);
        setIsLoading(false);
      } else {
        setIsLoading(false); // Убедитесь, что состояние loading обновлено
      }
    };
  
    userFetch();
  }, []); // Убедитесь, что этот useEffect вызывается только один раз
  
  useEffect(() => {
    const fetchLanguages = async () => {
      console.log("ищу языки")
      if (user) {
        const fetch = await findUserLanguages(user.id);
        console.log('Fetched Languages:', fetch); // Для проверки наличия данных
        if (fetch) {
          // Сортируем языки по алфавиту
          const sortedLanguages = fetch.sort((a, b) => 
            a.language.localeCompare(b.language)
          );
          setLanguages(sortedLanguages);
        }
      } else {
        console.log("пользователя нет");
      }
    };
  
    if (user) { // Вызов fetchLanguages только если user получен
      fetchLanguages();
    }
  }, [user]); // Эффект сработает, когда user изменится

  const fetchLanguages = async () => {
    console.log("ищу языки")
    if (user) {
      const fetch = await findUserLanguages(user.id);
      console.log('Fetched Languages:', fetch); // Для проверки наличия данных
      if (fetch) {
        // Сортируем языки по алфавиту
        const sortedLanguages = fetch.sort((a, b) => 
          a.language.localeCompare(b.language)
        );
        setLanguages(sortedLanguages);
      }
    } else {
      console.log("пользователя нет");
    }
  };


  const onSubmit = async () => {
    if (language && level && user?.teacherId) {
      const userId = user.id; // Убедитесь, что teacherId существует
    
      await addUserLanguage({ language: language as languageVariants, level, userId });
      
      setOpen(false);
    } else {
      console.log('Пожалуйста, заполните все поля.');
    }
    fetchLanguages()
  };
  

  useEffect(() => {
    if(contentRef.current) {
      if(languageChoose) {
        gsap.fromTo(contentRef.current, { x: '100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5 });
      } else {
        gsap.fromTo(contentRef.current, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, duration: 0.5 });
      }
    }
  }, [languageChoose]);

  if (isLoading) {
    return <BeatLoader color="#835BD2" />;
  }

  if (!languages || languages?.length === 0) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger onClick={() => { 
          setOpen(true);
          setLevel("")
          setPrefers(null)
        }}
				className='w-full'>
          <div className="flex items-center justify-center w-full h-12 gap-3 bg-purple-100 border-2 border-[#835BD2] hover:bg-[#835BD2] text-[#835BD2] hover:text-white rounded-xl border-dashed hover:border-solid transition-all cursor-pointer">
            <div>
							<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
						</div>
            <p className=''>Добавьте ваш первый язык!</p>
          </div>
        </DialogTrigger>
        <DialogContent className='overflow-hidden max-w-[550px]'>
          <DialogHeader>
            <div className="w-6 h-6 bg-red-400 absolute top-[1.50rem] rounded-md right-6 flex justify-center items-center text-xl text-white hover:bg-red-500 cursor-pointer" onClick={() => { setOpen(false); }}>
              <IoClose />
            </div>
            <DialogTitle className='text-[#835BD2] text-xl'>{languageChoose ? "Выберите язык" : "Настройте необходимое"}</DialogTitle>
            <DialogDescription>
            {languageChoose ? (
               <div ref={contentRef}>
                 { 
                  //<Input placeholder='Введите название языка' className='w-full mt-3'/>
                  }
                  <div className='grid grid-cols-2 gap-3 mt-3'>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="China" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                          (setLanguage("China"),
                          setLevel(""),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/China.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Китайский</h1>
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="Korean" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                        (setLanguage("Korean"),
                          setLevel(""),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/Korean.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Корейский</h1>	
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="English" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                        (setLanguage("English"),
                          setLevel(''),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Английский</h1>
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="German" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>
                        (setLanguage("German"),
                          setLevel(""),
                          setPrefers(null))

                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/German.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Немецкий</h1>
										</div>
                  </div>
                  <Button onClick={() => setLanguageChoose(!languageChoose)} variant={language ? "violetSelect" : "shadow2"} className='w-full mt-5'>Подтвердить</Button>
                </div>
             ) :
                <div ref={contentRef} className='w-full mt-3'>
                  {language === "China" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div className='flex gap-3'>
                        <p className='w-2/5 flex items-center text-lg text-gray-400 font-medium'>Выбранный язык:</p>
                        <div 
                        className={`flex w-3/5 justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="China" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                        onClick={() => setLanguageChoose(!languageChoose)}
                        >
                          <Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/China.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
                          <h1 className="font-semibold text-base">Китайский</h1>
                        </div>
                      </div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HSK-1" className='text-base'>HSK-1</SelectItem>
                          <SelectItem value="HSK-2" className='text-base'>HSK-2</SelectItem>
                          <SelectItem value="HSK-3" className='text-base'>HSK-3</SelectItem>
                          <SelectItem value="HSK-4" className='text-base'>HSK-4</SelectItem>
                          <SelectItem value="HSK-5" className='text-base'>HSK-5</SelectItem>
                          <SelectItem value="HSK-6" className='text-base'>HSK-6</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "Korean" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="Korean" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/Korean.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Корейский</h1>	
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-гып" className='text-base'>1-гып</SelectItem>
                          <SelectItem value="2-гып" className='text-base'>2-гып</SelectItem>
                          <SelectItem value="3-гып" className='text-base'>3-гып</SelectItem>
                          <SelectItem value="4-гып" className='text-base'>4-гып</SelectItem>
                          <SelectItem value="5-гып" className='text-base'>5-гып</SelectItem>
                          <SelectItem value="6-гып" className='text-base'>6-гып</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "English" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="English" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>  setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Английский</h1>
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "German" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="German" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>  setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/German.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Немецкий</h1>
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                    
                  ) 
                  
                  : ""}
                </div>
              }
              {language && language?.length > 3 && !languageChoose ? 
              <div className='flex gap-3 mt-3'>
                <Button className='w-1/2' variant={level ? "violetSelect" : "shadow2"}
                onClick={() => {
                  if(level){
                    onSubmit()
                    fetchLanguages()
                    setOpen(false)
                  }
                }}
                >Подтвердить</Button>
                <Button className='w-1/2' variant={"shadow2"}>Отменить</Button>
              </div> 
              : 
              ""}
              {!language && !languageChoose && 
              <div>
                <Button variant={"violetSelect"} className='text-[#835BD2] gap-2 flex bg-white hover:text-white border-2 hover:bg-[#835BD2] border-[#835BD2] border-dashed w-full h-20 hover:border-solid'
                  onClick={() => {
                    setLanguageChoose(true)
                  }}
                >
                  <Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
                  Выбрать язык!
                </Button>
              </div>
              }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className='w-full'>
      <div ref={contentRef} className="overflow-hidden transition-transform duration-500 grid grid-cols-1 gap-3 w-full">
				
        {languages.map((data) => (
          <div key={data.id} className='w-full cursor-pointer rounded-xl hover:bg-black transition-all'
            onClick={() => {
              setActiveLanguage(data)
              setUpdateModal(true)}}
          >
            {data.language === "China" ? 
            <div className="bg-[#f20520] p-4 overflow-hidden transition-all relative min-h-[40px] hover:opacity-70 w-full flex flex-col justify-between rounded-xl shadow-lg">
              <div className='flex items-center justify-center w-full h-full absolute opacity-0 hover:opacity-100 transition-opacity duration-300'>
                <div className='bg-gray-200 p-2 z-50 rounded-lg'>
                  <IoSettingsOutline className='text-gray-500 w-6 h-6'/>
                </div>
              </div>
              <Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
              <h1 className="text-[#f7e627] text-2xl z-50 text-center" style={{fontFamily: "Belepotan"}}>
                Китайский язык
              </h1>
            </div> 
            : ""}
            {data.language === "English" ?
            <div className='relative hover:opacity-70 transition-all'>
              <Image src={"/bus.png"} width={500} height={500} alt="dragonBg" className=" absolute right-[-15px] z-10 w-[26%] bottom-[-4px]"/>
                <div className="bg-[#4865d8] p-4 overflow-hidden relative min-h-[60px] flex flex-col justify-between rounded-xl shadow-lg">
                  <h1 className="text-white text-xl z-50" style={{fontFamily: "Corean"}}>
                    АНГЛИЙСКИЙ ЯЗЫК
                  </h1>
              </div>
             </div>
            : ""}
            {data.language === "German" ? 
            <div className="bg-amber-500 w-full p-4 overflow-hidden transition-all hover:opacity-70 relative min-h-[40px] flex flex-col justify-between rounded-xl shadow-lg">
              <Image src="/gr.png" alt="" width={100} height={100} className='absolute w-[3rem] h-[2rem] right-[-1rem] bottom-1 rotate-[-15deg]' />
              <h1 className="text-amber-900 text-2xl text-center z-50 font-semibold">
                НЕМЕЦКИЙ ЯЗЫК
              </h1>
            </div>
            : ""}
            {data.language === "Korean" ? 
            <div className="bg-[#ffe2ef] w-full p-4 overflow-hidden transition-all hover:opacity-70 relative min-h-[40px] flex flex-col justify-between rounded-xl">
              <Image src={"/sacura.png"} width={500} height={500} alt="dragonBg" className="absolute right-[-10px] bottom-[-60px] opacity-45 z-0"/>
              <h1 className="text-[#b82761] text-2xl text-center xl z-50" style={{fontFamily: "Belepotan"}}>
                КОРЕЙСКИЙ ЯЗЫК
              </h1>
          </div>
            : ""}
          </div>
        ))}
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger onClick={() => { 
          setOpen(true);
          setLevel("")
          setPrefers(null)
        }}>
          <div className="flex items-center justify-center w-full py-2 h-12 gap-3 bg-purple-100 border-2 border-[#835BD2] hover:bg-[#835BD2] text-[#835BD2] hover:text-white rounded-xl border-dashed hover:border-solid transition-all cursor-pointer">
            <div>
							<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
						</div>
            	<p className='font-medium'>Изучаете несколько? Добавляйте!</p>
          </div>
        </DialogTrigger>
        <DialogContent className='overflow-hidden max-w-[550px]'>
          <DialogHeader>
            <div className="w-6 h-6 bg-red-400 absolute top-[1.50rem] rounded-md right-6 flex justify-center items-center text-xl text-white hover:bg-red-500 cursor-pointer" onClick={() => { setOpen(false); }}>
              <IoClose />
            </div>
            <DialogTitle className='text-[#835BD2] text-xl'>{languageChoose ? "Выберите язык" : "Настройте необходимое"}</DialogTitle>
            <DialogDescription>
            {languageChoose ? (
               <div ref={contentRef}>
                 { 
                  //<Input placeholder='Введите название языка' className='w-full mt-3'/>
                  }
                  <div className='grid grid-cols-2 gap-3 mt-3'>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="China" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                          (setLanguage("China"),
                          setLevel(""),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/China.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Китайский</h1>
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="Korean" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                        (setLanguage("Korean"),
                          setLevel(""),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/Korean.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Корейский</h1>	
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="English" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => 
                        (setLanguage("English"),
                          setLevel(''),
                          setPrefers(null))
                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Английский</h1>
										</div>
                    <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="German" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>
                        (setLanguage("German"),
                          setLevel(""),
                          setPrefers(null))

                      }
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/German.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Немецкий</h1>
										</div>
                  </div>
                  <Button onClick={() => setLanguageChoose(!languageChoose)} variant={language ? "violetSelect" : "shadow2"} className='w-full mt-5'>Подтвердить</Button>
                </div>
             ) :
                <div ref={contentRef} className='w-full mt-3'>
                  {language === "China" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div className='flex gap-3'>
                        <p className='w-2/5 flex items-center text-lg text-gray-400 font-medium'>Выбранный язык:</p>
                        <div 
                        className={`flex w-3/5 justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="China" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                        onClick={() => setLanguageChoose(!languageChoose)}
                        >
                          <Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/China.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
                          <h1 className="font-semibold text-base">Китайский</h1>
                        </div>
                      </div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HSK-1" className='text-base'>HSK-1</SelectItem>
                          <SelectItem value="HSK-2" className='text-base'>HSK-2</SelectItem>
                          <SelectItem value="HSK-3" className='text-base'>HSK-3</SelectItem>
                          <SelectItem value="HSK-4" className='text-base'>HSK-4</SelectItem>
                          <SelectItem value="HSK-5" className='text-base'>HSK-5</SelectItem>
                          <SelectItem value="HSK-6" className='text-base'>HSK-6</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "Korean" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="Korean" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() => setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/Korean.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Корейский</h1>	
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-гып" className='text-base'>1-гып</SelectItem>
                          <SelectItem value="2-гып" className='text-base'>2-гып</SelectItem>
                          <SelectItem value="3-гып" className='text-base'>3-гып</SelectItem>
                          <SelectItem value="4-гып" className='text-base'>4-гып</SelectItem>
                          <SelectItem value="5-гып" className='text-base'>5-гып</SelectItem>
                          <SelectItem value="6-гып" className='text-base'>6-гып</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "English" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="English" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>  setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Английский</h1>
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                  ) : ""}
                  {language === "German" ? (
                    <div className='flex gap-3 w-full flex-col'>
                      <div 
                      className={`flex justify-center items-center gap-3 border py-1 shadow-md hover:shadow-none rounded-lg hover:scale-105 transition-all cursor-pointer ${language==="German" ? "bg-[#835BD2] hover:bg-[#724fb9] border-[#835BD2] hover:border-[#724fb9] text-white" : "border-gray-100 hover:bg-purple-100 hover:border-purple-100 text-gray-500"}`}
                      onClick={() =>  setLanguageChoose(!languageChoose)}
                    >
											<Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/German.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
											<h1 className="font-semibold text-base">Немецкий</h1>
										</div>
                      <div>
                      <h1 className='text-lg text-gray-400 font-medium'>Оцените свои знания:</h1>
                      <Select onValueChange={(value) => setLevel(value)}>
                        <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder="Выберите уровень своих знаний"
                        />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a1" className='text-base'>A1</SelectItem>
                          <SelectItem value="a2" className='text-base'>A2</SelectItem>
                          <SelectItem value="b1" className='text-base'>B1</SelectItem>
                          <SelectItem value="b2" className='text-base'>B2</SelectItem>
                          <SelectItem value="c1" className='text-base'>C1</SelectItem>
                          <SelectItem value="c2" className='text-base'>C2</SelectItem>
                        </SelectContent>
                      </Select>
                      </div>
                    </div>
                    
                  ) 
                  
                  : ""}
                </div>
              }
              {language && language?.length > 3 && !languageChoose ? 
              <div className='flex gap-3 mt-3'>
                <Button className='w-1/2' variant={level? "violetSelect" : "shadow2"}
                onClick={() => {
                  if(level){
                    onSubmit()
                    fetchLanguages()
                    setOpen(false)
                  }
                }}
                >Подтвердить</Button>
                <Button className='w-1/2' variant={"shadow2"}>Отменить</Button>
              </div> 
              : 
              ""}
              {!language && !languageChoose && 
              <div>
                <Button variant={"violetSelect"} className='text-[#835BD2] gap-2 flex bg-white hover:text-white border-2 hover:bg-[#835BD2] border-[#835BD2] border-dashed w-full h-20 hover:border-solid'
                  onClick={() => {
                    setLanguageChoose(true)
                  }}
                >
                  <Image width={1000} height={1000} src={`https://storage.yandexcloud.net/langschoolacynberg/images/flags/English.png`} alt="flag" className='w-9 h-7 object-cover rounded-sm' />
                  Выбрать язык!
                </Button>
              </div>
              }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      </div>
      <UpdateUserLanguageModal language={activeLanguage} openModal={updateMDL} setOpenModal={setUpdateModal} visov={() => fetchLanguages()}/>
    </div>
  );
};

export default LanguageBox;