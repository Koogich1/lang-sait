import { FaCheck } from "react-icons/fa6";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import Link from "next/link";

type Props = {
  courseName: string;
  courseLable: string;
  li1: string;
  li2: string;
  li3: string;
  li4: string | null;
  li5: string | null;
  gradient: boolean;
  language: "korean" | 'china' | "none",
};

const Card = ({ courseName, courseLable, li1, li2, li3, li4, li5, gradient, language}: Props) => {
  return (
    <div
      className={`${gradient ? "w-[410px] h-[525px] flex flex-col justify-between pt-10" : "w-[400px] h-[500px] flex flex-col justify-between py-4 bg-purple-200"} px-6 rounded-3xl  items-center md:items-start gap-5 text-${gradient ? "[#fff]" : "[#6a49aa]"} ${gradient ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white" : "bg-[#DEDAF0] text-[]"}`}
    >
      <h1 className={`text-2xl font-bold w-full flex lg:justify-start  text-center justify-center`}>{courseName}</h1>
      <h3 className="font-semibold">{courseLable}</h3>
      <ul className="flex flex-col justify-around gap-5">
        <li className="flex items-start justify-start text-start">
          <div className={`rounded-full p-[0.175rem] mr-1 mt-1 ${gradient ?"bg-white text-[#835BD2]" : "bg-[#835BD2] text-white"}`}>
            <FaCheck className="text-xs"/>
          </div>
          {li1}
        </li>
        <li className="flex items-start justify-start text-start">
        <div className={`rounded-full p-[0.175rem] mr-1 mt-1 ${gradient ?"bg-white text-[#835BD2]" : "bg-[#835BD2] text-white"}`}>
            <FaCheck className="text-xs"/>
          </div>
          {li2}
        </li>
        <li className="flex items-start justify-start text-start">
          <div className={`rounded-full p-[0.175rem] mr-1 mt-1 ${gradient ?"bg-white text-[#835BD2]" : "bg-[#835BD2] text-white"}`}>
            <FaCheck className="text-xs"/>
          </div>
          {li3}
        </li>
        {li4 ? 
        <li className="flex items-start justify-start text-start">
          <div className={`rounded-full p-[0.175rem] mr-1 mt-1 ${gradient ?"bg-white text-[#835BD2]" : "bg-[#835BD2] text-white"}`}>
            <FaCheck className="text-xs"/>
          </div>
          {li4}
        </li>
        :
        ""
        }
        {li5 ? 
        <li className="flex items-start justify-start text-start">
          <div className={`rounded-full p-[0.175rem] mr-1 mt-1 ${gradient ?"bg-white text-[#835BD2]" : "bg-[#835BD2] text-white"}`}>
            <FaCheck className="text-xs"/>
          </div>
          {li5}
        </li>
        :
        ""
        }
      </ul>
      <Link href={"teachers"}>
        <Button
          variant="cube"
          className={`w-[160px] h-[45px] bg-transparent border-[1px] shadow-none mb-10 mt-5 ${gradient ? "bg-transparent border-[1px] border-[#fff]  text-[#fff] hover:bg-[#fff] hover:text-[#835BD2]" : "hover:bg-[#835BD2] text-[#835BD2] border-[#835BD2] hover:text-[#fff]"}`}
        >
          Записаться на урок
        </Button>
      </Link>
    </div>
  );
};
export default Card;
