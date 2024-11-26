import React from "react";
import Teacherscard from "./elements/teacherscard";
import { Button } from "../../../components/ui/button";

const Teachers = () => {
  return (
    <div className="w-[100%] align-middle flex flex-col justify-center pt-10">
      <h1 className="mt-[120px] text-3xl font-bold">Наши преподаватели</h1>
      <h3 className="mt-3 text-lg font-light w-[40%] leading-6">
        Лидеры в своих областях, делящиеся своими знаниями и опытом, чтобы
        расширить горизонты наших учеников.
      </h3>
    </div>
  );
};

export default Teachers;
