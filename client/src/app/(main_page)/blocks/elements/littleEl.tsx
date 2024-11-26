import Image from "next/image";
import React from "react";

import "./styles.css";

const LittleEl = () => {
  return (
    <div className="absolute w-[50px] h-[50px] mb-[30%]">
      <Image
        className="absolute w-[50px] h-[50px]"
        alt="book"
        src={"/booklit.png"}
        width={60}
        height={60}
      />
    </div>
  );
};

export default LittleEl;
