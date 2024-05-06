"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import "./styles.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";
import SwiperNavButtons from "./swiperNavButtons";

export default function App() {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={30}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="mySwiper h-[500px] align-middle flex justify-center mt-[40px]"
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <div className="w-[70%] h-[85%] bg-[#F2E6F2] rounded-3xl shadow-lg flex justify-between">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start">
              <h1 className="text-3xl font-bold">Дошколята</h1>
              <ul className="text-start list-disc pl-5 text-xl font-light">
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
                className="font-bold p-6 w-[180px] rounded-lg bg-[#3E236C]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0">
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
          <div className="w-[70%] h-[85%] bg-[#D9E3EF] rounded-3xl shadow-lg flex justify-between">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#354E6B]">
              <h1 className="text-3xl font-bold">Группа 7+</h1>
              <ul className="text-start list-disc pl-5 text-xl font-light">
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
                className="font-bold p-6 w-[180px] rounded-lg bg-[#354E6B]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0">
              <Image
                alt="12yogirl"
                src={"/12yogirl.png"}
                width={1000}
                height={1000}
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-[70%] h-[85%] bg-[#E1F1EB] rounded-3xl shadow-lg flex justify-between">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#4B7564]">
              <h1 className="text-3xl font-bold">Группа 15+</h1>
              <ul className="text-start list-disc pl-5 text-xl font-light">
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
                className="font-bold p-6 w-[180px] rounded-lg bg-[#4B7564]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0">
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
          <div className="w-[70%] h-[85%] bg-[#EAE8F3] rounded-3xl shadow-lg flex justify-between">
            <div className="flex flex-col justify-between p-8 pt-10 pb-10 items-start text-[#63607A]">
              <h1 className="text-3xl font-bold">Группа 20+</h1>
              <ul className="text-start list-disc pl-5 text-xl font-light">
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
                className="font-bold p-6 w-[180px] rounded-lg bg-[#63607A]"
              >
                Выбрать
              </Button>
            </div>
            <div className="right-0">
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
