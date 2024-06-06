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
      <div className="flex justify-between mt-[50px]">
        <Teacherscard
          personImg="/teach1.jpg"
          name="Евпатия Колесникова"
          years="10+ лет опыта работы"
          Flag="ch"
          man={false}
        />
        <Teacherscard
          personImg="/teach2.jpg"
          name="Евпатий Колесников"
          years="0+ лет опыта работы"
          Flag="en"
          man={true}
        />
        <Teacherscard
          personImg="/teach3.jpg"
          name="Генадий Шпаклеков"
          years="50+ лет опыта работы"
          Flag="gr"
          man={true}
        />

        <Teacherscard
          personImg="/teach4.jpg"
          name="Ирина Шпаклин"
          years="7+ лет опыта работы"
          Flag="en"
          man={false}
        />
      </div>
      <div className="flex justify-center mt-[50px]">
        <Button
          variant="violetSelect"
          className="p-8 pr-10 pl-10 rounded-3xl w-[350px]"
        >
          Перейти к полному списку
        </Button>
      </div>
    </div>
  );
};

export default Teachers;
