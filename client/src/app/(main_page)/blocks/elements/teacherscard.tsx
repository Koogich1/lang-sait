import Image from "next/image";
import React from "react";

type Props = {
  personImg: string;
  name: string;
  years: string;
  man: boolean;
  Flag: string;
};

const Teacherscard = ({ personImg, name, years, Flag, man }: Props) => {
  return (
    <div
      className={`w-full max-w-[330px] h-[400px] bg-[${man ? "#D4DDEE" : "#F2E6F2"}] rounded-3xl overflow-hidden shadow-lg`}
    >
      <Image
        className="w-[100%] h-[82%] object-cover "
        alt="teacher"
        src={personImg}
        width={200}
        height={200}
      />
      <div className="flex justify-between justify- p-3 ">
        <div>
          <h3 className="font-black">{name}</h3>
          <h3 className="font-light">{years}</h3>
        </div>
        <div>
          <Image
            className=""
            alt={Flag}
            src={`/${Flag}.png`}
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacherscard;
