"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {

  return (
    <div className="w-full bg-[#3E236C] h-[18rem] absolute bottom-0 justify-start">
      <div className="flex justify-between items-start w-[100%] max-w-[1440px] mt-[2.7rem] md:px-[4.3rem] px-[5%] mx-auto overflow-hidden">
          <div className="flex items-center p-2 py-1 rounded-lg shadow-lg border border-gray-600">
            <Image src="/logo.png" alt="logo" width={200} height={200} className='w-10 h-10 lg:w-12 lg:h-12' />
            <div className='text-lg lg:text-2xl font-lg text-white'>
              Acyberg
            </div>
          </div>
          <div className="flex-col justify-between hidden md:flex">
            <p className="text-lg text-white ml-1">Навигация:</p>
            <div className="flex flex-col gap-2 mt-3">
              <ul>
              <Link 
                href={"/"}
              >
                <li className={`p-1 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Главная
                </li>
              </Link>
              <Link 
                href={"/courses"}
              >
                <li className={`p-1 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Выбор языка
                </li>
              </Link>
              <Link 
                href={"/teachers"}
              >
                <li className={`p-1 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Преподаватели
                </li>
              </Link>
              <Link 
                href={"/contacts"}
              >
                <li className={`p-1 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Контакты
                </li>
              </Link>
              <Link 
                href={"/news"}
              >
                <li className={`p-1 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Новости
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="md:flex flex-col justify-between gap-3 hidden">
            <h1 className="text-lg text-white ml-1">По вопросам:</h1>
            <div className="text-base text-gray-400">
              <p>Технической поодержки:</p>
              <p className="text-white">Koogich@mail.ru</p>
            </div>
            <div className="text-base text-gray-400">
              <p>Сотрудничества:</p>
              <p className="text-white">Acyberg@mail.ru</p>
            </div>
          </div>
          <div className="flex flex-col justify-between gap-2">
            <h1 className="text-lg text-white">Мы в соц сетях:</h1>
            <Link href={"https://vk.com"} className="px-3 py-1 border border-gray-600 flex items-center justify-center rounded-md shadow-md text-gray-400 hover:text-white hover:border-white transition-all">
              <div className="text-base flex gap-1 w-[120px] md:w-[170px] justify-between items-center">
                <p>
                  Вконтакте
                </p>
                <Image src={'/vk.png'} alt="logo" width={30} height={30} />
              </div>
            </Link>
            <Link href={"https://ya.ru"} className="px-3 py-1 border border-gray-600 flex items-center justify-center rounded-md shadow-md text-gray-400 hover:text-white hover:border-white transition-all">
              <div className="text-base flex gap-1 w-[120px] md:w-[170px] justify-between items-center">
                <p>
                  Яндекс
                </p>
                  <Image src={'/ya.png'} alt="logo" width={30} height={30} />
              </div>
            </Link>
            <Link href={"/soglasie_na_obrabotky_konfidencialnih_dannih"}>
              <Button className="text-xs md:text-base text-white gap-1 p-3 font-normal shadow-lg h-[3.5rem] text-center flex items-center justify-center" variant={"violetSelect"}>
                <p className="text-center">
                  Политика <br/> конфиденциальности
                </p>
              </Button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Footer;
