"use client"

import { Button } from "../../../components/ui/button";
import Image from "next/image";
import React from "react";
import LittleEl from "./elements/littleEl";
import { LoginButton } from "../../../components/auth/login-button";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "./elements/animatedGsap";
import gsap from "gsap";

const StartBlock = () => {
  useGSAP(() => {
    gsap.from('#chip', {
      scrollTrigger: {
        trigger: '#chip',
        end: 'bottom 20%',
        scrub: true,
      },
      opacity: 0,
      duration: 2,
      ease: 'power2.inOut'
    })
  }, []);

  return (
    <div id="chip" className="w-full flex mt-[6rem] flex-col-reverse md:flex-row md:justify-between gap-[4rem] text-center md:text-start items-center">
      <div  className="flex flex-col justify-between gap-5 md:w-[700px]">
        <h1 className=" text-3xl lg:text-4xl font-bold mt-[-35px] text-[#6a49aa] pt-8">
          Научись общаться с людьми <br /> по всему миру!
        </h1>
        <h3 className="text-lg text-[#6a49aa]">
          Выберите язык и откройте новую главу в своем <br /> языковом
          путешествии с нами
        </h3>
        <LoginButton>
          <Button
            variant="violetSelect"
            className="p-7 rounded-xl w-[285px]"
          >
            Записаться на урок
          </Button>
        </LoginButton>
      </div>
      <div className="flex sm:w-full justify-center md:justify-end w-1/3">
        <Image alt="Main" src={"/mainImg.png"} width={550} height={550} className="min-w-[330px] w-full sm:w-2/3 md:w-4/5 xl:w-3/5" />
      </div>
    </div>
  );
};

export default StartBlock;
