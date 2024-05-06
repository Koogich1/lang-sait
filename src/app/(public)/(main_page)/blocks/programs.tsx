"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

const Programs = () => {
  const [active, setActive] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  return (
    <div className="w-[100%] flex mt-[140px] flex-col items-end">
      <h1 className="text-4xl font-bold">Подберем программу под ваши цели</h1>
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
              variant="info"
              className={`text-[#63607A] border-[#63607A] pr-10 relative ease-in delay-150 transition-opacity duration-150 ${active ? "" : "text-transparent w-0 p-0 ml-[40px] border-0к"}`}
            >
              <span className="p-2">Подробнее</span>
              <div className="w-[40px] h-[40px] bg-[#63607A] right-0 rounded-full text-[#fff] align-middle text-xl flex justify-center absolute transition-all">
                <Image
                  className="h-[40%] w-[50%] mt-3 rotate-180"
                  alt="arrow"
                  src={"/arrow.png"}
                  width={300}
                  height={300}
                />
              </div>
            </Button>
          </div>
          <div className="w-[50%] items-center flex p-7 m-0">
            <Image alt="bag" src={"/bag.png"} width={350} height={0} />
          </div>
        </a>
        <a
          href="#"
          className="w-[60%] h-[280px] bg-[#DDDBE8] ml-5 rounded-3xl flex shadow-lg select-none cursor-pointer"
        >
          <div className="w-[70%] items-start flex flex-col justify-between p-7 text-[#63607A]">
            <h1 className="font-semibold text-3xl">Для карьеры</h1>
            <h3 className="">
              Продвигайтесь по карьерной лестнице с уверенностью, эффективно
              общаясь с международными коллегами и клиентами
            </h3>
            <Button
              variant="info"
              className="text-[#63607A] border-[#63607A] p-0"
            >
              <span className="p-2">Подробнее</span>
              <div className="w-[40px] h-[40px] bg-[#63607A] right-0 rounded-full text-[#fff] align-middle text-xl flex justify-center">
                <Image
                  className="h-[40%] w-[50%] mt-3 rotate-180"
                  alt="arrow"
                  src={"/arrow.png"}
                  width={300}
                  height={300}
                />
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
          className="w-[60%] h-[280px] bg-[#D7E3F1] rounded-3xl flex shadow-lg select-none cursor-pointer"
        >
          <div className="w-[65%] items-start flex flex-col justify-between p-7 text-[#4D6785]">
            <h1 className="font-semibold text-3xl">Экзамены и ЕГЭ</h1>
            <h3 className="">
              Уверенно общайтесь в путешествиях, при переезде и на работе
            </h3>
            <Button
              variant="info"
              className="text-[#4D6785] border-[#4D6785] p-0"
            >
              <span className="p-2">Подробнее</span>
              <div className="w-[40px] h-[40px] bg-[#4D6785] right-0 rounded-full text-[#fff] align-middle text-xl flex justify-center">
                <Image
                  className="h-[40%] w-[50%] mt-3 rotate-180"
                  alt="arrow"
                  src={"/arrow.png"}
                  width={300}
                  height={300}
                />
              </div>
            </Button>
          </div>
          <div className="w-[35%] items-center flex p-7 m-0">
            <Image alt="book" src={"/book.png"} width={400} height={0} />
          </div>
        </a>
        <a
          href="#"
          className="w-[45%] h-[280px] bg-[#DEEDE7] ml-5 rounded-3xl flex justify-between shadow-lg select-none cursor-pointer"
        >
          <div className="w-[50%] items-start flex flex-col justify-between p-7 text-[#4B7564]">
            <h1 className="font-semibold text-3xl">Для жизни</h1>
            <h3 className="">
              Уверенно общайтесь в путешествиях, при переезде и на работе
            </h3>
            <Button
              variant="info"
              className="text-[#4B7564] border-[#4B7564] p-0"
            >
              <span className="p-2">Подробнее</span>
              <div className="w-[40px] h-[40px] bg-[#4B7564] right-0 rounded-full text-[#fff] align-middle text-xl flex justify-center">
                <Image
                  className="h-[40%] w-[50%] mt-3 rotate-180"
                  alt="arrow"
                  src={"/arrow.png"}
                  width={300}
                  height={300}
                />
              </div>
            </Button>
          </div>
          <div className="w-[50%] items-center flex p-0 m-0 scale-110 pt-7">
            <Image alt="bicycle" src={"/bicycle.png"} width={500} height={0} />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Programs;
