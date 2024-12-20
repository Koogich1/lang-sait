"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import "./styles.css";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";

export default function App() {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[Navigation, Pagination]}
        className="mySwiper h-[550px] align-middle flex justify-center"
        pagination={{
          clickable: true,
        }}
      >
        <div className="swiper-button-prev hidden opacity-0 md:opacity-100 md:flex items-center justify-center p-1">
          <IoIosArrowBack color="#fff" className="ml-[-0.3rem]"/>
        </div>
        <div className="swiper-button-next hidden opacity-0 md:opacity-100 md:flex rotate-180 items-center justify-center p-1">
          <IoIosArrowBack color="#fff" className="ml-[-0.3rem]"/>
        </div>
        <SwiperSlide>
          <div className="w-full lg:w-[70%] min-h-[85%] bg-[#F2E6F2] rounded-3xl shadow-lg flex justify-between overflow-hidden">
            <div className="flex flex-col justify-between p-8 py-10 items-start gap-5">
              <h1 className="text-3xl font-bold">Дошколята</h1>
              <ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Учим <span className="font-semibold">читать, писать</span>
                </li>
                <li>
                  Смотрим и разбираем{" "}
                  <span className="font-semibold">мультфильмы</span>
                </li>
                <li>Уроки по 45 минут</li>
                <li>Удобный график</li>
                <li>
                  <span className="font-semibold">Интерактивная</span> форма
                  обучения
                </li>
              </ul>
              <Button
                variant="violetSelect"
                className="font-medium p-6 w-[180px] rounded-lg bg-[#3E236C]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0 w-1/2">
              <Image
                alt="5yoBoy"
                src={"/5yoBoy.png"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full lg:w-[70%] min-h-[85%] bg-[#D9E3EF] rounded-3xl shadow-lg flex justify-between overflow-hidden">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#354E6B] w-1/2 gap-5">
              <h1 className="text-3xl font-bold">Группа 7+</h1>
              <ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Раскрой мир языков{" "}<span className="font-semibold">через игры и рассказы!</span>
                </li>
                <li>
                  Учимся весело:{" "}
                  <span className="font-semibold">читаем, играем и фантазируем!</span>
                </li>
                <li>
                  Знакомимся с новыми словами через увлекательные мультфильмы!
                </li>
                <li>
                  Творим вместе: делаем проекты и учим язык в работе!
                </li>
              </ul>
              <Button
                variant="default"
                className="font-semibold p-6 w-[180px] rounded-lg bg-[#354E6B]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0 w-1/2">
              <Image
                alt="5yoBoy"
                src={"/12yogirl.png"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full lg:w-[70%] min-h-[85%] bg-[#E1F1EB] rounded-3xl shadow-lg flex justify-between overflow-hidden">
			    	<div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#4B7564] w-1/2 gap-5">
              <h1 className="text-3xl font-bold">Группа 15+</h1>
              <ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Овладевай языком, открывая{" "} <span className="font-semibold">двери в международные карьеры!</span>
                </li>
                <li>
                  Углубляем навыки: от разговорных тем до сложных проектов!
                </li>
                <li>
                  Погружаемся в язык через{" "}<span className="font-semibold">музыку и литературу!</span>
                </li>
                <li>
                  Совершенствуй свои знания с современными материалами!
                </li>
              </ul>
              <Button
                variant="default"
                className="font-medium p-6 w-[180px] rounded-lg bg-[#354E6B] hover:bg-[#52749b]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0 w-1/2">
              <Image
                alt="17yoBoy"
                src={"/17yoBoy.png"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full lg:w-[70%] min-h-[85%] bg-[#EAE8F3] rounded-3xl shadow-lg flex justify-between overflow-hidden">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#63607A] gap-5">
              <h1 className="text-3xl font-bold">Группа 20+</h1>
              <ul className="text-start list-disc pl-5 text-base font-light">
                <li>
                  Говори на языке будущего,{" "} <span className="font-semibold">повышай свою конкурентоспособность!</span>
                </li>
                <li>
                  Научись думать и выражаться на любом языке с уверенностью!
                </li>
                <li>
                  Изучай актуальные темы и обсуждай их с партнёрами по всему миру!
                </li>
                <li>
                  Расширяй горизонты: от путешествий до карьерных возможностей!
                </li>
              </ul>
              <Button
                variant="violetSelect"
                className="font-medium p-6 w-[180px] rounded-lg bg-[#63607A] hover:bg-[#464455]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0 w-1/2">
              <Image
                alt="23yoWomen"
                src={"/23yoWomen.png"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
