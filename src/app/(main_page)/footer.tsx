"use client";

import { Button } from "../../components/ui/button";
import Image from "next/image";
import { useState } from "react";

const Footer = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-[100%] h-[300px] bg-[#3E236C] mt-[100px] flex justify-center">
      <div
        className={`w-[90%] max-w-[1440px] mx-auto text-[#fff] relative`}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <Button
          variant="info"
          className={`text-[#63607A] border-[#63607A] pr-10 relative ease-in delay-150 transition-opacity duration-150 ${active ? "text-transparent w-0 p-0 ml-[40px] border-0к" : ""}`}
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
    </div>
  );
};

export default Footer;
