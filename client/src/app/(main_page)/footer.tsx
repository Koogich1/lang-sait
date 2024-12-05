"use client";

import Image from "next/image";
import Link from "next/link";

const Footer = () => {

  return (
    <div className="w-full bg-[#3E236C] h-[18rem] absolute bottom-0 justify-center">
      <div className="flex justify-between items-end w-[100%] max-w-[1440px] px-[4.3rem] mx-auto overflow-hidden">
          <div className="flex flex-col justify-between gap-5">
            <div className='flex items-center mt-6'>
              <Image src="/logo.png" alt="logo" width={200} height={200} className='w-10 h-10' />
              <div className='lg:text-xl text-lg font-l text-white'>
                Acyberg
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <ul>
              <Link 
                href={"/"}
              >
                <li className={`p-1 px-3 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Главная
                </li>
              </Link>
              <Link 
                href={"/courses"}
              >
                <li className={`p-1 px-3 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Выбор языка
                </li>
              </Link>
              <Link 
                href={"/teachers"}
              >
                <li className={`p-1 px-3 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Преподаватели
                </li>
              </Link>
              <Link 
                href={"/contacts"}
              >
                <li className={`p-1 px-3 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Контакты
                </li>
              </Link>
              <Link 
                href={"/news"}
              >
                <li className={`p-1 px-3 rounded-md bg-none text-gray-400 hover:text-white transition-all`}>
                  Новости
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="flex flex-col text-sm text-white font-light">
            <h1>По техническим вопросам, а также вопросам поддержки обращайтесь: <span className="font-semibold">koogich@mail.ru</span></h1>
            <h1>Связь с администатором: <span className="font-semibold">zaripova_ah@mail.ru</span></h1>
          </div>
          <div className="text-gray-400 flex flex-col text-sm text-end">
            <Link href={"/politika_konfidentisalnosti"} className="hover:text-white hover:underline transition-all">
              Политика конфиденциальности
            </Link>
            <Link href={"/soglasie_na_obrabotky_konfidencialnih_dannih"} className="hover:text-white hover:underline transition-all">
              Согласие на обработку персональных данных
            </Link>
          </div>
      </div>
    </div>
  );
};

export default Footer;
