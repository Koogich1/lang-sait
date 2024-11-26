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
    <div id="chip" className="w-full flex mt-[6rem] md:mt-[10rem] flex-col-reverse md:flex-row md:justify-between gap-[4rem] text-center md:text-start items-center ">
      <div  className="leftside">
        <h1 className="text-4xl font-bold mt-[-35px] text-[#6a49aa]">
          Научись общаться с людьми <br /> по всему миру!
        </h1>
        <h3 className="text-lg mt-5 text-[#6a49aa]">
          Выберите язык и откройте новую главу в своем <br /> языковом
          путешествии с LingSait
        </h3>
        <LoginButton>
          <Button
            variant="violetSelect"
            className="p-7 rounded-xl w-[285px] mt-5"
          >
            Записаться на урок
          </Button>
        </LoginButton>
      </div>
      <div className="rightside">
        <Image alt="Main" src={"/mainImg.png"} width={550} height={550} className="min-w-[330px]" />
      </div>
    </div>
  );
};

export default StartBlock;
