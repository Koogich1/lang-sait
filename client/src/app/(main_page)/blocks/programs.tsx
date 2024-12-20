"use client";

import { Button } from "../../../components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Programs = () => {
  return (
    <div className="w-[100%] flex mt-[6%] flex-col md:items-end pb-10">
      <h1 className="text-3xl lg:text-4xl font-bold text-center md:text-start text-[#6a49aa] mt-[3rem] sm:mt-0">Подберем программу под ваши цели</h1>
      <div className="hidden md:block">
        <div className="flex w-[100%] pb-5 mt-[20px] sm:mt-[40px]">
          <a
            href="#"
            className="w-[45%] h-[280px] bg-[#DEEDE7] hover:bg-[#c8d8d1] rounded-3xl flex justify-between shadow-lg select-none cursor-pointer transition-all"
          >
            <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#4B7564]">
              <h1 className="font-semibold text-3xl">Для жизни</h1>
              <h3 className="hidden lg:block">
                  Уверенно общайтесь в путешествиях, при переезде и на работе
                </h3>
                <h3 className="lg:hidden">
                  Уверенно общайтесь
                </h3>
              <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
              >
                <h1 className={`text-[#4B7564] transition-all pl-2 pr-1`}>
                  Подробнее
                </h1>
                <div className={`bg-[#4B7564] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                  <FaArrowRight />
                </div>
              </Button>
            </div>
            <div className="w-[50%] items-center flex p-7 m-0">
              <Image alt="bag" src={"/bag.png"} width={350} height={0} />
            </div>
          </a>
          <a
            href="#"
            className="w-[60%] h-[280px] bg-[#DDDBE8] hover:bg-[#ccc9d9] ml-5 rounded-3xl flex shadow-lg select-none cursor-pointer transition-all"
          >
            <div className="w-[70%] items-start flex flex-col justify-between p-7 text-[#63607A]">
              <h1 className="font-semibold text-3xl">Для карьеры</h1>
              <h3 className="">
                Продвигайтесь по карьерной лестнице с уверенностью, эффективно
                общаясь с международными коллегами и клиентами
              </h3>
              <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full  px-0 py-0 transition-all`}
              >
                <h1 className={`text-[#63607A] transition-all pl-2 pr-1`}>
                  Подробнее
                </h1>
                <div className={`bg-[#63607A] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                  <FaArrowRight />
                </div>
              </Button>
            </div>
            <div className="w-[30%] items-center flex p-7 m-0">
              <Image alt="pidj" src={"/pidj.png"} width={350} height={0} />
            </div>
          </a>
        </div>
        <div className="flex w-[100%]">
          <a
            href="#"
            className="w-[60%] h-[280px] bg-[#D7E3F1] hover:bg-[#bfccdb] rounded-3xl flex shadow-lg select-none cursor-pointer transition-all"
          >
            <div className="w-[65%] items-start flex flex-col justify-between p-7 text-[#4D6785]">
              <h1 className="font-semibold text-3xl">Экзамены и ЕГЭ</h1>
              <h3 className="">
                Подготовитесь и успешно сдадите экзамены!
              </h3>
              <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
              >
                <h1 className={`text-[#4D6785] transition-all pl-2 pr-1`}>
                  Подробнее
                </h1>
                <div className={`bg-[#4D6785] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                  <FaArrowRight />
                </div>
              </Button>
            </div>
            <div className="w-[35%] items-center flex p-7 m-0">
              <Image alt="book" src={"/book.png"} width={400} height={0} />
            </div>
          </a>
          <a
            href="#"
            className="w-[45%] h-[280px] bg-[#E8D0E8] hover:bg-[#d4bad4] ml-5 rounded-3xl flex justify-between shadow-lg select-none cursor-pointer transition-all"
          
          >
            <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#8B4E8B]">
              <h1 className="font-semibold text-3xl">Путешествия</h1>
              <h3 className="">
                Путешествуйте уверенно: общайтесь, знакомьтесь, исследуйте
              </h3>
              <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
              >
                <h1 className={`text-[#8B4E8B] transition-all pl-2 pr-1`}>
                  Подробнее
                </h1>
                <div className={`bg-[#8B4E8B] w-9 h-9  rounded-full flex items-center justify-center text-xl`}>
                  <FaArrowRight />
                </div>
              </Button>
            </div>
            <div className="w-[50%] items-center flex p-0 m-0 scale-110 pt-7">
              <Image alt="bicycle" src={"/bicycle.png"} width={500} height={0} />
            </div>
          </a>
        </div>
      </div>
      <div className="block mt-5 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#"
              className="w-full h-[280px] bg-[#DEEDE7] rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
            >
              <div className="w-[50%] items-start flex flex-col justify-between p-5 text-[#4B7564]">
                <h1 className="font-semibold text-2xl">Для жизни</h1>
                <h3 className="">
                  Уверенно общайтесь в путешествиях, при переезде и на работе
                </h3>
                <Button
                  className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
                >
                  <h1 className={`text-[#4B7564] transition-all pl-2 pr-1`}>
                    Подробнее
                  </h1>
                  <div className={`bg-[#4B7564] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                    <FaArrowRight />
                  </div>
                </Button>
              </div>
              <div className="w-[50%] items-center flex p-2 m-0 sm:p-12">
                <Image alt="bag" src={"/bag.png"} width={350} height={0} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#DDDBE8] rounded-3xl flex shadow-lg select-none cursor-pointer"
            >
              <div className="w-[70%] items-start flex flex-col justify-between p-5 text-[#63607A]">
                <h1 className="font-semibold text-2xl">Для карьеры</h1>
                <h3 className="">
                  Продвигайтесь по карьерной лестнице с уверенностью, эффективно
                  общаясь с международными коллегами и клиентами
                </h3>
                <Button
                  className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full  px-0 py-0 transition-all`}
                >
                  <h1 className={`text-[#63607A] transition-all pl-2 pr-1`}>
                    Подробнее
                  </h1>
                  <div className={`bg-[#63607A] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                    <FaArrowRight />
                  </div>
                </Button>
              </div>
              <div className="w-[40%] items-center flex p-1 m-0 sm:p-7">
                <Image alt="pidj" src={"/pidj.png"} width={350} height={0} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#D7E3F1] rounded-3xl flex shadow-lg select-none cursor-pointer"
            >
              <div className="w-[65%] items-start flex flex-col justify-between p-5 text-[#4D6785]">
                <h1 className="font-semibold text-2xl">Экзамены и ЕГЭ</h1>
                <h3 className="">
                  Подготовитесь и успешно сдадите экзамены!
                </h3>
                <Button
                  className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
                >
                  <h1 className={`text-[#4D6785] transition-all pl-2 pr-1`}>
                    Подробнее
                  </h1>
                  <div className={`bg-[#4D6785] w-9 h-9 rounded-full flex items-center justify-center text-xl`}>
                    <FaArrowRight />
                  </div>
                </Button>
              </div>
              <div className="w-[40%] items-center flex p-7 m-0 scale-150 sm:scale-100">
                <Image alt="book" src={"/book.png"} width={500} height={500} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#E8D0E8] z-50 rounded-3xl flex justify-between shadow-lg select-none cursor-pointer transition-all"
            >
              <div className="w-[50%] items-start flex flex-col justify-between p-5 text-[#8B4E8B]">
                <h1 className="font-semibold text-2xl">Путешествия</h1>
                <h3 className="">
                  Путешествуйте уверенно: общайтесь, знакомьтесь, исследуйте
                </h3>
                <Button
                  className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full px-0 py-0 transition-all`}
                >
                  <h1 className={`text-[#8B4E8B] transition-all pl-2 pr-1`}>
                    Подробнее
                  </h1>
                  <div className={`bg-[#8B4E8B] w-9 h-9  rounded-full flex items-center justify-center text-xl`}>
                    <FaArrowRight />
                  </div>
                </Button>
              </div>
              <div className="w-[50%] items-center flex p-0 m-0 sm:p-4 scale-110 pt-7">
                <Image alt="bicycle" src={"/bicycle.png"} width={500} height={500} />
              </div>
            </a>
          </div>
      </div>
    </div>
  );
};

export default Programs;
