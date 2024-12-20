'use client'

import Card from "./elements/card";


import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./elements/styles.css";

import { Pagination, Navigation } from "swiper/modules";
import { animateWithGsap } from "./elements/animatedGsap";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Courses = () => {
  useGSAP(() => {
    gsap.from('#courses', {
      scrollTrigger: {
        trigger: '#courses',
        end: 'bottom 20%',
        scrub: true,
      },
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <div id="courses" className="flex justify-end w-[100%] mt-[8%] flex-col">
      <h1 className="text-3xl lg:text-4xl text-right leading-[3rem] font-bold hidden md:block md:text-center text-[#6a49aa]">
        Индивидуальные уроки <br />с профессиональными педагогами
      </h1>
      <h1 className=" text-3xl font-bold text-[#6a49aa] pt-8 text-center mt-[6%] md:hidden">
        Индивидуальные уроки языков
      </h1>
        <div className="flex flex-col md:flex-row justify-center gap-5 items-center md:items-center mt-[20px] lg:flex-row">
          <div className="w-full sm:w-2/3 md:w-1/2 flex justify-center">
            <div className="bg-[#f20520] w-full p-4 mt-5 h-[340px] md:h-[360px] lg:h-[320px] overflow-hidden relative md:min-h-[310px] flex flex-col justify-between rounded-xl shadow-lg">
            <Image src={"/dragon.png"} width={500} height={500} alt="dragonBg" className="absolute left-0 top-[-50px] opacity-35 w-full z-0"/>
            <h1 className="text-[#f7e627] text-2xl z-50" style={{fontFamily: "Belepotan"}}>
              Уроки китайского для начинающих!
            </h1>
            <div className="z-50 text-white text-sm" style={{fontFamily: "Belepotan"}}>
              <p className="text-lg text-[#f7e627]">Для кого:</p>
              <ul className="flex flex-col xl:w-2/3">
                <li>Кто хочет путешествовать или переехать в Китай</li>
                <div className="w-1/3 bg-white h-[1px] opacity-10" />
                <li>Работать с китайскими поставщиками или трендовыми сайтами Китая</li>
                <div className="w-1/3 bg-white h-[1px] opacity-10" />
                <li>Кто видит преимущества знания китайского в карьере и бизнесе</li>
                <div className="w-1/3 bg-white h-[1px] opacity-10" />
                <li>Познакомиться по ближе с культурой востока</li>
              </ul>
            </div>
            <Link href={"/"} className="z-50">
              <Button className="z-100 w-full lg:w-[150px] bg-white text-[#f20520] text-base font-semibold hover:bg-gray-200">
                Перейти
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-2/3 md:w-1/2 flex justify-center">
          <div className="bg-[#ffe2ef] w-full mt-5 p-4 overflow-hidden h-[340px] md:h-[360px] lg:h-[320px] relative text-end min-h-[310px] flex flex-col justify-between rounded-xl shadow-lg">
          <Image 
              src={"/sacura2.png"} 
              width={500} 
              height={500} 
              alt="dragonBg" 
              className="absolute left-[-40px] bottom-[-20px] opacity-25 z-0"
          />          
          <h1 className="text-[#b82761] text-[1.4rem] z-50" style={{fontFamily: "Belepotan"}}>
            Уроки корейского языка для начинающих!
          </h1>
          <div className="z-50 text-[#b82761] text-sm font-medium leading-6 w-full flex flex-col items-end" style={{fontFamily: "Belepotan"}}>
            <p className="text-lg">Для чего Вам учить корейский язык: </p>
            <ul className="flex flex-col leading-5 xl:w-2/3 justify-end items-end w-full">
              <li>Изучение корейского языка дает преимущество на рынке труда</li>
              <div className="w-1/3 bg-[#b82761] h-[1px] opacity-10" />
              <li>Вы лучше оцените корейские фильмы и сериалы</li>
              <div className="w-1/3 bg-[#b82761] h-[1px] opacity-10" />
              <li>Для путешествий (корейский язык один из самых распространенных языков в мире)</li>
            </ul>
          </div>
          <Link href={"/"} className="z-50">
            <Button  className="z-100 w-full lg:w-[150px] bg-white text-[#b82761] text-base font-semibold hover:bg-[#b82761] hover:text-white">
              Подробнее
            </Button>
          </Link>
          
         </div>
        </div>
      </div>
    </div>
  );
};
export default Courses;
