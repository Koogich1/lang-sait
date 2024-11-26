"use client";

import { Button } from "../../../components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

const Programs = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  return (
    <div className="w-[100%] flex mt-[140px] flex-col items-end">
      <h1 className="text-4xl font-bold text-center md:text-start text-[#6a49aa]">Подберем программу под ваши цели</h1>
      <div className="hidden md:block">
        <div className="flex w-[100%] pb-5 mt-[60px]">
          <a
            href="#"
            className="w-[45%] h-[280px] bg-[#DEEDE7] rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
          >
            <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#4B7564]">
              <h1 className="font-semibold text-3xl">Для жизни</h1>
              <h3 className="">
                Уверенно общайтесь в путешествиях, при переезде и на работе
              </h3>
              <Button
              className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#4B7564] px-0 py-0 transition-all ${active ? "pl-[5.5rem] text-[#63607A]" : ""}`}
              >
                <div className={`bg-[#4B7564] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active ? "text-white" : ""}`}>
                  <FaArrowRight />
                </div>
                <h1 className={`absolute left-2 text-[#4B7564] transition-all ${active ? "block" : "hidden"}`}>
                    Подробнее
                </h1>
              </Button>
            </div>
            <div className="w-[50%] items-center flex p-7 m-0">
              <Image alt="bag" src={"/bag.png"} width={350} height={0} />
            </div>
          </a>
          <a
            href="#"
            className="w-[60%] h-[280px] bg-[#DDDBE8] ml-5 rounded-3xl flex shadow-lg select-none cursor-pointer"
            onMouseEnter={() => setActive2(true)}
            onMouseLeave={() => setActive2(false)}
          >
            <div className="w-[70%] items-start flex flex-col justify-between p-7 text-[#63607A]">
              <h1 className="font-semibold text-3xl">Для карьеры</h1>
              <h3 className="">
                Продвигайтесь по карьерной лестнице с уверенностью, эффективно
                общаясь с международными коллегами и клиентами
              </h3>
              <Button
              className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#63607A] px-0 py-0 transition-all ${active2 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
              >
                <div className={`bg-[#63607A] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active2 ? "text-white" : ""}`}>
                  <FaArrowRight />
                </div>
                <h1 className={`absolute left-2 text-[#63607A] transition-all ${active2 ? "block" : "hidden"}`}>
                    Подробнее
                </h1>
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
            className="w-[60%] h-[280px] bg-[#D7E3F1] rounded-3xl flex shadow-lg select-none cursor-pointer"
            onMouseEnter={() => setActive3(true)}
            onMouseLeave={() => setActive3(false)}
          >
            <div className="w-[65%] items-start flex flex-col justify-between p-7 text-[#4D6785]">
              <h1 className="font-semibold text-3xl">Экзамены и ЕГЭ</h1>
              <h3 className="">
                Уверенно общайтесь в путешествиях, при переезде и на работе
              </h3>
              <Button
              className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#63607A] px-0 py-0 transition-all ${active3 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
              >
                <div className={`bg-[#4D6785] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active3 ? "text-white" : ""}`}>
                  <FaArrowRight />
                </div>
                <h1 className={`absolute left-2 text-[#4D6785] transition-all ${active3 ? "block" : "hidden"}`}>
                    Подробнее
                </h1>
              </Button>
            </div>
            <div className="w-[35%] items-center flex p-7 m-0">
              <Image alt="book" src={"/book.png"} width={400} height={0} />
            </div>
          </a>
          <a
            href="#"
            className="w-[45%] h-[280px] bg-[#E8D0E8] ml-5 rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
            onMouseEnter={() => setActive4(true)}
            onMouseLeave={() => setActive4(false)}
          >
            <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#8B4E8B]">
              <h1 className="font-semibold text-3xl">Путешествия</h1>
              <h3 className="">
                Путешествуйте уверенно с английским: общайтесь, знакомьтесь, исследуйте
              </h3>
              <Button
              className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#8B4E8B] px-0 py-0 transition-all ${active4 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
              >
                <div className={`bg-[#8B4E8B] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active4 ? "text-white" : ""}`}>
                  <FaArrowRight />
                </div>
                <h1 className={`absolute left-2 text-[#8B4E8B] transition-all ${active4 ? "block" : "hidden"}`}>
                    Подробнее
                </h1>
              </Button>
            </div>
            <div className="w-[50%] items-center flex p-0 m-0 scale-110 pt-7">
              <Image alt="bicycle" src={"/bicycle.png"} width={500} height={0} />
            </div>
          </a>
        </div>
      </div>
      <div className="block mt-10 md:hidden">
          <div className="flex flex-col gap-5">
            <a
              href="#"
              className="w-full h-[280px] bg-[#DEEDE7] rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
              onMouseEnter={() => setActive(true)}
              onMouseLeave={() => setActive(false)}
            >
              <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#4B7564]">
                <h1 className="font-semibold text-3xl">Для жизни</h1>
                <h3 className="">
                  Уверенно общайтесь в путешествиях, при переезде и на работе
                </h3>
                <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#4B7564] px-0 py-0 transition-all ${active ? "pl-[5.5rem] text-[#63607A]" : ""}`}
                >
                  <div className={`bg-[#4B7564] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active ? "text-white" : ""}`}>
                    <FaArrowRight />
                  </div>
                  <h1 className={`absolute left-2 text-[#4B7564] transition-all ${active ? "block" : "hidden"}`}>
                      Подробнее
                  </h1>
                </Button>
              </div>
              <div className="w-[50%] items-center flex p-7 m-0">
                <Image alt="bag" src={"/bag.png"} width={350} height={0} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#DDDBE8] rounded-3xl flex shadow-lg select-none cursor-pointer"
              onMouseEnter={() => setActive2(true)}
              onMouseLeave={() => setActive2(false)}
            >
              <div className="w-[70%] items-start flex flex-col justify-between p-7 text-[#63607A]">
                <h1 className="font-semibold text-3xl">Для карьеры</h1>
                <h3 className="">
                  Продвигайтесь по карьерной лестнице с уверенностью, эффективно
                  общаясь с международными коллегами и клиентами
                </h3>
                <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#63607A] px-0 py-0 transition-all ${active2 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
                >
                  <div className={`bg-[#63607A] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active2 ? "text-white" : ""}`}>
                    <FaArrowRight />
                  </div>
                  <h1 className={`absolute left-2 text-[#63607A] transition-all ${active2 ? "block" : "hidden"}`}>
                      Подробнее
                  </h1>
                </Button>
              </div>
              <div className="w-[40%] items-center flex p-7 m-0">
                <Image alt="pidj" src={"/pidj.png"} width={350} height={0} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#D7E3F1] rounded-3xl flex shadow-lg select-none cursor-pointer"
              onMouseEnter={() => setActive3(true)}
              onMouseLeave={() => setActive3(false)}
            >
              <div className="w-[65%] items-start flex flex-col justify-between p-7 text-[#4D6785]">
                <h1 className="font-semibold text-3xl">Экзамены и ЕГЭ</h1>
                <h3 className="">
                  Уверенно общайтесь в путешествиях, при переезде и на работе
                </h3>
                <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#63607A] px-0 py-0 transition-all ${active3 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
                >
                  <div className={`bg-[#4D6785] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active3 ? "text-white" : ""}`}>
                    <FaArrowRight />
                  </div>
                  <h1 className={`absolute left-2 text-[#4D6785] transition-all ${active3 ? "block" : "hidden"}`}>
                      Подробнее
                  </h1>
                </Button>
              </div>
              <div className="w-[35%] items-center flex p-7 m-0">
                <Image alt="book" src={"/book.png"} width={400} height={0} />
              </div>
            </a>
            <a
              href="#"
              className="w-full h-[280px] bg-[#E8D0E8] rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
              onMouseEnter={() => setActive4(true)}
              onMouseLeave={() => setActive4(false)}
            >
              <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#8B4E8B]">
                <h1 className="font-semibold text-3xl">Путешествия</h1>
                <h3 className="">
                  Путешествуйте уверенно: общайтесь, знакомьтесь, исследуйте
                </h3>
                <Button
                className={`bg-white relative hover:shadow-md hover:bg-gray-100 rounded-full border border-[#8B4E8B] px-0 py-0 transition-all ${active4 ? "pl-[5.5rem] text-[#63607A]" : ""}`}
                >
                  <div className={`bg-[#8B4E8B] w-10 h-10 rounded-full flex items-center justify-center text-xl ${active4 ? "text-white" : ""}`}>
                    <FaArrowRight />
                  </div>
                  <h1 className={`absolute left-2 text-[#8B4E8B] transition-all ${active4 ? "block" : "hidden"}`}>
                      Подробнее
                  </h1>
                </Button>
              </div>
              <div className="w-[50%] items-center flex p-0 m-0 scale-110 pt-7">
                <Image alt="bicycle" src={"/bicycle.png"} width={500} height={0} />
              </div>
            </a>
          </div>
      </div>
    </div>
  );
};

export default Programs;
