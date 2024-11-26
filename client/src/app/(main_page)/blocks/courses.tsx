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
    <div id="courses" className="flex justify-end w-[100%] mt-[20%] flex-col">
      <h1 className="text-4xl text-right leading-[3rem] font-bold hidden md:block md:text-center text-[#6a49aa]">
        Индивидуальные уроки <br />с профессиональными педагогами
      </h1>
      <h1 className="text-4xl font-bold md:hidden text-center">
        индивидуальные уроки языков
      </h1>
        <div className="hidden justify-center gap-5 items-end md:items-center mt-[20px] lg:flex lg:mt-[100px] lg:flex-row">
        <Card
          courseName="Уроки китайского для начинающих с нуля онлайн!"
          courseLable="Для кого:"
          li1="Кто хочет путешествовать или переехать в Китай"
          li2="Работать с китайскими поставщиками или трендовыми сайтами Китая "
          li3="Кто видит преимущества знания китайского в карьере и бизнесе"
          li4="Познакомиться по ближе с культурой востока"
          li5={null}
          gradient={false}
          language="china"
        />
        <Card
          courseName="Преимущества занятий онлайн!"
          courseLable=""
          li1="экономия времени на транспорт"
          li2="возможность выбора опытных, сертифицированных преподавателей"
          li3="изучать язык в комфортной для себя обстановке"
          li4={null}
          li5={null}
          gradient={true}
          language="none"
        />
        <Card
          courseName="Уроки корейского языка для начинающих с нуля онлайн!"
          courseLable="Для чего Вам учить корейский язык:"
          li1="Изучение корейского языка дает преимущество на рынке труда"
          li2="Вы лучше оцените корейские фильмы и сериалы"
          li3="48 групповых занятий за 8 или 12 недель"
          li4={"для путешествий (корейский язык один из самых распространенных языков в мире)"}
          li5={null}
          gradient={false}
          language="korean"
        />
      </div>
        <div className="flex lg:hidden w-full">
          <Swiper
            spaceBetween={50}
            modules={[Navigation, Pagination]}
            className="mySwiper w-full align-middle flex justify-center mt-[40px]"
            pagination={{
              clickable: true,
            }}
          >
            <SwiperSlide>
              <Card
                courseName="Уроки китайского для начинающих с нуля онлайн!"
                courseLable="Для кого:"
                li1="Кто хочет путешествовать или переехать в Китай"
                li2="Работать с китайскими поставщиками или трендовыми сайтами Китая "
                li3="Кто видит преимущества знания китайского в карьере и бизнесе"
                li4="Познакомиться по ближе с культурой востока"
                li5={null}
                gradient={false}
                language="china"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                courseName="Преимущества занятий онлайн!"
                courseLable=""
                li1="экономия времени на транспорт"
                li2="возможность выбора опытных, сертифицированных преподавателей"
                li3="изучать язык в комфортной для себя обстановке"
                li4={null}
                li5={null}
                gradient={true}
                language="none"
              />
            </SwiperSlide>
            <SwiperSlide>
              <Card
                courseName="Уроки корейского языка для начинающих с нуля онлайн!"
                courseLable="Для чего Вам учить корейский язык:"
                li1="Изучение корейского языка дает преимущество на рынке труда"
                li2="Вы лучше оцените корейские фильмы и сериалы"
                li3="48 групповых занятий за 8 или 12 недель"
                li4={"для путешествий (корейский язык один из самых распространенных языков в мире)"}
                li5={null}
                gradient={false}
                language="korean"
              />
            </SwiperSlide>
          </Swiper>
      </div>
    </div>
  );
};
export default Courses;
