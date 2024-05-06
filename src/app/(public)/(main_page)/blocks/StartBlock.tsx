import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import LittleEl from "./elements/littleEl";

const StartBlock = () => {
  return (
    <div className="w-[100%] flex justify-between items-center h-[85vh]">
      <LittleEl />
      <div className="leftside">
        <h1 className="text-4xl font-bold mt-[-35px]">
          Научись общаться с людьми <br /> по всему миру!
        </h1>
        <h3 className="text-lg mt-5">
          Выберите язык и откройте новую главу в своем <br /> языковом
          путешествии с LingSait
        </h3>
        <Button
          variant="violetSelect"
          className="p-7 rounded-xl w-[285px] mt-5"
        >
          Записаться на урок
        </Button>
      </div>
      <div className="rightside">
        <Image alt="Main" src={"/mainImg.png"} width={550} height={550} />
      </div>
    </div>
  );
};

export default StartBlock;
